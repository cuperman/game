import { Character, ICharacter, Mario, Tester } from './characters';
import { Controller } from './controller';
import { IStage, MarioWorld11, Stage, TileType, MarioWorld1Fds } from './stages';
import { sleep, Logger } from './lib';
import { Screen } from './screen';

export class Game {
  public controller: Controller;
  public screen: Screen;

  protected logger: Logger;

  private stage: IStage;
  private character: ICharacter;
  private running: boolean;
  private isGameOver: boolean;
  private collisionTiles: Set<string>;
  private drawCollisions: boolean;

  constructor() {
    this.screen = new Screen(320, 240);
    this.controller = new Controller();

    // this.stage = new Stage();
    this.stage = new MarioWorld11();
    // this.stage = new MarioWorld1Fds();

    // this.character = new Character(0, 0);
    // this.character = new Tester(0, 0);
    this.character = new Mario(0, 0);

    this.logger = new Logger();

    this.running = false;
    this.isGameOver = false;
    this.collisionTiles = new Set<string>();
    this.drawCollisions = false;
  }

  processInput() {
    if (this.controller.action && this.character.grounded) {
      if (this.controller.right) {
        this.character.jumpRight();
      } else if (this.controller.left) {
        this.character.jumpLeft();
      } else {
        this.character.jumpUp();
      }
    } else if (this.controller.right && this.character.grounded) {
      this.character.runRight();
    } else if (this.controller.left && this.character.grounded) {
      this.character.runLeft();
    } else if (this.character.grounded && this.character.moving) {
      this.character.stop();
    }
  }

  applyPhysics() {
    // const gravityAcceleration = 2;
    // const gravityAcceleration = 1.6; // tiles/second/second
    const gravityAcceleration = 0.1; // tiles/second/second

    // apply gravity
    this.character.vy = this.character.vy + gravityAcceleration;

    // move objects
    if (this.character.vx !== 0) {
      this.character.x = this.character.x + this.character.vx;
    }
    if (this.character.vy !== 0) {
      this.character.y = this.character.y + this.character.vy;
    }

    // apply collisions

    // vertical collisions
    if (this.character.vy > 0) {
      // going down
      const characterBottomTileX = Math.floor(this.character.x + 0.5);
      const characterBottomTileY = Math.floor(this.character.y + this.character.height);

      if (this.stage.getTile(characterBottomTileX, characterBottomTileY) === TileType.SOLID) {
        // move to top of tile
        this.character.y = characterBottomTileY - 1;
        this.character.land();
        this.collisionTiles.add(JSON.stringify({ x: characterBottomTileX, y: characterBottomTileY }));
      }
    } else if (this.character.vy < 0) {
      // going up
      const characterTopTileX = Math.floor(this.character.x + 0.5);
      const characterTopTileY = Math.floor(this.character.y);

      if (this.stage.getTile(characterTopTileX, characterTopTileY) === TileType.SOLID) {
        // move to bottom of tile
        this.character.y = characterTopTileY + 1;
        this.character.vy = 0;
        this.collisionTiles.add(JSON.stringify({ x: characterTopTileX, y: characterTopTileY }));
      }
    }

    // horizontal collisions
    if (this.character.vx > 0) {
      // going right
      const characterRightTileX = Math.floor(this.character.x + this.character.width);
      const characterRightTileY = Math.floor(this.character.y + 0.5);

      if (this.stage.getTile(characterRightTileX, characterRightTileY) === TileType.SOLID) {
        // move to the left of tile
        this.character.x = characterRightTileX - 1;
        this.character.vx = 0;
        this.collisionTiles.add(JSON.stringify({ x: characterRightTileX, y: characterRightTileY }));
      }
    } else if (this.character.vx < 0) {
      // going left
      const characterLeftTileX = Math.floor(this.character.x);
      const characterLeftTileY = Math.floor(this.character.y + 0.5);

      if (this.stage.getTile(characterLeftTileX, characterLeftTileY) === TileType.SOLID) {
        // move to the right of tile
        this.character.x = characterLeftTileX + 1;
        this.character.vx = 0;
        this.collisionTiles.add(JSON.stringify({ x: characterLeftTileX, y: characterLeftTileY }));
      }
    }

    // screen boundaries
    if (this.character.x < 0) {
      this.character.x = 0;
    } else if (this.character.x > this.stage.gridWidth - this.character.width) {
      this.character.x = this.stage.gridWidth - this.character.width;
    }

    // check pulse
    if (this.character.y > this.stage.tileHeight) {
      this.gameOver();
    }
  }

  // note: screen coordinates and lengths are in pixels units
  offsetScreen() {
    if (this.character.x * 16 <= this.screen.width / 2) {
      this.screen.xOffset = 0;
    } else if (this.character.x * 16 > this.stage.pixelWidth - this.screen.width / 2) {
      this.screen.xOffset = this.stage.pixelWidth - this.screen.width;
    } else {
      this.screen.xOffset = this.character.x * 16 - this.screen.width / 2;
    }
  }

  async load() {
    const stageLoaded = this.stage.load();
    const marioLoaded = this.character.load();

    await Promise.all([stageLoaded, marioLoaded]);
  }

  render() {
    this.logger.diff('screen', this.screen.toString());
    this.logger.diff('character ', this.character.toString());

    this.stage.render(this.screen);
    this.character.render(this.screen);
    this.controller.render(this.screen);

    if (this.drawCollisions) {
      this.collisionTiles.forEach((tile) => {
        const tileCoords = JSON.parse(tile);
        this.screen.drawRectangle(tileCoords.x * 16, tileCoords.y * 16, 16, 16, {
          color: 'yellow',
          fill: true,
          alpha: 0.5,
          offset: true,
        });
      });
    }
  }

  renderGameOver() {
    this.screen.drawText('GAME OVER', 320 / 2, 240 / 2);
    this.logger.diff('GAME OVER', ':(');
    return;
  }

  async start() {
    this.logger.info('starting game...');
    this.running = true;

    const targetFrameRate = 30;
    this.logger.info('target framerate', 30);

    const maxDelay = 1000 / targetFrameRate;

    // start game loop
    while (this.running) {
      const start = new Date().getTime();

      if (this.isGameOver) {
        this.renderGameOver();
      } else {
        this.processInput();
        this.applyPhysics();
        this.offsetScreen();
        this.render();
      }

      const end = new Date().getTime();
      const delay = maxDelay - (end - start);
      if (delay > 0) {
        await sleep(delay);
      }
    }
  }

  pause() {
    this.running = false;
  }

  gameOver() {
    this.isGameOver = true;
  }
}

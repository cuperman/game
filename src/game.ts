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
  }

  processInput() {
    if (this.controller.action && this.character.grounded) {
      this.character.jump();
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
    const gravityAcceleration = 1.6;

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
    if (this.character.vy > 0) {
      // going down
      const characterBottomTileX = Math.floor(this.character.x / 16);
      const characterBottomTileY = Math.floor((this.character.y + this.character.height) / 16);

      if (this.stage.getTile(characterBottomTileX, characterBottomTileY) === TileType.SOLID) {
        // move to top of tile
        this.character.y = characterBottomTileY * 16 - 16;
        this.character.land();
      }
    } else if (this.character.vy < 0) {
      // going up
      const characterTopTileX = Math.floor(this.character.x / 16);
      const characterTopTileY = Math.floor(this.character.y / 16);

      if (this.stage.getTile(characterTopTileX, characterTopTileY) === TileType.SOLID) {
        // move to bottom of tile
        this.character.y = characterTopTileY * 16 + 16;
        this.character.vy = 0;
      }
    }
    if (this.character.vx > 0) {
      // going right
      const characterRightTileX = Math.floor((this.character.x + this.character.width) / 16);
      const characterRightTileY = Math.floor(this.character.y / 16);

      if (this.stage.getTile(characterRightTileX, characterRightTileY) === TileType.SOLID) {
        // move to the left of tile
        this.character.x = characterRightTileX * 16 - 16;
        this.character.vx = 0;
      }
    } else if (this.character.vx < 0) {
      // going left
      const characterLeftTileX = Math.floor(this.character.x / 16);
      const characterLeftTileY = Math.floor(this.character.y / 16);

      if (this.stage.getTile(characterLeftTileX, characterLeftTileY) === TileType.SOLID) {
        // move to the right of tile
        this.character.x = characterLeftTileX * 16 + 16;
        this.character.vx = 0;
      }
    }

    if (this.character.x < 0) {
      this.character.x = 0;
    } else if (this.character.x > this.stage.pixelWidth - this.character.width) {
      this.character.x = this.stage.pixelWidth - this.character.width;
    }

    // check pulse

    if (this.character.y > this.stage.pixelHeight) {
      this.gameOver();
    }
  }

  offsetScreen() {
    if (this.character.x <= this.screen.width / 2) {
      this.screen.xOffset = 0;
    } else if (this.character.x > this.stage.pixelWidth - this.screen.width / 2) {
      this.screen.xOffset = this.stage.pixelWidth - this.screen.width;
    } else {
      this.screen.xOffset = this.character.x - this.screen.width / 2;
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

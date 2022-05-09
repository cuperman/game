import { Character, ICharacter, Link, Mario, Tester } from './characters';
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
  private drawController: boolean;
  private lastPhysicsRun: number;
  private gravityAcceleration: number;

  constructor() {
    this.screen = new Screen(320, 240);
    this.controller = new Controller();

    // this.stage = new Stage();
    this.stage = new MarioWorld11();
    // this.stage = new MarioWorld1Fds();

    // this.character = new Character(0, 0);
    // this.character = new Tester(0, 0);
    this.character = new Mario(0, 0);
    // this.character = new Link(0, 0);

    this.logger = new Logger();

    this.running = false;
    this.isGameOver = false;
    this.collisionTiles = new Set<string>();
    this.drawCollisions = false;
    this.drawController = false;
    this.lastPhysicsRun = new Date().getTime();

    this.gravityAcceleration = 0.0001; // tiles/ms/ms
  }

  processInput(): void {
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

  applyPhysics(): void {
    const now = new Date().getTime();
    const elapsed = now - this.lastPhysicsRun; // ms elapsed since last run
    this.lastPhysicsRun = now; // save current time for next run

    // apply gravity
    this.character.accelerate(0, this.gravityAcceleration, elapsed);

    // move objects
    this.character.translate(this.character.vx * elapsed, this.character.vy * elapsed);

    // apply collisions

    // vertical collisions
    if (this.character.vy > 0) {
      // going down
      while (this.stage.getTile(this.character.tileBottom()) === TileType.SOLID) {
        this.collisionTiles.add(JSON.stringify(this.character.tileBottom()));

        // move character above the tile
        this.character.moveTo(this.character.x, this.character.tileBottom().y - this.character.height);
        this.character.land();
      }
    } else if (this.character.vy < 0) {
      // going up
      while (this.stage.getTile(this.character.tileTop()) === TileType.SOLID) {
        this.collisionTiles.add(JSON.stringify(this.character.tileTop()));

        // move character below the tile
        this.character.moveTo(this.character.x, this.character.tileTop().y + this.character.height);
        this.character.peak();
      }
    }

    // horizontal collisions
    if (this.character.vx > 0) {
      // going right
      while (this.stage.getTile(this.character.tileRight()) === TileType.SOLID) {
        this.collisionTiles.add(JSON.stringify(this.character.tileRight()));

        // move character to the left of tile
        this.character.moveTo(this.character.tileRight().x - this.character.width, this.character.y);
        this.character.stop();
      }
    } else if (this.character.vx < 0) {
      // going left
      while (this.stage.getTile(this.character.tileLeft()) === TileType.SOLID) {
        this.collisionTiles.add(JSON.stringify(this.character.tileLeft()));

        // move character to the right of tile
        this.character.moveTo(this.character.tileLeft().x + this.character.width, this.character.y);
        this.character.stop();
      }
    }

    // check pulse
    if (this.character.y > this.stage.tileHeight) {
      this.gameOver();
    }
  }

  // note: screen coordinates and lengths are in pixels units
  offsetScreen(): void {
    if (this.character.x * 16 <= this.screen.width / 2) {
      this.screen.xOffset = 0;
    } else if (this.character.x * 16 > this.stage.pixelWidth - this.screen.width / 2) {
      this.screen.xOffset = this.stage.pixelWidth - this.screen.width;
    } else {
      this.screen.xOffset = this.character.x * 16 - this.screen.width / 2;
    }
  }

  async load(): Promise<void> {
    const stageLoaded = this.stage.load();
    const marioLoaded = this.character.load();

    await Promise.all([stageLoaded, marioLoaded]);
  }

  render(): void {
    this.logger.diff('screen', this.screen.toString());
    this.logger.diff('character ', this.character.toString());

    this.stage.render(this.screen);
    this.character.render(this.screen);

    if (this.drawController) {
      this.controller.render(this.screen);
    }

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

  renderGameOver(): void {
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

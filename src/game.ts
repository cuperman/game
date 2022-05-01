import { Character, Mario } from './characters';
import { Controller } from './controller';
import { Stage, MarioWorld11 } from './stages';
import { sleep, Logger } from './lib';
import { Screen } from './screen';

export class Game {
  public controller: Controller;
  public screen: Screen;

  private stage: Stage;
  private character: Character;
  private logger: Logger;

  constructor() {
    this.screen = new Screen(320, 240);
    this.controller = new Controller();

    this.stage = new MarioWorld11();
    this.character = new Mario(0, 0);
    this.logger = new Logger();
  }

  processInput() {
    if (this.controller.down) {
    } else if (this.controller.right) {
      this.character.runRight();
    } else if (this.controller.left) {
      this.character.runLeft();
    } else {
      this.character.stop();
    }
  }

  applyPhysics() {
    const groundLevel = 192;

    // apply gravity
    if (this.character.y < groundLevel) {
      this.character.vy = this.character.vy + 8;
    } else {
      this.character.vy = 0;
    }

    // move objects
    if (this.character.vx !== 0) {
      this.character.x = this.character.x + this.character.vx;
    }
    if (this.character.vy !== 0) {
      this.character.y = this.character.y + this.character.vy;
    }

    // apply collisions
    if (this.character.y > groundLevel) {
      this.character.y = groundLevel;
    }
  }

  offsetScreen() {
    if (this.character.x <= this.screen.width / 2) {
      this.screen.xOffset = 0;
    } else if (this.character.x > this.stage.width - this.screen.width / 2) {
      this.screen.xOffset = this.stage.width - this.screen.width;
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

    const context = this.screen.canvas.get2DContext();

    this.stage.render(this.screen);
    this.character.render(this.screen);
    this.controller.render(context);
  }

  async start() {
    this.logger.info('starting game...');

    const targetFrameRate = 30;
    this.logger.info('target framerate', 30);

    const maxDelay = 1000 / targetFrameRate;

    // start game loop
    while (true) {
      const start = new Date().getTime();

      this.processInput();
      this.applyPhysics();
      this.offsetScreen();
      this.render();

      const end = new Date().getTime();
      const delay = maxDelay - (end - start);
      if (delay > 0) {
        await sleep(delay);
      }
    }
  }
}

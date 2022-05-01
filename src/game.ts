import { Character, Mario } from './characters';
import { Controller } from './controller';
import { Stage, Stage1 } from './stages';
import { Canvas, sleep } from './lib';

export class Game {
  public canvas: Canvas;
  public controller: Controller;

  private stage: Stage;
  private character: Character;

  constructor() {
    this.canvas = new Canvas(320, 240);
    this.controller = new Controller();

    this.stage = new Stage1();
    this.character = new Mario();
  }

  processInput() {
    if (this.controller.down) {
    } else if (this.controller.right) {
      this.character.vx = 5;
    } else if (this.controller.left) {
      this.character.vx = -5;
    } else {
      this.character.vx = 0;
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

  async load() {
    const stageLoaded = this.stage.load();
    const marioLoaded = this.character.load();

    await Promise.all([stageLoaded, marioLoaded]);
  }

  render() {
    const context = this.canvas.get2DContext();

    this.stage.render(context);
    this.character.render(context);
    this.controller.render(context);
  }

  async start() {
    const targetFrameRate = 30;
    const maxDelay = 1000 / targetFrameRate;

    // start game loop
    while (true) {
      const start = new Date().getTime();

      this.processInput();
      this.applyPhysics();
      this.render();

      const end = new Date().getTime();
      const delay = maxDelay - (end - start);
      if (delay > 0) {
        await sleep(delay);
      }
    }
  }
}

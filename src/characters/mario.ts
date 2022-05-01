import { Character } from './character';
import { loadImage, applyAlpha } from '../lib';

export enum Direction {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export class Mario implements Character {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;

  private sprites: ImageBitmap;
  private frame: number;
  private direction: Direction;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    this.frame = 0;
  }

  async load() {
    const alphaColor = { r: 146, g: 144, b: 255 };
    const sprites = await loadImage('/img/mario.png').then((image) => applyAlpha(image, alphaColor));
    this.sprites = sprites;
  }

  runRight() {
    this.direction = Direction.RIGHT;
    this.vx = 5;
  }

  runLeft() {
    this.direction = Direction.LEFT;
    this.vx = -5;
  }

  stop() {
    this.vx = 0;
  }

  render(context: CanvasRenderingContext2D) {
    const width = 16;
    const height = 16;

    if (this.vy > 0 && this.vx === 0) {
      // falling
      context.drawImage(this.sprites, 116, 8, width, height, this.x, this.y, width, height);
    } else if (this.vx < 0) {
      context.scale(-1, 1);
      // run left
      if (this.frame === 0) {
        context.drawImage(this.sprites, 20, 8, width, height, -this.x - width, this.y, width, height);
        this.frame = 1;
      } else if (this.frame === 1) {
        context.drawImage(this.sprites, 38, 8, width, height, -this.x - width, this.y, width, height);
        this.frame = 2;
      } else {
        context.drawImage(this.sprites, 56, 8, width, height, -this.x - width, this.y, width, height);
        this.frame = 0;
      }
      context.resetTransform();
    } else if (this.vx > 0) {
      // run right
      if (this.frame === 0) {
        context.drawImage(this.sprites, 20, 8, width, height, this.x, this.y, width, height);
        this.frame = 1;
      } else if (this.frame === 1) {
        context.drawImage(this.sprites, 38, 8, width, height, this.x, this.y, width, height);
        this.frame = 2;
      } else {
        context.drawImage(this.sprites, 56, 8, width, height, this.x, this.y, width, height);
        this.frame = 0;
      }
    } else if (this.direction === Direction.LEFT) {
      // standing facing left
      context.scale(-1, 1);
      context.drawImage(this.sprites, 0, 8, width, height, -this.x - width, this.y, width, height);
      context.resetTransform();
    } else {
      // standing facing right
      context.drawImage(this.sprites, 0, 8, width, height, this.x, this.y, width, height);
    }
  }

  toString() {
    const { x, y, vx, vy } = this;
    JSON.stringify({ x, y, vx, vy });
  }
}

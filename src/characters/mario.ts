import { Character } from './character';
import { loadImage, applyAlpha } from '../lib';
import { Screen } from '../screen';

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

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

    this.frame = 0;
  }

  async load() {
    const alphaColor = { r: 146, g: 144, b: 255 };
    const sprites = await loadImage('/img/mario-sprites.png').then((image) => applyAlpha(image, alphaColor));
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

  render(screen: Screen) {
    const width = 16;
    const height = 16;

    if (this.vy > 0 && this.vx === 0) {
      // falling
      screen.drawSprite(this.sprites, 116, 8, width, height, this.x, this.y, width, height);
    } else if (this.vx < 0) {
      // run left
      if (this.frame === 0) {
        screen.drawSpriteFlipped(this.sprites, 20, 8, width, height, this.x, this.y, width, height);
        this.frame = 1;
      } else if (this.frame === 1) {
        screen.drawSpriteFlipped(this.sprites, 38, 8, width, height, this.x, this.y, width, height);
        this.frame = 2;
      } else {
        screen.drawSpriteFlipped(this.sprites, 56, 8, width, height, this.x, this.y, width, height);
        this.frame = 0;
      }
    } else if (this.vx > 0) {
      // run right
      if (this.frame === 0) {
        screen.drawSprite(this.sprites, 20, 8, width, height, this.x, this.y, width, height);
        this.frame = 1;
      } else if (this.frame === 1) {
        screen.drawSprite(this.sprites, 38, 8, width, height, this.x, this.y, width, height);
        this.frame = 2;
      } else {
        screen.drawSprite(this.sprites, 56, 8, width, height, this.x, this.y, width, height);
        this.frame = 0;
      }
    } else if (this.direction === Direction.LEFT) {
      // standing facing left
      screen.drawSpriteFlipped(this.sprites, 0, 8, width, height, this.x, this.y, width, height);
    } else {
      // standing facing right
      screen.drawSprite(this.sprites, 0, 8, width, height, this.x, this.y, width, height);
    }
  }

  toString(): string {
    const { x, y, vx, vy } = this;
    return JSON.stringify({ x, y, vx, vy });
  }
}

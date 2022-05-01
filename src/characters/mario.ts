import { Character } from './character';
import { loadImage, applyAlpha } from '../lib';

export class Mario implements Character {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;

  private sprites: ImageBitmap;
  private frame: number;

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

  render(context: CanvasRenderingContext2D) {
    const width = 16;
    const height = 16;

    if (this.vy > 0 && this.vx === 0) {
      // falling
      context.drawImage(this.sprites, 116, 8, width, height, this.x, this.y, width, height);
    } else if (this.vx < 0) {
      // run left
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
    } else {
      // standing
      context.drawImage(this.sprites, 0, 8, width, height, this.x, this.y, width, height);
    }
  }

  toString() {
    const { x, y, vx, vy } = this;
    JSON.stringify({ x, y, vx, vy });
  }
}

import { Character, CharacterDirection } from './character';
import { loadImage, applyAlpha } from '../lib';
import { Screen } from '../screen';

export class Link extends Character {
  private sprites: ImageBitmap;
  private frame: number;
  private drawBoundingBox: boolean;

  constructor(x: number, y: number) {
    super(x, y);

    this._width = 1;
    this._height = 2;
    this.drawBoundingBox = false;
  }

  async load() {
    const alphaColor = { r: 128, g: 0, b: 128 };
    this.sprites = await loadImage('/img/zelda-sprites.png').then((image) => applyAlpha(image, alphaColor));
  }

  render(screen: Screen) {
    const tileWidth = 16; // pixels
    const tileHeight = 16; // pixels

    const pixelX = Math.round(this.x * tileWidth);
    const pixelY = Math.round(this.y * tileHeight);
    const pixelWidth = Math.round(this.width * tileWidth);
    const pixelHeight = Math.round(this.height * tileHeight);

    if (this.drawBoundingBox) {
      screen.drawRectangle(pixelX, pixelY, pixelWidth, pixelHeight, {
        color: 'white',
        alpha: 0.5,
        fill: true,
        offset: true,
      });
    }

    if (this.vy !== 0 && this.direction === CharacterDirection.RIGHT) {
      // jumping right
      screen.drawSprite(this.sprites, 134, 11, pixelWidth, pixelHeight, pixelX, pixelY);
    } else if (this.vy !== 0 && this.direction === CharacterDirection.LEFT) {
      // jumping left
      screen.drawSpriteFlipped(this.sprites, 134, 11, pixelWidth, pixelHeight, pixelX, pixelY);
    } else if (this.vx < 0 && this.grounded) {
      // run left
      if (this.frame === 0) {
        screen.drawSpriteFlipped(this.sprites, 29, 11, pixelWidth, pixelHeight, pixelX, pixelY);
        this.frame = 1;
      } else if (this.frame === 1) {
        screen.drawSpriteFlipped(this.sprites, 46, 11, pixelWidth, pixelHeight, pixelX, pixelY);
        this.frame = 2;
      } else {
        screen.drawSpriteFlipped(this.sprites, 63, 11, pixelWidth, pixelHeight, pixelX, pixelY);
        this.frame = 0;
      }
    } else if (this.vx > 0 && this.grounded) {
      // run right
      if (this.frame === 0) {
        screen.drawSprite(this.sprites, 29, 11, pixelWidth, pixelHeight, pixelX, pixelY);
        this.frame = 1;
      } else if (this.frame === 1) {
        screen.drawSprite(this.sprites, 46, 11, pixelWidth, pixelHeight, pixelX, pixelY);
        this.frame = 2;
      } else {
        screen.drawSprite(this.sprites, 63, 11, pixelWidth, pixelHeight, pixelX, pixelY);
        this.frame = 0;
      }
    } else if (this.direction === CharacterDirection.LEFT) {
      // standing facing left
      screen.drawSpriteFlipped(this.sprites, 1, 11, pixelWidth, pixelHeight, pixelX, pixelY);
    } else {
      // standing facing right
      screen.drawSprite(this.sprites, 1, 11, pixelWidth, pixelHeight, pixelX, pixelY);
    }
  }
}

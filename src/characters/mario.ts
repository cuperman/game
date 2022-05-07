import { Character, CharacterDirection } from './character';
import { loadImage, applyAlpha } from '../lib';
import { Screen } from '../screen';

export class Mario extends Character {
  private sprites: ImageBitmap;
  private frame: number;
  private drawBoundingBox: boolean;

  constructor(x: number, y: number) {
    super(x, y);
  }

  async load() {
    const alphaColor = { r: 146, g: 144, b: 255 };
    const sprites = await loadImage('/img/mario-sprites.png').then((image) => applyAlpha(image, alphaColor));
    this.sprites = sprites;
  }

  render(screen: Screen) {
    const width = 16;
    const height = 16;

    const pixelX = Math.round(this.x);
    const pixelY = Math.round(this.y);

    if (this.drawBoundingBox) {
      screen.drawRectangle(pixelX, pixelY, 16, 16, { color: 'white', alpha: 0.5, fill: true, offset: true });
    }

    if (this.vy !== 0 && this.direction === CharacterDirection.RIGHT) {
      // jumping right
      screen.drawSprite(this.sprites, 96, 8, width, height, pixelX, pixelY, width, height);
    } else if (this.vy !== 0 && this.direction === CharacterDirection.LEFT) {
      // jumping left
      screen.drawSpriteFlipped(this.sprites, 96, 8, width, height, pixelX, pixelY, width, height);
    } else if (this.vx < 0 && this.grounded) {
      // run left
      if (this.frame === 0) {
        screen.drawSpriteFlipped(this.sprites, 20, 8, width, height, pixelX, pixelY, width, height);
        this.frame = 1;
      } else if (this.frame === 1) {
        screen.drawSpriteFlipped(this.sprites, 38, 8, width, height, pixelX, pixelY, width, height);
        this.frame = 2;
      } else {
        screen.drawSpriteFlipped(this.sprites, 56, 8, width, height, pixelX, pixelY, width, height);
        this.frame = 0;
      }
    } else if (this.vx > 0 && this.grounded) {
      // run right
      if (this.frame === 0) {
        screen.drawSprite(this.sprites, 20, 8, width, height, pixelX, pixelY, width, height);
        this.frame = 1;
      } else if (this.frame === 1) {
        screen.drawSprite(this.sprites, 38, 8, width, height, pixelX, pixelY, width, height);
        this.frame = 2;
      } else {
        screen.drawSprite(this.sprites, 56, 8, width, height, pixelX, pixelY, width, height);
        this.frame = 0;
      }
    } else if (this.direction === CharacterDirection.LEFT) {
      // standing facing left
      screen.drawSpriteFlipped(this.sprites, 0, 8, width, height, this.x, this.y, width, height);
    } else {
      // standing facing right
      screen.drawSprite(this.sprites, 0, 8, width, height, this.x, this.y, width, height);
    }
  }
}

import { Character, CharacterDirection } from './character';
import { loadImage, applyAlpha, Logger, getAnimationFrame, FrameRate } from '../lib';
import { Screen } from '../screen';

interface AnimationFrame {
  readonly x: number;
  readonly y: number;
}

const ANIMATION_MAP: { [name: string]: AnimationFrame[] } = {
  run: [
    { x: 29, y: 11 },
    { x: 46, y: 11 },
    { x: 63, y: 11 },
  ],
};

export class Link extends Character {
  private sprites: ImageBitmap;
  private drawBoundingBox: boolean;
  private logger: Logger;
  private animationElapsed: number;

  constructor(x: number, y: number) {
    super(x, y);

    this._width = 1;
    this._height = 2;
    this.logger = new Logger();
    this.drawBoundingBox = false;
    this.animationElapsed = 0;
  }

  async load() {
    const alphaColor = { r: 128, g: 0, b: 128 };
    this.sprites = await loadImage('/img/zelda-sprites.png').then((image) => applyAlpha(image, alphaColor));
  }

  render(screen: Screen, elapsed: DOMHighResTimeStamp) {
    if (this.running) {
      this.animationElapsed += elapsed;
    } else {
      this.animationElapsed = 0;
    }

    const tileWidth = 16; // pixels
    const tileHeight = 16; // pixels

    const pixelX = Math.round(this.x * tileWidth);
    const pixelY = Math.round(this.y * tileHeight);
    const pixelWidth = Math.round(this.width * tileWidth);
    const pixelHeight = Math.round(this.height * tileHeight);

    const frameIndex = getAnimationFrame(ANIMATION_MAP.run.length, FrameRate.TWELVE_FPS, this.animationElapsed);
    const frame = ANIMATION_MAP.run[frameIndex];

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
      screen.drawSpriteFlipped(this.sprites, frame.x, frame.y, pixelWidth, pixelHeight, pixelX, pixelY);
    } else if (this.vx > 0 && this.grounded) {
      // run right
      screen.drawSprite(this.sprites, frame.x, frame.y, pixelWidth, pixelHeight, pixelX, pixelY);
    } else if (this.direction === CharacterDirection.LEFT) {
      // standing facing left
      this.logger.diff('drawSpriteFlipped', JSON.stringify([1, 11, pixelWidth, pixelHeight, pixelX, pixelY]));
      screen.drawSpriteFlipped(this.sprites, 1, 11, pixelWidth, pixelHeight, pixelX, pixelY);
    } else {
      // standing facing right
      this.logger.diff('drawSprite', JSON.stringify([1, 11, pixelWidth, pixelHeight, pixelX, pixelY]));
      screen.drawSprite(this.sprites, 1, 11, pixelWidth, pixelHeight, pixelX, pixelY);
    }
  }
}

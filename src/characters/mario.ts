import { Character, CharacterDirection } from './character';
import { loadImage, applyAlpha, getAnimationFrame, FrameRate } from '../lib';
import { Screen } from '../screen';

interface AnimationFrame {
  readonly x: number;
  readonly y: number;
}

const ANIMATION_MAP: { [name: string]: AnimationFrame[] } = {
  run: [
    { x: 20, y: 8 },
    { x: 38, y: 8 },
    { x: 56, y: 8 },
  ],
};

export class Mario extends Character {
  private sprites: ImageBitmap;
  private drawBoundingBox: boolean;
  private animationElapsed: number;

  constructor(x: number, y: number) {
    super(x, y);

    this.animationElapsed = 0;
  }

  async load() {
    const alphaColor = { r: 146, g: 144, b: 255 };
    const sprites = await loadImage('/img/mario-sprites.png').then((image) => applyAlpha(image, alphaColor));
    this.sprites = sprites;
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
      screen.drawRectangle(pixelX, pixelY, 16, 16, { color: 'white', alpha: 0.5, fill: true, offset: true });
    }

    if (this.vy !== 0 && this.direction === CharacterDirection.RIGHT) {
      // jumping right
      screen.drawSprite(this.sprites, 96, 8, pixelWidth, pixelHeight, pixelX, pixelY, pixelWidth, pixelHeight);
    } else if (this.vy !== 0 && this.direction === CharacterDirection.LEFT) {
      // jumping left
      screen.drawSpriteFlipped(this.sprites, 96, 8, pixelWidth, pixelHeight, pixelX, pixelY, pixelWidth, pixelHeight);
    } else if (this.vx < 0 && this.grounded) {
      // run left
      screen.drawSpriteFlipped(this.sprites, frame.x, frame.y, pixelWidth, pixelHeight, pixelX, pixelY);
    } else if (this.vx > 0 && this.grounded) {
      // run right
      screen.drawSprite(this.sprites, frame.x, frame.y, pixelWidth, pixelHeight, pixelX, pixelY);
    } else if (this.direction === CharacterDirection.LEFT) {
      // standing facing left
      screen.drawSpriteFlipped(this.sprites, 0, 8, pixelWidth, pixelHeight, pixelX, pixelY, pixelWidth, pixelHeight);
    } else {
      // standing facing right
      screen.drawSprite(this.sprites, 0, 8, pixelWidth, pixelHeight, pixelX, pixelY, pixelWidth, pixelHeight);
    }
  }
}

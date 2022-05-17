import { Character } from './character';
import { loadImage, applyAlpha } from '../lib';
import { Screen } from '../screen';

export class Tester extends Character {
  private sprites: ImageBitmap;

  constructor(x: number, y: number) {
    super(x, y, {
      name: 'Tester',
      width: 1,
      height: 1,
      runVelocity: 1 / 120,
      jumpVelocity: 1 / 32,
    });
  }

  async load() {
    const alphaColor = { r: 146, g: 144, b: 255 };
    const sprites = await loadImage('/img/mario-sprites.png').then((image) => applyAlpha(image, alphaColor));
    this.sprites = sprites;
  }

  render(screen: Screen) {
    const tileWidth = 16; // pixels
    const tileHeight = 16; // pixels

    const pixelX = Math.round(this.x * tileWidth);
    const pixelY = Math.round(this.y * tileHeight);
    const pixelWidth = Math.round(this.width * tileWidth);
    const pixelHeight = Math.round(this.height * tileHeight);

    screen.drawSpriteFlipped(this.sprites, 0, 8, pixelWidth, pixelHeight, pixelX, pixelY, pixelWidth, pixelHeight);
  }
}

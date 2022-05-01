import { Character } from './character';
import { loadImage, applyAlpha } from '../lib';
import { Screen } from '../screen';

export class Tester implements Character {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;

  private sprites: ImageBitmap;

  constructor() {
    this.x = 100;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }

  async load() {
    const alphaColor = { r: 146, g: 144, b: 255 };
    const sprites = await loadImage('/img/mario.png').then((image) => applyAlpha(image, alphaColor));
    this.sprites = sprites;
  }

  render(screen: Screen) {
    const width = 16;
    const height = 16;

    screen.drawSpriteFlipped(this.sprites, 0, 8, width, height, this.x, this.y, width, height);
  }

  runLeft() {
    return;
  }

  runRight() {
    return;
  }

  stop() {
    return;
  }
}

import { Stage } from './stage';
import { loadImage } from '../lib';

export class Stage1 implements Stage {
  private asset: ImageBitmap;

  constructor() {}

  async load() {
    const asset = await loadImage('/img/stage1.png');
    this.asset = asset;
  }

  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.asset, 0, 0, 320, 240, 0, 0, 320, 240);
  }
}

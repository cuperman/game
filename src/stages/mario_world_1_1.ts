import { Stage } from './stage';
import { loadImage } from '../lib';
import { Screen } from '../screen';

export class MarioWorld11 extends Stage {
  private asset: ImageBitmap;

  async load() {
    const asset = await loadImage('/img/mario-world-1-1.png');

    this.asset = asset;
    this.width = asset.width;
    this.height = asset.height;
  }

  render(screen: Screen) {
    screen.drawBackground(this.asset);
  }
}

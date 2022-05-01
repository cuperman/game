import { Stage } from './stage';
import { loadImage } from '../lib';
import { Screen } from '../screen';

export class MarioWorld1Fds implements Stage {
  public width: number;
  public height: number;

  private asset: ImageBitmap;

  constructor() {
    return;
  }

  async load() {
    const asset = await loadImage('/img/mario-world-1-fds.png');

    this.asset = asset;
    this.width = asset.width;
    this.height = asset.height;
  }

  render(screen: Screen) {
    screen.drawBackground(this.asset);
  }
}

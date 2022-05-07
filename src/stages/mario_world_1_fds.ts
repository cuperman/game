import { Stage, TileType } from './stage';
import { loadImage } from '../lib';
import { Screen } from '../screen';

const TILE_SIZE = 16; // square pixels

export class MarioWorld1Fds extends Stage {
  private asset: ImageBitmap;

  async load() {
    this.asset = await loadImage('/img/mario-world-1-fds.png');

    this.pixelWidth = this.asset.width;
    this.pixelHeight = this.asset.height;

    this.tileWidth = TILE_SIZE;
    this.tileHeight = TILE_SIZE;

    this.gridWidth = Math.floor(this.pixelWidth / this.tileWidth);
    this.gridHeight = Math.floor(this.pixelHeight / this.tileHeight);
  }

  getTile(gridX: number, gridY: number): TileType {
    if (gridY >= this.gridHeight - 2) {
      // the 2 bottom tiles are solid ground
      // FIXME: we need a tile map for this stage
      return TileType.SOLID;
    }

    if (gridY < 0 || gridX >= this.gridHeight) {
      // top and bottom edges are open
      return TileType.NULL;
    }

    if (gridX < 0 || gridX >= this.gridWidth) {
      // left and right edges are solid
      return TileType.SOLID;
    }
  }

  render(screen: Screen) {
    screen.drawBackground(this.asset);
  }
}

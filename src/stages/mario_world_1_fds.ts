import { Stage, TileCoordinates, TileType } from './stage';
import { loadImage, loadTileMap, Logger } from '../lib';
import { Screen } from '../screen';

const TILE_MAP = `
....................................................................................................................................................................
....................................................................................................................................................................
....................................................................................................................................................................
....................................................................................................................................................................
........................................#######.....................................................................................................................
..........................#####.............................####..............................................................................##....................
............................................................................######............................................................##....................
........................................................................................................########............................####....................
...................................#####....................................................................................................####....................
........................########......................................###...........................................####..####............######....................
...........................................................#..............................................................................######....................
..................................................................................................####....................................######....................
..................####..........###.......................................................................................................######........#...........
################..................................####.....#####.#####...........................................###.............###################################
################.................................................................................................................###################################
`;

const TILE_SIZE = 16; // square pixels

export class MarioWorld1Fds extends Stage {
  private asset: ImageBitmap;
  private logger: Logger;
  private drawCollisions: boolean;
  private tiles: string[][];

  constructor() {
    super();

    this.logger = new Logger();
    this.drawCollisions = false;
  }

  async load() {
    this.asset = await loadImage('/img/mario-world-1-fds.png');
    this.tiles = loadTileMap(TILE_MAP);

    this.pixelWidth = this.asset.width;
    this.pixelHeight = this.asset.height;

    this.tileWidth = TILE_SIZE;
    this.tileHeight = TILE_SIZE;

    this.gridWidth = Math.floor(this.pixelWidth / this.tileWidth);
    this.gridHeight = Math.floor(this.pixelHeight / this.tileHeight);
  }

  getTile(coordinates: TileCoordinates): TileType {
    const gridX = coordinates.x;
    const gridY = coordinates.y;

    if (gridY < 0 || gridY >= this.gridHeight) {
      // top and bottom edges are open
      return TileType.NULL;
    }

    if (gridX < 0 || gridX >= this.gridWidth) {
      // left and right edges are solid
      return TileType.SOLID;
    }

    const char = this.tiles[gridY][gridX];

    switch (char) {
      case '.':
        return TileType.EMPTY;
      case '#':
        return TileType.SOLID;
      default:
        return TileType.NULL;
    }
  }

  render(screen: Screen) {
    screen.drawBackground(this.asset);

    if (this.drawCollisions) {
      const gridX = Math.floor(screen.xOffset / this.tileWidth);
      const gridY = Math.floor(screen.yOffset / this.tileHeight);

      let char: TileType;
      for (let x = gridX; x < gridX + this.gridWidth; x++) {
        for (let y = gridY; y < gridY + this.gridHeight; y++) {
          char = this.getTile({ x, y });
          if (char === TileType.SOLID) {
            screen.drawRectangle(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight, {
              color: 'white',
              fill: true,
              alpha: 0.5,
              offset: true,
            });
          }
        }
      }
    }
  }
}

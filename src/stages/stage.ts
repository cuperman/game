import { Screen } from '../screen';

export enum TileType {
  NULL = 'NULL',
  EMPTY = 'EMPTY',
  SOLID = 'SOLID',
}

export interface TileCoordinates {
  readonly x: number;
  readonly y: number;
}

export interface IStage {
  tileWidth: number;
  tileHeight: number;

  pixelWidth: number;
  pixelHeight: number;

  gridWidth: number;
  gridHeight: number;

  load: () => Promise<void>;
  getTile: (coordinates: TileCoordinates) => TileType;
  render: (screen: Screen) => void;
}

export class Stage implements IStage {
  public tileWidth: number;
  public tileHeight: number;

  public gridWidth: number;
  public gridHeight: number;

  public pixelWidth: number;
  public pixelHeight: number;

  constructor() {
    this.tileWidth = 16;
    this.tileHeight = 16;

    this.gridWidth = 20;
    this.gridHeight = 15;

    this.pixelWidth = this.tileWidth * this.gridWidth;
    this.pixelHeight = this.tileHeight * this.gridHeight;
  }

  async load(): Promise<void> {
    return;
  }

  /*
   * Get tile by coordinate
   */
  getTile(coordinates: TileCoordinates): TileType {
    const gridX = coordinates.x;
    const gridY = coordinates.y;

    if (gridY >= this.gridHeight - 1) {
      // bottom row is the ground
      return TileType.SOLID;
    }

    if (gridY < 0) {
      // top edge is open
      return TileType.NULL;
    }

    if (gridX < 0) {
      // left edge is solid
      return TileType.SOLID;
    }

    if (gridX >= this.gridWidth) {
      // right edge is solid
      return TileType.SOLID;
    }
  }

  render(screen: Screen): void {
    screen.drawRectangle(0, 0, this.pixelWidth, this.pixelHeight, { color: 'LightSkyBlue', fill: true });
  }
}

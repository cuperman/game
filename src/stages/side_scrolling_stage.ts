import { Stage, TileCoordinates, TileType } from './stage';
import { Screen } from '../screen';
import { loadImage, loadTileMap } from '../lib';
import { ICharacter } from '../characters';

export interface SideScrollingStageProps {
  readonly tileWidth: number;
  readonly tileHeight: number;

  readonly backgroundImagePath: string;
  readonly backgroundTileMap: string;
}

export class SideScrollingStage extends Stage {
  private backgroundImagePath: string;
  private backgroundImage: ImageBitmap;
  private backgroundTileMap: string;
  private backgroundTiles: string[][];

  // private collisionTiles: Set<string>;
  // private drawCollisions: boolean;
  // private drawController: boolean;
  // private drawFramerate: boolean;

  constructor(props: SideScrollingStageProps) {
    super();

    this.tileWidth = props.tileWidth;
    this.tileHeight = props.tileHeight;

    this.backgroundImagePath = props.backgroundImagePath;
    this.backgroundTileMap = props.backgroundTileMap;

    // this.collisionTiles = new Set<string>();
    // this.drawCollisions = false;
    // this.drawController = false;
    // this.drawFramerate = false;
  }

  async load() {
    this.backgroundImage = await loadImage(this.backgroundImagePath);
    this.backgroundTiles = loadTileMap(this.backgroundTileMap);

    this.pixelWidth = this.backgroundImage.width;
    this.pixelHeight = this.backgroundImage.height;

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

    const char = this.backgroundTiles[gridY][gridX];

    switch (char) {
      case '.':
        return TileType.EMPTY;
      case '#':
        return TileType.SOLID;
      default:
        return TileType.NULL;
    }
  }

  render(screen: Screen, elapsed: DOMHighResTimeStamp, character: ICharacter) {
    // this.logger.diff('screen', this.screen.toString());
    // this.logger.diff('character ', this.character.toString());

    screen.drawBackground(this.backgroundImage);
    character.render(screen, elapsed);

    // if (this.drawController) {
    //   this.controller.render(this.screen);
    // }

    // if (this.drawCollisions) {
    //   this.collisionTiles.forEach((tile) => {
    //     const tileCoords = JSON.parse(tile);
    //     this.screen.drawRectangle(Math.round(tileCoords.x * 16), Math.round(tileCoords.y * 16), 16, 16, {
    //       color: 'yellow',
    //       fill: true,
    //       alpha: 0.5,
    //       offset: true,
    //     });
    //   });
    // }

    // if (this.drawCollisions) {
    //   const gridX = Math.floor(screen.xOffset / this.tileWidth);
    //   const gridY = Math.floor(screen.yOffset / this.tileHeight);

    //   let char: TileType;
    //   for (let x = gridX; x < gridX + this.gridWidth; x++) {
    //     for (let y = gridY; y < gridY + this.gridHeight; y++) {
    //       char = this.getTile({ x, y });
    //       if (char === TileType.SOLID) {
    //         screen.drawRectangle(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight, {
    //           color: 'white',
    //           fill: true,
    //           alpha: 0.5,
    //           offset: true,
    //         });
    //       }
    //     }
    //   }
    // }

    // if (this.drawFramerate) {
    //   const framerate = 1 / (elapsed / 1000); // (frames / second)
    //   this.screen.drawText(`framerate: ${framerate.toFixed(2)}`, 320 - 90, 240 - 5);
    // }
  }
}

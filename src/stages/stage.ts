import { ICharacter } from '../characters';
import { Controller } from '../controller';
import { Screen } from '../screen';
import { requestAnimationFrame } from '../lib';

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
  render: (screen: Screen, elapsed: DOMHighResTimeStamp, character: ICharacter) => void;
  play: (screen: Screen, controller: Controller, character: ICharacter) => Promise<void>;
}

export class Stage implements IStage {
  public tileWidth: number;
  public tileHeight: number;

  public gridWidth: number;
  public gridHeight: number;

  public pixelWidth: number;
  public pixelHeight: number;

  private running: boolean;

  constructor() {
    this.tileWidth = 16;
    this.tileHeight = 16;

    this.gridWidth = 20;
    this.gridHeight = 15;

    this.pixelWidth = this.tileWidth * this.gridWidth;
    this.pixelHeight = this.tileHeight * this.gridHeight;

    this.running = false;
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

  processInput(controller: Controller, character: ICharacter) {
    if (controller.action && character.grounded) {
      if (controller.right) {
        character.jumpRight();
      } else if (controller.left) {
        character.jumpLeft();
      } else {
        character.jumpUp();
      }
    } else if (controller.right && character.grounded) {
      character.runRight();
    } else if (controller.left && character.grounded) {
      character.runLeft();
    } else if (character.grounded && character.moving) {
      character.stop();
    }
  }

  applyPhysics(elapsed: DOMHighResTimeStamp, character: ICharacter) {
    const gravityAcceleration = 0.0001; // tiles/ms/ms

    // apply gravity
    character.accelerate(0, gravityAcceleration, elapsed);

    // move objects
    character.translate(character.vx * elapsed, character.vy * elapsed);

    // apply collisions

    // vertical collisions
    if (character.vy > 0) {
      // going down
      while (this.getTile(character.tileBottom()) === TileType.SOLID) {
        // this.collisionTiles.add(JSON.stringify(character.tileBottom()));

        // move character above the tile
        character.moveTo(character.x, character.tileBottom().y - character.height);
        character.land();
      }
    } else if (character.vy < 0) {
      // going up
      while (this.getTile(character.tileTop()) === TileType.SOLID) {
        // this.collisionTiles.add(JSON.stringify(character.tileTop()));

        // move character below the tile
        character.moveTo(character.x, character.tileTop().y + character.height);
        character.peak();
      }
    }

    // horizontal collisions
    if (character.vx > 0) {
      // going right
      while (this.getTile(character.tileRight()) === TileType.SOLID) {
        // this.collisionTiles.add(JSON.stringify(character.tileRight()));

        // move character to the left of tile
        character.moveTo(character.tileRight().x - character.width, character.y);
        character.stop();
      }
    } else if (character.vx < 0) {
      // going left
      while (this.getTile(character.tileLeft()) === TileType.SOLID) {
        // this.collisionTiles.add(JSON.stringify(character.tileLeft()));

        // move character to the right of tile
        character.moveTo(character.tileLeft().x + character.width, character.y);
        character.stop();
      }
    }

    // check pulse
    if (character.y > this.tileHeight) {
      this.gameOver();
    }
  }

  // note: screen coordinates and lengths are in pixels units
  offsetScreen(screen: Screen, character: ICharacter) {
    if (character.x * 16 <= screen.width / 2) {
      screen.xOffset = 0;
    } else if (character.x * 16 > this.pixelWidth - screen.width / 2) {
      screen.xOffset = this.pixelWidth - screen.width;
    } else {
      screen.xOffset = character.x * 16 - screen.width / 2;
    }
  }

  render(screen: Screen, elapsed: DOMHighResTimeStamp, character: ICharacter): void {
    screen.drawRectangle(0, 0, this.pixelWidth, this.pixelHeight, { color: 'LightSkyBlue', fill: true });
    screen.drawRectangle(0, 14 * 16, this.pixelWidth, 1 * 16, { color: 'NavajoWhite', fill: true });
    character.render(screen, elapsed);
  }

  gameOver() {
    this.running = false;
  }

  async play(screen: Screen, controller: Controller, character: ICharacter) {
    this.running = true;

    await this.load();
    let lastLoop = await requestAnimationFrame();

    while (this.running) {
      const now = await requestAnimationFrame();
      const elapsed = now - lastLoop;
      lastLoop = now;

      this.processInput(controller, character);
      this.applyPhysics(elapsed, character);
      this.offsetScreen(screen, character);
      this.render(screen, elapsed, character);
    }
  }
}

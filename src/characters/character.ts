import { Logger } from '../lib';
import { Screen } from '../screen';
import { TileCoordinates } from '../stages';

export interface ICharacter {
  /*
   * Floating point value for horizontal coordinate on the tile grid
   */
  x: number;

  /*
   * Floating point value for vertical coordinate on the tile grid
   */
  y: number;

  /*
   * Floating point value for horizontal velocity (tiles/second)
   */
  vx: number;

  /*
   * Floating point value for vertical velocity (tiles/second)
   */
  vy: number;

  /*
   * Width of character in tiles
   */
  width: number;

  /*
   * Height of character in tiles
   */
  height: number;

  /*
   * True if character is on the ground, otherwise false
   */
  grounded: boolean;

  /*
   * True if character is moving, otherwise false
   */
  moving: boolean;

  load: () => Promise<void>;
  render: (screen: Screen) => void;

  runRight: () => void;
  runLeft: () => void;
  stop: () => void;
  jumpUp: () => void;
  jumpRight: () => void;
  jumpLeft: () => void;
  land: () => void;

  tileTop: () => TileCoordinates;
  tileBottom: () => TileCoordinates;
  tileLeft: () => TileCoordinates;
  tileRight: () => TileCoordinates;

  toString: () => string;
}

export enum CharacterDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export class Character implements ICharacter {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;

  protected direction: CharacterDirection;

  private _width: number;
  private _height: number;
  private _logger: Logger;
  private _isGrounded: boolean;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

    this._width = 1;
    this._height = 1;

    this.direction = CharacterDirection.RIGHT;
    this._logger = new Logger();

    this._isGrounded = false;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  async load() {
    return;
  }

  get grounded(): boolean {
    return this._isGrounded;
  }

  get moving(): boolean {
    return this.vx !== 0 || this.vy !== 0;
  }

  runRight() {
    this._logger.info('character run right');
    this.direction = CharacterDirection.RIGHT;
    this.vx = 0.3125; // 5/16
  }

  runLeft() {
    this._logger.info('character run left');
    this.direction = CharacterDirection.LEFT;
    this.vx = -0.3125; // 5/16
  }

  stop() {
    this._logger.info('character stop');
    this.vx = 0;
  }

  jumpUp() {
    this._logger.info('character jump up');
    const jumpVelocity = 1;
    this.vy = -jumpVelocity;
    this._isGrounded = false;
  }

  jumpRight() {
    this.jumpUp();
    this._logger.info('and to the right');
    this.vx = 0.3125; // 5/16
  }

  jumpLeft() {
    this.jumpUp();
    this._logger.info('and to the left');
    this.vx = -0.3125; // 5/16
  }

  /*
   * This needs to be called when the character hits the ground
   */
  land() {
    this.vy = 0;
    this._isGrounded = true;
  }

  tileTop(): TileCoordinates {
    const center = Math.floor(this.x + 0.5);
    const top = Math.floor(this.y);

    return { x: center, y: top };
  }

  tileBottom(): TileCoordinates {
    const center = Math.floor(this.x + 0.5);
    const top = Math.floor(this.y);
    const bottom = Math.floor(this.y + this.height);

    if (this.y === top) {
      return { x: center, y: top };
    }
    return { x: center, y: bottom };
  }

  tileLeft(): TileCoordinates {
    const left = Math.floor(this.x);
    const middle = Math.floor(this.y + 0.5);

    return { x: left, y: middle };
  }

  tileRight(): TileCoordinates {
    const left = Math.floor(this.x);
    const right = Math.floor(this.x + this.width);
    const middle = Math.floor(this.y + 0.5);

    if (this.x === left) {
      return { x: left, y: middle };
    }
    return { x: right, y: middle };
  }

  render(screen: Screen) {
    const tileWidth = 16; // pixels
    const tileHeight = 16; // pixels

    const pixelX = Math.round(this.x * tileWidth);
    const pixelY = Math.round(this.y * tileHeight);
    const pixelWidth = Math.round(this.width * tileWidth);
    const pixelHeight = Math.round(this.height * tileHeight);

    screen.drawRectangle(pixelX, pixelY, pixelWidth, pixelHeight, {
      fill: true,
      color: 'white',
      offset: true,
    });
  }

  toString(): string {
    const { x, y, vx, vy } = this;
    return JSON.stringify({ x, y, vx, vy });
  }
}

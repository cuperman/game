import { Logger } from '../lib';
import { Screen } from '../screen';
import { TileCoordinates } from '../stages';

export interface ICharacter {
  /*
   * Floating point value for horizontal coordinate on the tile grid
   */
  readonly x: number;

  /*
   * Floating point value for vertical coordinate on the tile grid
   */
  readonly y: number;

  /*
   * Floating point value for horizontal velocity (tiles/second)
   */
  readonly vx: number;

  /*
   * Floating point value for vertical velocity (tiles/second)
   */
  readonly vy: number;

  /*
   * Width of character in tiles
   */
  readonly width: number;

  /*
   * Height of character in tiles
   */
  readonly height: number;

  /*
   * True if character is on the ground, otherwise false
   */
  readonly grounded: boolean;

  /*
   * True if character is moving, otherwise false
   */
  readonly moving: boolean;

  load: () => Promise<void>;
  render: (screen: Screen) => void;

  runRight: () => void;
  runLeft: () => void;
  stop: () => void;
  jumpUp: () => void;
  jumpRight: () => void;
  jumpLeft: () => void;
  peak: () => void;
  land: () => void;

  accelerate: (xAcceleration: number, yAccelleration: number) => void;
  translate: (x: number, y: number) => void;
  moveTo: (x: number, y: number) => void;

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
  protected direction: CharacterDirection;
  protected _width: number;
  protected _height: number;

  private _x: number;
  private _y: number;
  private _vx: number;
  private _vy: number;
  private _logger: Logger;
  private _isGrounded: boolean;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
    this._vx = 0;
    this._vy = 0;

    this._width = 1;
    this._height = 1;

    this.direction = CharacterDirection.RIGHT;
    this._logger = new Logger();

    this._isGrounded = false;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get vx() {
    return this._vx;
  }

  get vy() {
    return this._vy;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get grounded(): boolean {
    return this._isGrounded;
  }

  get moving(): boolean {
    return this.vx !== 0 || this.vy !== 0;
  }

  async load() {
    return;
  }

  runRight() {
    this._logger.info('character run right');
    this.direction = CharacterDirection.RIGHT;
    this._vx = 0.3125; // 5/16
  }

  runLeft() {
    this._logger.info('character run left');
    this.direction = CharacterDirection.LEFT;
    this._vx = -0.3125; // 5/16
  }

  stop() {
    this._logger.info('character stop');
    this._vx = 0;
  }

  jumpUp() {
    this._logger.info('character jump up');
    const jumpVelocity = 1;
    this._vy = -jumpVelocity;
    this._isGrounded = false;
  }

  jumpRight() {
    this.jumpUp();
    this._logger.info('and to the right');
    this._vx = 0.3125; // 5/16
  }

  jumpLeft() {
    this.jumpUp();
    this._logger.info('and to the left');
    this._vx = -0.3125; // 5/16
  }

  /*
   * This needs to be called when the character hits something from below
   */
  peak() {
    this._vy = 0;
  }

  /*
   * This needs to be called when the character hits the ground
   */
  land() {
    this._vy = 0;
    this._isGrounded = true;
  }

  accelerate(xAcceleration: number, yAcceleration: number): void {
    this._vx = this._vx + xAcceleration;
    this._vy = this._vy + yAcceleration;
  }

  translate(x: number, y: number): void {
    this._x = this._x + x;
    this._y = this._y + y;
  }

  moveTo(x: number, y: number): void {
    this._x = x;
    this._y = y;
  }

  tileTop(): TileCoordinates {
    const center = Math.floor(this.x + 0.5);
    const top = Math.floor(this.y);

    return { x: center, y: top };
  }

  tileBottom(): TileCoordinates {
    const center = Math.floor(this.x + 0.5);
    const top = Math.floor(this.y + this.height - 1); // top of the bottom tile
    const bottom = Math.floor(this.y + this.height);

    if (top === this.y + this.height - 1) {
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
    const left = Math.floor(this.x + this.width - 1); // left of the right tile
    const right = Math.floor(this.x + this.width);
    const middle = Math.floor(this.y + 0.5);

    if (left === this.x + this.width - 1) {
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

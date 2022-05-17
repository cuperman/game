import { Canvas, Logger } from '../lib';
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

  readonly name: string;

  load: () => Promise<void>;
  render: (screen: Screen, elapsed: DOMHighResTimeStamp) => void;
  profileImage: () => Promise<ImageBitmap>;

  runRight: () => void;
  runLeft: () => void;
  stop: () => void;
  jumpUp: () => void;
  jumpRight: () => void;
  jumpLeft: () => void;
  peak: () => void;
  land: () => void;

  /**
   * Increase the velocity in each direction by this amount
   * @param ax - horizontal acceleration (tiles/ms/ms)
   * @param ay - vertical acceleration (tiles/ms/ms)
   * @param t - elapsed time (ms)
   */
  accelerate: (ax: number, ay: number, t: number) => void;

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

export interface CharacterProps {
  readonly name: string;
  readonly width: number;
  readonly height: number;
  readonly runVelocity: number;
  readonly jumpVelocity: number;
}

export class Character implements ICharacter {
  private _direction: CharacterDirection;
  private _width: number;
  private _height: number;
  private _name: string;
  private _x: number;
  private _y: number;
  private _vx: number;
  private _vy: number;
  private _logger: Logger;
  private _isGrounded: boolean;
  private _runVelocity: number;
  private _jumpVelocity: number;

  constructor(x: number, y: number, props: CharacterProps) {
    this._name = props.name;

    this._x = x;
    this._y = y;
    this._vx = 0;
    this._vy = 0;

    this._width = props.width;
    this._height = props.height;

    this._direction = CharacterDirection.RIGHT;
    this._logger = new Logger();

    this._isGrounded = false;

    this._runVelocity = props.runVelocity;
    this._jumpVelocity = props.jumpVelocity;
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

  get running(): boolean {
    return this.moving && this.grounded;
  }

  get jumping(): boolean {
    return this.moving && !this.grounded;
  }

  get name(): string {
    return this._name;
  }

  get direction(): CharacterDirection {
    return this._direction;
  }

  async load() {
    return;
  }

  runRight() {
    this._logger.info('character run right');
    this._direction = CharacterDirection.RIGHT;
    this._vx = this._runVelocity;
  }

  runLeft() {
    this._logger.info('character run left');
    this._direction = CharacterDirection.LEFT;
    this._vx = -this._runVelocity;
  }

  stop() {
    this._logger.info('character stop');
    this._vx = 0;
  }

  jumpUp() {
    this._logger.info('character jump up');
    const jumpVelocity = this._jumpVelocity;
    this._vy = -jumpVelocity;
    this._isGrounded = false;
  }

  jumpRight() {
    this.jumpUp();
    this._logger.info('and to the right');
    this._vx = this._runVelocity;
  }

  jumpLeft() {
    this.jumpUp();
    this._logger.info('and to the left');
    this._vx = -this._runVelocity;
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

  accelerate(ax: number, ay: number, t: number): void {
    this._vx += ax * t;
    this._vy += ay * t;
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

  render(screen: Screen, elapsed: DOMHighResTimeStamp) {
    const tileWidth = 16; // pixels
    const tileHeight = 16; // pixels

    const pixelX = Math.round(this.x * tileWidth);
    const pixelY = Math.round(this.y * tileHeight);
    const pixelWidth = Math.round(this.width * tileWidth);
    const pixelHeight = Math.round(this.height * tileHeight);

    screen.drawRectangle(pixelX, pixelY, pixelWidth, pixelHeight, {
      fill: true,
      color: 'White',
      offset: true,
    });
  }

  profileImage(): Promise<ImageBitmap> {
    const canvas = new Canvas(16, 16);
    const context = canvas.get2DContext();
    context.fillStyle = 'White';
    context.fillRect(0, 0, 16, 16);

    return createImageBitmap(canvas.element);
  }

  toString(): string {
    const { x, y, vx, vy } = this;
    return JSON.stringify({ x, y, vx, vy });
  }
}

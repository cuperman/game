import { Logger } from '../lib';
import { Screen } from '../screen';

export interface ICharacter {
  x: number;
  y: number;
  vx: number;
  vy: number;

  width: number;
  height: number;

  grounded: boolean;
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

    this._width = 16;
    this._height = 16;

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
    this.vx = 5;
  }

  runLeft() {
    this._logger.info('character run left');
    this.direction = CharacterDirection.LEFT;
    this.vx = -5;
  }

  stop() {
    this._logger.info('character stop');
    this.vx = 0;
  }

  jumpUp() {
    this._logger.info('character jump up');
    const jumpVelocity = 16;
    this.vy = -jumpVelocity;
    this._isGrounded = false;
  }

  jumpRight() {
    this.jumpUp();
    this._logger.info('and to the right');
    this.vx = 5;
  }

  jumpLeft() {
    this.jumpUp();
    this._logger.info('and to the left');
    this.vx = -5;
  }

  /*
   * This needs to be called when the character hits the ground
   */
  land() {
    this.vy = 0;
    this._isGrounded = true;
  }

  render(screen: Screen) {
    const width = 16;
    const height = 16;

    screen.drawRectangle(Math.round(this.x), Math.round(this.y), width, height, {
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

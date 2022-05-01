import { Screen } from '../screen';

export interface ICharacter {
  x: number;
  y: number;
  vx: number;
  vy: number;

  width: number;
  height: number;

  load: () => Promise<void>;
  render: (screen: Screen) => void;
  runRight: () => void;
  runLeft: () => void;
  stop: () => void;
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

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;

    this._width = 16;
    this._height = 16;

    this.direction = CharacterDirection.RIGHT;
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

  runRight() {
    this.direction = CharacterDirection.RIGHT;
    this.vx = 5;
  }

  runLeft() {
    this.direction = CharacterDirection.LEFT;
    this.vx = -5;
  }

  stop() {
    this.vx = 0;
  }

  render(screen: Screen) {
    const width = 16;
    const height = 16;

    screen.drawRectangle(this.x, this.y, width, height, { fill: true, color: 'white', offset: true });
  }

  toString(): string {
    const { x, y, vx, vy } = this;
    return JSON.stringify({ x, y, vx, vy });
  }
}

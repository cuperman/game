import { Canvas } from './lib';

export interface RectangleOptions {
  readonly color?: string;
  readonly offset?: boolean;
  readonly fill?: boolean;
}

export class Screen {
  public canvas: Canvas;
  public xOffset: number;
  public yOffset: number;
  public width: number;
  public height: number;

  private context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.xOffset = 0;
    this.yOffset = 0;

    this.canvas = new Canvas(this.width, this.height);
    this.context = this.canvas.get2DContext();
  }

  drawRectangle(x: number, y: number, w: number, h: number, options: RectangleOptions = {}) {
    const rectX = options.offset ? x - this.xOffset : x;
    const rectY = options.offset ? y - this.yOffset : y;

    if (options.fill) {
      this.context.fillStyle = options.color ? options.color : 'black';
      this.context.fillRect(rectX, rectY, w, h);
    } else {
      this.context.strokeStyle = options.color ? options.color : 'black';
      this.context.strokeRect(rectX, rectY, w, h);
    }
  }

  drawBackground(image: CanvasImageSource) {
    this.context.drawImage(image, this.xOffset, this.yOffset, this.width, this.height, 0, 0, this.width, this.height);
  }

  drawSprite(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ) {
    this.context.drawImage(image, sx, sy, sw, sh, dx - this.xOffset, dy - this.yOffset, dw, dh);
  }

  drawSpriteFlipped(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number,
  ) {
    this.context.scale(-1, 1);
    this.context.drawImage(image, sx, sy, sw, sh, -dx - dw + this.xOffset, dy - this.yOffset, dw, dh);
    this.context.resetTransform();
  }

  toString(): string {
    const { width, height, xOffset, yOffset } = this;
    return JSON.stringify({ width, height, xOffset, yOffset });
  }
}
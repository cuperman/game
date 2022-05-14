import { Canvas } from './lib';

// FIXME: this is an assumption
const TILE_WIDTH = 16;

export interface RectangleOptions {
  readonly color?: string;
  readonly offset?: boolean;
  readonly fill?: boolean;
  readonly alpha?: number;
}

export class Screen {
  public canvas: Canvas;
  public xOffset: number;
  public yOffset: number;
  public width: number;
  public height: number;

  private context: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.width = Math.round(width);
    this.height = Math.round(height);
    this.xOffset = 0;
    this.yOffset = 0;

    this.canvas = new Canvas(this.width, this.height);
    this.context = this.canvas.get2DContext();
  }

  drawRectangle(x: number, y: number, w: number, h: number, options: RectangleOptions = {}) {
    const rectX = typeof options.offset !== 'undefined' ? Math.round(x - this.xOffset) : x;
    const rectY = typeof options.offset !== 'undefined' ? Math.round(y - this.yOffset) : y;

    this.context.globalAlpha = typeof options.alpha !== 'undefined' ? options.alpha : 1;

    if (options.fill) {
      this.context.fillStyle = options.color ? options.color : 'black';
      this.context.fillRect(rectX, rectY, w, h);
    } else {
      this.context.strokeStyle = options.color ? options.color : 'black';
      this.context.strokeRect(rectX, rectY, w, h);
    }

    this.context.globalAlpha = 1;
  }

  drawBackground(image: CanvasImageSource) {
    this.context.drawImage(
      image,
      Math.round(this.xOffset),
      Math.round(this.yOffset),
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height,
    );
  }

  drawSprite(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw?: number,
    dh?: number,
  ) {
    this.context.drawImage(
      image,
      sx,
      sy,
      sw,
      sh,
      dx - Math.round(this.xOffset),
      dy - Math.round(this.yOffset),
      dw || sw,
      dh || sh,
    );
  }

  drawSpriteFlipped(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw?: number,
    dh?: number,
  ) {
    this.context.scale(-1, 1);
    this.context.drawImage(
      image,
      sx,
      sy,
      sw,
      sh,
      -dx - TILE_WIDTH + Math.round(this.xOffset),
      dy - Math.round(this.yOffset),
      dw || sw,
      dh || sh,
    );
    this.context.resetTransform();
  }

  drawText(text: string, x: number, y: number) {
    this.context.fillStyle = 'white';
    this.context.fillText(text, x, y);
  }

  toString(): string {
    const { width, height, xOffset, yOffset } = this;
    return JSON.stringify({ width, height, xOffset, yOffset });
  }
}

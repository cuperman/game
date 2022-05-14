import { applyAlpha, Color, FrameRate, getAnimationFrame, loadImage } from '../lib';
import { Screen } from '../screen';
import { Character, CharacterDirection } from './character';

export interface SpriteFrame {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly xo: number;
  readonly yo: number;
}

export interface SpriteMapCoords {
  readonly idle: SpriteFrame[][];
  readonly run: SpriteFrame[][];
  readonly jump: SpriteFrame[][];
}

export interface SpriteCharacterProps {
  readonly tileWidth: number;
  readonly tileHeight: number;

  readonly spriteMapPath: string;
  readonly spriteMapAlpha?: Color;
  readonly spriteMapCoords: SpriteMapCoords;
  readonly animationFrameRate: FrameRate;
}

export class SpriteCharacter extends Character {
  private tileWidth: number;
  private tileHeight: number;

  private spriteMapPath: string;
  private spriteMapAlpha?: Color;
  private spriteMapCoords: SpriteMapCoords;
  private spriteMap: ImageBitmap;

  private animationFrameRate: FrameRate;
  private animationElapsed: number;

  private drawBoundingBox: boolean;

  constructor(x: number, y: number, props: SpriteCharacterProps) {
    super(x, y);

    this.tileWidth = props.tileWidth;
    this.tileHeight = props.tileHeight;

    this.spriteMapPath = props.spriteMapPath;
    this.spriteMapAlpha = props.spriteMapAlpha;
    this.spriteMapCoords = props.spriteMapCoords;

    this.animationFrameRate = props.animationFrameRate;
    this.animationElapsed = 0;

    this.drawBoundingBox = false;
  }

  async load() {
    const image = await loadImage(this.spriteMapPath);
    if (this.spriteMapAlpha) {
      this.spriteMap = await applyAlpha(image, this.spriteMapAlpha);
    } else {
      this.spriteMap = image;
    }
  }

  render(screen: Screen, elapsed: DOMHighResTimeStamp) {
    this.animationElapsed += elapsed;

    const pixelX = Math.round(this.x * this.tileWidth);
    const pixelY = Math.round(this.y * this.tileHeight);
    const boundingBoxOptions = { color: 'White', alpha: 0.5, fill: true, offset: true };

    let frameIndex: number;
    let frames: SpriteFrame[];

    if (this.jumping) {
      // jumping
      frameIndex = getAnimationFrame(this.spriteMapCoords.jump.length, this.animationFrameRate, this.animationElapsed);
      frames = this.spriteMapCoords.jump[frameIndex];
    } else if (this.moving) {
      // running
      frameIndex = getAnimationFrame(this.spriteMapCoords.run.length, this.animationFrameRate, this.animationElapsed);
      frames = this.spriteMapCoords.run[frameIndex];
    } else {
      // idle
      frameIndex = getAnimationFrame(this.spriteMapCoords.idle.length, this.animationFrameRate, this.animationElapsed);
      frames = this.spriteMapCoords.idle[frameIndex];
    }

    if (this.drawBoundingBox) {
      frames.forEach(({ w, h, xo, yo }) => {
        if (this.direction === CharacterDirection.RIGHT) {
          screen.drawRectangle(pixelX + xo, pixelY + yo, w, h, boundingBoxOptions);
        } else {
          // FIXME
          screen.canvas.get2DContext().scale(-1, 1);
          screen.drawRectangle(-(pixelX - xo) - 16, pixelY + yo, w, h, boundingBoxOptions);
          screen.canvas.get2DContext().resetTransform();
        }
      });
    }

    frames.forEach(({ x, y, w, h, xo, yo }) => {
      if (this.direction === CharacterDirection.RIGHT) {
        screen.drawSprite(this.spriteMap, x, y, w, h, pixelX + xo, pixelY + yo);
      } else {
        screen.drawSpriteFlipped(this.spriteMap, x, y, w, h, pixelX - xo, pixelY + yo);
      }
    });
  }
}

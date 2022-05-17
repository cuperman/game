import { applyAlpha, Canvas, Color, FrameRate, getAnimationFrame, loadImage } from '../lib';
import { Screen } from '../screen';
import { Character, CharacterDirection, CharacterProps } from './character';

export interface SpriteFrame {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly xo: number;
  readonly yo: number;
}

export interface SpriteMapCoords {
  readonly profile: SpriteFrame[][];
  readonly idle: SpriteFrame[][];
  readonly run: SpriteFrame[][];
  readonly jump: SpriteFrame[][];
}

export interface SpriteCharacterProps extends CharacterProps {
  readonly tileWidth: number;
  readonly tileHeight: number;

  readonly spriteMapPath: string;
  readonly spriteMapAlpha?: Color;
  readonly spriteMapCoords: SpriteMapCoords;
  readonly spriteDirection?: CharacterDirection;
  readonly animationFrameRate: FrameRate;

  readonly drawBoundingBoxes?: boolean;
}

export interface SpriteCharacterOverrides {
  readonly tileWidth?: number;
  readonly tileHeight?: number;

  readonly spriteMapPath?: string;
  readonly spriteMapAlpha?: Color;
  readonly spriteMapCoords?: SpriteMapCoords;
  readonly spriteDirection?: CharacterDirection;
  readonly animationFrameRate?: FrameRate;

  readonly drawBoundingBoxes?: boolean;
}

export class SpriteCharacter extends Character {
  public tileWidth: number;
  public tileHeight: number;

  private spriteMapPath: string;
  private spriteMapAlpha?: Color;
  private spriteMapCoords: SpriteMapCoords;
  private spriteMap: ImageBitmap;
  private spriteDirection: CharacterDirection;

  private animationFrameRate: FrameRate;
  private animationElapsed: number;

  private drawBoundingBox: boolean;

  constructor(props: SpriteCharacterProps) {
    super(props);

    this.tileWidth = props.tileWidth;
    this.tileHeight = props.tileHeight;

    this.spriteMapPath = props.spriteMapPath;
    this.spriteMapAlpha = props.spriteMapAlpha;
    this.spriteMapCoords = props.spriteMapCoords;
    this.spriteDirection =
      typeof props.spriteDirection !== 'undefined' ? props.spriteDirection : CharacterDirection.RIGHT;

    this.animationFrameRate = props.animationFrameRate;
    this.animationElapsed = 0;

    this.drawBoundingBox = !!props.drawBoundingBoxes;
  }

  async load() {
    const image = await loadImage(this.spriteMapPath);
    if (this.spriteMapAlpha) {
      this.spriteMap = await applyAlpha(image, this.spriteMapAlpha);
    } else {
      this.spriteMap = image;
    }
  }

  async profileImage(): Promise<ImageBitmap> {
    const canvas = new Canvas(16, 16);
    const context = canvas.get2DContext();
    const frame = this.spriteMapCoords.profile[0][0];
    context.drawImage(this.spriteMap, frame.x, frame.y, 16, 16, 0, 0, 16, 16);
    return createImageBitmap(canvas.element);
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
        if (this.direction === this.spriteDirection) {
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
      if (this.direction == this.spriteDirection) {
        screen.drawSprite(this.spriteMap, x, y, w, h, pixelX + xo, pixelY + yo);
      } else {
        screen.drawSpriteFlipped(this.spriteMap, x, y, w, h, pixelX - xo, pixelY + yo);
      }
    });
  }
}

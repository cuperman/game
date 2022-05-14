import { FrameRate } from '../lib';
import { SpriteCharacter } from './sprite_character';

export class Ryu extends SpriteCharacter {
  constructor(x: number, y: number) {
    super(x, y, {
      tileWidth: 16,
      tileHeight: 16,
      animationFrameRate: FrameRate.TWELVE_FPS,
      spriteMapPath: '/img/ninja-gaiden-sprites.png',
      spriteMapAlpha: { r: 116, g: 116, b: 116 },
      spriteMapCoords: {
        idle: [
          [
            { x: 2, y: 21, w: 16, h: 16, xo: 0, yo: 0 },
            { x: 1, y: 37, w: 16, h: 16, xo: -1, yo: 16 },
          ],
        ],
        run: [
          [
            { x: 33, y: 21, w: 16, h: 16, xo: 0, yo: 0 },
            { x: 29, y: 37, w: 24, h: 16, xo: -4, yo: 16 },
          ],
          [
            { x: 58, y: 21, w: 16, h: 16, xo: 0, yo: 0 },
            { x: 54, y: 37, w: 24, h: 16, xo: -4, yo: 16 },
          ],
          [
            { x: 83, y: 21, w: 16, h: 16, xo: 0, yo: 0 },
            { x: 79, y: 37, w: 16, h: 16, xo: -4, yo: 16 },
          ],
        ],
        jump: [
          [{ x: 212, y: 21, w: 16, h: 32, xo: 0, yo: 0 }],
          [{ x: 229, y: 21, w: 24, h: 16, xo: -4, yo: 0 }],
          [{ x: 254, y: 21, w: 16, h: 32, xo: 0, yo: -10 }],
          [{ x: 271, y: 21, w: 24, h: 16, xo: 0, yo: 0 }],
        ],
      },
    });

    // FIXME
    this._width = 1;
    this._height = 2;
  }
}

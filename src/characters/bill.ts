import { FrameRate } from '../lib';
import { SpriteCharacter, SpriteCharacterOverrides } from './sprite_character';

export class Bill extends SpriteCharacter {
  constructor(x: number, y: number, overrides?: SpriteCharacterOverrides) {
    super(x, y, {
      tileWidth: 16,
      tileHeight: 16,
      spriteMapPath: '/img/contra-sprites.png',
      spriteMapCoords: {
        profile: [[{ x: 1, y: 8, w: 16, h: 16, xo: 0, yo: 0 }]],
        idle: [
          [
            { x: 1, y: 8, w: 16, h: 34, xo: 0, yo: 0 },
            { x: 17, y: 17, w: 7, h: 6, xo: 16, yo: 9 },
          ],
        ],
        run: [
          [
            { x: 1, y: 44, w: 16, h: 34, xo: 0, yo: 0 },
            { x: 15, y: 43, w: 2, h: 1, xo: 14, yo: -1 },
          ],
          [
            { x: 21, y: 44, w: 16, h: 34, xo: 0, yo: 0 },
            { x: 35, y: 43, w: 2, h: 1, xo: 14, yo: -1 },
          ],
          [
            { x: 40, y: 44, w: 16, h: 34, xo: 0, yo: 0 },
            { x: 38, y: 62, w: 2, h: 10, xo: -2, yo: 17 },
            { x: 56, y: 49, w: 2, h: 8, xo: 16, yo: 5 },
            { x: 56, y: 75, w: 2, h: 3, xo: 16, yo: 31 },
          ],
          [{ x: 59, y: 44, w: 16, h: 34, xo: 0, yo: 0 }],
          [
            { x: 78, y: 44, w: 16, h: 34, xo: 0, yo: 0 },
            { x: 76, y: 70, w: 2, h: 8, xo: -2, yo: 26 },
          ],
          [
            { x: 97, y: 44, w: 16, h: 34, xo: 0, yo: 0 },
            { x: 95, y: 62, w: 2, h: 10, xo: -2, yo: 17 },
            { x: 113, y: 49, w: 2, h: 8, xo: 16, yo: 5 },
            { x: 113, y: 75, w: 2, h: 3, xo: 16, yo: 31 },
          ],
        ],
        jump: [
          [{ x: 117, y: 44, w: 16, h: 34, xo: 0, yo: 0 }],
          [
            { x: 137, y: 44, w: 16, h: 34, xo: 0, yo: 0 },
            { x: 135, y: 61, w: 2, h: 7, xo: -2, yo: 17 },
            { x: 153, y: 60, w: 2, h: 7, xo: 16, yo: 16 },
          ],
          [{ x: 157, y: 44, w: 16, h: 34, xo: 0, yo: 0 }],
          [
            { x: 177, y: 44, w: 16, h: 34, xo: 0, yo: 0 },
            { x: 175, y: 57, w: 2, h: 7, xo: -2, yo: 13 },
            { x: 193, y: 56, w: 2, h: 7, xo: 16, yo: 12 },
          ],
        ],
      },
      animationFrameRate: FrameRate.TWELVE_FPS,
      ...overrides,
    });

    this._width = 1;
    this._height = 2.125; // 34 pixels
    this._name = 'Bill Rizer';
  }
}

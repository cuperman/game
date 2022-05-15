import { FrameRate } from '../lib';
import { SpriteCharacter } from './sprite_character';

export class Link extends SpriteCharacter {
  constructor(x: number, y: number) {
    super(x, y, {
      tileWidth: 16,
      tileHeight: 16,
      animationFrameRate: FrameRate.TWELVE_FPS,
      spriteMapPath: '/img/zelda-sprites.png',
      spriteMapAlpha: { r: 128, g: 0, b: 128 },
      spriteMapCoords: {
        profile: [[{ x: 1, y: 11, w: 16, h: 16, xo: 0, yo: 0 }]],
        idle: [[{ x: 1, y: 11, w: 16, h: 32, xo: 0, yo: 0 }]],
        run: [
          [{ x: 29, y: 11, w: 16, h: 32, xo: 0, yo: 0 }],
          [{ x: 46, y: 11, w: 16, h: 32, xo: 0, yo: 0 }],
          [{ x: 63, y: 11, w: 16, h: 32, xo: 0, yo: 0 }],
        ],
        jump: [[{ x: 134, y: 11, w: 16, h: 32, xo: 0, yo: 0 }]],
      },
    });

    // FIXME
    this._width = 1;
    this._height = 2;
    this._name = 'Link';
  }
}

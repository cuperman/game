import { FrameRate } from '../lib';
import { SpriteCharacter, SpriteCharacterOverrides } from './sprite_character';

export class Samus extends SpriteCharacter {
  constructor(x: number, y: number, overrides?: SpriteCharacterOverrides) {
    super(x, y, {
      name: 'Samus',
      width: 1,
      height: 2,
      runVelocity: 1 / 120,
      jumpVelocity: 1 / 32,
      tileWidth: 16,
      tileHeight: 16,
      spriteMapPath: '/img/metroid-sprites.png',
      spriteMapAlpha: { r: 116, g: 116, b: 116 },
      spriteMapCoords: {
        profile: [[{ x: 1, y: 11, w: 16, h: 32, xo: 0, yo: 0 }]],
        idle: [
          [
            { x: 1, y: 11, w: 16, h: 32, xo: 0, yo: 0 },
            { x: 17, y: 19, w: 4, h: 8, xo: 16, yo: 8 },
          ],
        ],
        run: [
          [
            { x: 29, y: 11, w: 16, h: 24, xo: 0, yo: 0 },
            { x: 29, y: 35, w: 8, h: 8, xo: 0, yo: 24 },
          ],
          [
            { x: 54, y: 11, w: 16, h: 32, xo: 0, yo: 0 },
            { x: 46, y: 35, w: 8, h: 8, xo: -8, yo: 24 },
          ],
          [
            { x: 79, y: 11, w: 16, h: 32, xo: 0, yo: 0 },
            { x: 71, y: 27, w: 8, h: 8, xo: -8, yo: 16 },
          ],
        ],
        jump: [
          [
            { x: 108, y: 11, w: 16, h: 24, xo: 0, yo: 0 },
            { x: 100, y: 27, w: 8, h: 8, xo: -8, yo: 16 },
            { x: 116, y: 35, w: 8, h: 8, xo: 8, yo: 24 },
          ],
        ],
      },
      animationFrameRate: FrameRate.TWELVE_FPS,
      ...overrides,
    });
  }
}

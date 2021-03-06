import { FrameRate } from '../lib';
import { SpriteCharacter, SpriteCharacterOverrides } from './sprite_character';

export class Link extends SpriteCharacter {
  constructor(overrides?: SpriteCharacterOverrides) {
    super({
      name: 'Link',
      width: 1,
      height: 2,
      runVelocity: 1 / 120,
      jumpVelocity: 1 / 32,
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
      ...overrides,
    });
  }
}

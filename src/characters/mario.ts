import { FrameRate } from '../lib';
import { SpriteCharacter, SpriteCharacterOverrides } from './sprite_character';

export class Mario extends SpriteCharacter {
  constructor(overrides?: SpriteCharacterOverrides) {
    super({
      name: 'Mario',
      width: 1,
      height: 1,
      runVelocity: 1 / 120,
      jumpVelocity: 1 / 32,
      tileWidth: 16,
      tileHeight: 16,
      animationFrameRate: FrameRate.TWELVE_FPS,
      spriteMapPath: '/img/mario-sprites.png',
      spriteMapAlpha: { r: 146, g: 144, b: 255 },
      spriteMapCoords: {
        profile: [[{ x: 0, y: 8, w: 16, h: 16, xo: 0, yo: 0 }]],
        idle: [[{ x: 0, y: 8, w: 16, h: 16, xo: 0, yo: 0 }]],
        run: [
          [{ x: 20, y: 8, w: 16, h: 16, xo: 0, yo: 0 }],
          [{ x: 38, y: 8, w: 16, h: 16, xo: 0, yo: 0 }],
          [{ x: 56, y: 8, w: 16, h: 16, xo: 0, yo: 0 }],
        ],
        jump: [[{ x: 96, y: 8, w: 16, h: 16, xo: 0, yo: 0 }]],
      },
      ...overrides,
    });
  }
}

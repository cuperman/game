import { FrameRate } from '../lib';
import { CharacterDirection } from './character';
import { SpriteCharacter, SpriteCharacterOverrides } from './sprite_character';

export class Simon extends SpriteCharacter {
  constructor(overrides?: SpriteCharacterOverrides) {
    super({
      name: 'Simon Belmont',
      width: 1,
      height: 2,
      runVelocity: 1 / 120,
      jumpVelocity: 1 / 32,
      tileWidth: 16,
      tileHeight: 16,
      spriteMapPath: '/img/castlevania-sprites.png',
      spriteMapAlpha: { r: 116, g: 116, b: 116 },
      spriteMapCoords: {
        profile: [[{ x: 1, y: 21, w: 16, h: 16, xo: 0, yo: 0 }]],
        idle: [[{ x: 1, y: 21, w: 16, h: 32, xo: 0, yo: 0 }]],
        run: [
          [{ x: 29, y: 21, w: 16, h: 32, xo: 0, yo: 0 }],
          [{ x: 46, y: 21, w: 16, h: 32, xo: 0, yo: 0 }],
          [{ x: 63, y: 21, w: 16, h: 32, xo: 0, yo: 0 }],
        ],
        jump: [[{ x: 84, y: 21, w: 16, h: 32, xo: 0, yo: 0 }]],
      },
      spriteDirection: CharacterDirection.LEFT,
      animationFrameRate: FrameRate.TWELVE_FPS,
      ...overrides,
    });
  }
}

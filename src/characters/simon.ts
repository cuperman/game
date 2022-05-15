import { FrameRate } from '../lib';
import { CharacterDirection } from './character';
import { SpriteCharacter, SpriteCharacterOverrides } from './sprite_character';

export class Simon extends SpriteCharacter {
  constructor(x: number, y: number, overrides?: SpriteCharacterOverrides) {
    super(x, y, {
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

    this._width = 1;
    this._height = 2;
    this._name = 'Simon Belmont';
  }
}

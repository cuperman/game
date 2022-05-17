import { FrameRate } from '../lib';
import { CharacterDirection } from './character';
import { SpriteCharacter, SpriteCharacterOverrides } from './sprite_character';

export class MegaMan extends SpriteCharacter {
  constructor(overrides?: SpriteCharacterOverrides) {
    super({
      name: 'Mega Man',
      width: 1.5, // 24 pixels
      height: 1.5, // 24 pixels
      runVelocity: 1 / 120,
      jumpVelocity: 1 / 32,
      tileWidth: 16,
      tileHeight: 16,
      spriteMapPath: '/img/mega-man-sprites.png',
      spriteMapAlpha: { r: 128, g: 0, b: 128 },
      spriteMapCoords: {
        profile: [[{ x: 4, y: 21, w: 16, h: 16, xo: 0, yo: 0 }]],
        idle: [[{ x: 1, y: 21, w: 24, h: 24, xo: 0, yo: 0 }]],
        run: [
          [
            { x: 95, y: 21, w: 16, h: 24, xo: 0, yo: 0 },
            { x: 87, y: 29, w: 8, h: 8, xo: -8, yo: 8 },
            { x: 111, y: 29, w: 8, h: 16, xo: 16, yo: 8 },
          ],
          [
            { x: 120, y: 21, w: 16, h: 24, xo: 0, yo: 0 },
            { x: 136, y: 29, w: 8, h: 8, xo: 16, yo: 8 },
          ],
          [
            { x: 145, y: 21, w: 16, h: 24, xo: 0, yo: 0 },
            { x: 161, y: 29, w: 8, h: 16, xo: 16, yo: 8 },
          ],
        ],
        jump: [
          [
            { x: 182, y: 13, w: 16, h: 24, xo: 0, yo: 0 },
            { x: 174, y: 14, w: 8, h: 8, xo: -8, yo: 1 },
            { x: 198, y: 14, w: 8, h: 8, xo: 16, yo: 1 },
            { x: 174, y: 29, w: 8, h: 8, xo: -8, yo: 16 },
            { x: 189, y: 37, w: 8, h: 8, xo: 7, yo: 24 },
          ],
        ],
      },
      spriteDirection: CharacterDirection.LEFT,
      animationFrameRate: FrameRate.TWELVE_FPS,
      ...overrides,
    });
  }
}

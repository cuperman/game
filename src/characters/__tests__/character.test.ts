import { Character } from '../character';

describe('Character', () => {
  const character = new Character(0, 0, {
    name: 'Character',
    width: 1,
    height: 1,
    runVelocity: 1 / 120,
    jumpVelocity: 1 / 32,
  });

  describe('tileTop', () => {
    it('returns the tile that the top edge of character is in', () => {
      character.moveTo(0, 0);
      expect(character.tileTop()).toEqual({ x: 0, y: 0 });

      character.moveTo(0, 0.99);
      expect(character.tileTop()).toEqual({ x: 0, y: 0 });

      character.moveTo(0, 1);
      expect(character.tileTop()).toEqual({ x: 0, y: 1 });
    });
  });

  describe('tileBottom', () => {
    it('returns the tile that the bottom edge of character is in', () => {
      character.moveTo(0, 0);
      expect(character.tileBottom()).toEqual({ x: 0, y: 0 });

      character.moveTo(0, 0.01);
      expect(character.tileBottom()).toEqual({ x: 0, y: 1 });

      character.moveTo(0, 1);
      expect(character.tileBottom()).toEqual({ x: 0, y: 1 });
    });
  });

  describe('tileLeft', () => {
    it('returns the tile that the left edge of character is in', () => {
      character.moveTo(0, 0);
      expect(character.tileLeft()).toEqual({ x: 0, y: 0 });

      character.moveTo(0.99, 0);
      expect(character.tileLeft()).toEqual({ x: 0, y: 0 });

      character.moveTo(1, 0);
      expect(character.tileLeft()).toEqual({ x: 1, y: 0 });
    });
  });

  describe('tileRight', () => {
    it('returns the tile that the right edge of character is in', () => {
      character.moveTo(0, 0);
      expect(character.tileRight()).toEqual({ x: 0, y: 0 });

      character.moveTo(0.01, 0);
      expect(character.tileRight()).toEqual({ x: 1, y: 0 });

      character.moveTo(1, 0);
      expect(character.tileRight()).toEqual({ x: 1, y: 0 });
    });
  });
});

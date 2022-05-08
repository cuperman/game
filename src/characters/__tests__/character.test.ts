import { Character } from '../character';

describe('Character', () => {
  const character = new Character(0, 0);

  describe('tileTop', () => {
    it('returns the tile that the top edge of character is in', () => {
      character.x = 0;
      character.y = 0;
      expect(character.tileTop()).toEqual({ x: 0, y: 0 });

      character.x = 0;
      character.y = 0.99;
      expect(character.tileTop()).toEqual({ x: 0, y: 0 });

      character.x = 0;
      character.y = 1;
      expect(character.tileTop()).toEqual({ x: 0, y: 1 });
    });
  });

  describe('tileBottom', () => {
    it('returns the tile that the top edge of character is in', () => {
      character.x = 0;
      character.y = 0;
      expect(character.tileBottom()).toEqual({ x: 0, y: 0 });

      character.x = 0;
      character.y = 0.01;
      expect(character.tileBottom()).toEqual({ x: 0, y: 1 });

      character.x = 0;
      character.y = 1;
      expect(character.tileBottom()).toEqual({ x: 0, y: 1 });
    });
  });

  describe('tileLeft', () => {
    it('returns the tile that the left edge of character is in', () => {
      character.x = 0;
      character.y = 0;
      expect(character.tileLeft()).toEqual({ x: 0, y: 0 });

      character.x = 0.99;
      character.y = 0;
      expect(character.tileLeft()).toEqual({ x: 0, y: 0 });

      character.x = 1;
      character.y = 0;
      expect(character.tileLeft()).toEqual({ x: 1, y: 0 });
    });
  });

  describe('tileRight', () => {
    it('returns the tile that the right edge of character is in', () => {
      character.x = 0;
      character.y = 0;
      expect(character.tileRight()).toEqual({ x: 0, y: 0 });

      character.x = 0.01;
      character.y = 0;
      expect(character.tileRight()).toEqual({ x: 1, y: 0 });

      character.x = 1;
      character.y = 0;
      expect(character.tileRight()).toEqual({ x: 1, y: 0 });
    });
  });
});

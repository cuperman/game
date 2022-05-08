import { Link } from '../link';

describe('Link', () => {
  const link = new Link(0, 0);

  describe('height', () => {
    it('is 2', () => {
      expect(link.height).toEqual(2);
    });
  });

  describe('tileTop', () => {
    it('returns the tile that the top edge of link is in', () => {
      link.moveTo(0, 0);
      expect(link.tileTop()).toEqual({ x: 0, y: 0 });

      link.moveTo(0, 0.99);
      expect(link.tileTop()).toEqual({ x: 0, y: 0 });

      link.moveTo(0, 1);
      expect(link.tileTop()).toEqual({ x: 0, y: 1 });
    });
  });

  describe('tileBottom', () => {
    it('returns the tile that the bottom edge of character is in (link is 2 tiles tall)', () => {
      link.moveTo(0, 0);
      expect(link.tileBottom()).toEqual({ x: 0, y: 1 });

      link.moveTo(0, 0.01);
      expect(link.tileBottom()).toEqual({ x: 0, y: 2 });

      link.moveTo(0, 1);
      expect(link.tileBottom()).toEqual({ x: 0, y: 2 });
    });
  });
});

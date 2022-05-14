import { getAnimationFrame } from '../animation';

describe('getAnimationFrame', () => {
  describe('3 frame animation at 12 fps', () => {
    const frames = 3;
    const frameRate = 1000 / 12;

    it('returns first frame when no time has elapsed', () => {
      const frame = getAnimationFrame(frames, frameRate / 12, 0);
      expect(frame).toEqual(0);
    });

    it('returns first frame before 12th of a second has elapsed', () => {
      const frame = getAnimationFrame(frames, frameRate, Math.floor((1 * 1000) / 12));
      expect(frame).toEqual(0);
    });

    it('returns second frame after 12th of a second has elapsed', () => {
      const frame = getAnimationFrame(frames, frameRate, Math.ceil((1 * 1000) / 12));
      expect(frame).toEqual(1);
    });

    it('returns second frame before 2 12ths of a second has elapsed', () => {
      const frame = getAnimationFrame(frames, frameRate, Math.floor((2 * 1000) / 12));
      expect(frame).toEqual(1);
    });

    it('returns 3rd frame after 2 12ths of a second has elapsed', () => {
      const frame = getAnimationFrame(frames, frameRate, Math.ceil((2 * 1000) / 12));
      expect(frame).toEqual(2);
    });

    it('returns 4th frame before 3 12ths of a second has elapsed', () => {
      const frame = getAnimationFrame(frames, frameRate, Math.floor((3 * 1000) / 12) - 1);
      expect(frame).toEqual(2);
    });

    it('returns 4th frame after 3 12ths of a second has elapsed', () => {
      const frame = getAnimationFrame(frames, frameRate, Math.ceil((3 * 1000) / 12));
      expect(frame).toEqual(0);
    });
  });
});

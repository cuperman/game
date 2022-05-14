export enum FrameRate {
  TWO_FPS = 1000 / 2,
  TWELVE_FPS = 1000 / 12,
}

export async function requestAnimationFrame(): Promise<DOMHighResTimeStamp> {
  return new Promise((resolve) => {
    window.requestAnimationFrame((time) => {
      resolve(time);
    });
  });
}

/**
 * @param frames - number of frames in the animation
 * @param frameRate - frame rate of the animation (frames / millisecond)
 * @param elapsed - elapsed time (milliseconds)
 * @returns index of the animation frame to use
 */
export function getAnimationFrame(frames: number, frameRate: number, elapsed: DOMHighResTimeStamp): number {
  return Math.floor((elapsed / frameRate) % frames);
}

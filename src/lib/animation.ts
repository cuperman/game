export async function requestAnimationFrame(): Promise<DOMHighResTimeStamp> {
  return new Promise((resolve) => {
    window.requestAnimationFrame((time) => {
      resolve(time);
    });
  });
}

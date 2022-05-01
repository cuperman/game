export async function sleep(duration: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });
}

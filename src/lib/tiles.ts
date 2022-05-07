export function loadTileMap(tileMap: string): string[][] {
  return tileMap
    .trim()
    .split('\n')
    .map((row) => row.trim().split(''));
}

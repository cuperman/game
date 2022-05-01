export interface Character {
  x: number;
  y: number;
  vx: number;
  vy: number;

  load: () => Promise<void>;
  render: (context: CanvasRenderingContext2D) => void;
}

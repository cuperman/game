export interface Stage {
  load: () => Promise<void>;
  render: (context: CanvasRenderingContext2D) => void;
}

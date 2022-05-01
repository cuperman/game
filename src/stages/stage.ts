import { Screen } from '../screen';

export interface IStage {
  width: number;
  height: number;

  load: () => Promise<void>;
  render: (screen: Screen) => void;
}

export class Stage implements IStage {
  public width: number;
  public height: number;

  constructor() {
    this.width = 320;
    this.height = 240;
  }

  async load() {
    return;
  }

  render(screen: Screen) {
    screen.drawRectangle(0, 0, this.width, this.height, { color: 'LightSkyBlue', fill: true });
  }
}

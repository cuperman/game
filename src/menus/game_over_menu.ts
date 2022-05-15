import { Menu } from './menu';
import { Screen } from '../screen';

export class GameOverMenu extends Menu {
  constructor() {
    super();
  }

  async load() {
    return;
  }

  render(screen: Screen) {
    screen.drawRectangle(0, 0, screen.width, screen.height, { color: 'Black', fill: true, alpha: 0.5 });
    screen.drawText('GAME OVER', screen.width / 2 - 32, screen.height / 2);
  }

  async open(screen: Screen) {
    await this.load();

    this.render(screen);
  }
}

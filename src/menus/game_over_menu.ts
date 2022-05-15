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
    screen.drawText('GAME OVER', screen.width / 2, screen.height / 2);
  }

  async open(screen: Screen) {
    await this.load();

    this.render(screen);
  }
}

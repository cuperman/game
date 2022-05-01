import { Screen } from './screen';

export class Controller {
  public up: boolean;
  public down: boolean;
  public left: boolean;
  public right: boolean;

  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
  }

  onKeyUp(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.up = false;
        break;
      case 'ArrowDown':
        this.down = false;
        break;
      case 'ArrowLeft':
        this.left = false;
        break;
      case 'ArrowRight':
        this.right = false;
        break;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.up = true;
        break;
      case 'ArrowDown':
        this.down = true;
        break;
      case 'ArrowLeft':
        this.left = true;
        break;
      case 'ArrowRight':
        this.right = true;
        break;
    }
  }

  render(screen: Screen) {
    const color = 'white';

    const btnW = 10; // button width
    const btnH = 10; // button height

    // up outline
    screen.drawRectangle(screen.width - btnW * 2, btnH * 0, btnW, btnH, { color });
    // down outline
    screen.drawRectangle(screen.width - btnW * 2, btnH * 1, btnW, btnH, { color });
    // left outline
    screen.drawRectangle(screen.width - btnW * 3, btnH * 1, btnW, btnH, { color });
    // right outline
    screen.drawRectangle(screen.width - btnW * 1, btnH * 1, btnW, btnH, { color });

    // up fill
    if (this.up) {
      screen.drawRectangle(screen.width - btnW * 2, btnH * 0, btnW, btnH, { color, fill: true });
    }

    // down fill
    if (this.down) {
      screen.drawRectangle(screen.width - btnW * 2, btnH * 1, btnW, btnH, { color, fill: true });
    }

    // left fill
    if (this.left) {
      screen.drawRectangle(screen.width - btnW * 3, btnH * 1, btnW, btnH, { color, fill: true });
    }

    // right fill
    if (this.right) {
      screen.drawRectangle(screen.width - btnW * 1, btnH * 1, btnW, btnH, { color, fill: true });
    }
  }
}

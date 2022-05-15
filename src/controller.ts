import { Screen } from './screen';
import { Logger } from './lib';

export class Controller {
  public up: boolean;
  public down: boolean;
  public left: boolean;
  public right: boolean;
  public action: boolean;
  public start: boolean;

  private logger: Logger;

  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.action = false;
    this.start = false;

    this.logger = new Logger();
  }

  onKeyUp(event: KeyboardEvent) {
    this.logger.info(`key up: "${event.key}"`);

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
      case ' ':
        this.action = false;
        break;
      case 'Enter':
        this.start = false;
        break;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    this.logger.info(`key down: "${event.key}"`);

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
      case ' ':
        this.action = true;
        break;
      case 'Enter':
        this.start = true;
        break;
    }
  }

  releaseUp() {
    this.up = false;
  }

  releaseDown() {
    this.down = false;
  }

  releaseLeft() {
    this.left = false;
  }

  releaseRight() {
    this.right = false;
  }

  releaseAction() {
    this.action = false;
  }

  releaseStart() {
    this.start = false;
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
    // action outline
    screen.drawRectangle(screen.width - btnW * 7, btnH * 1, btnW * 3, btnH, { color });

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

    // action fill
    if (this.action) {
      screen.drawRectangle(screen.width - btnW * 7, btnH * 1, btnW * 3, btnH, { color, fill: true });
    }
  }
}

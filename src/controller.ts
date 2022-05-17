import { Screen } from './screen';
import { Logger } from './lib';

export class Controller {
  public upPressed: boolean;
  public downPressed: boolean;
  public leftPressed: boolean;
  public rightPressed: boolean;
  public actionPressed: boolean;
  public startPressed: boolean;

  public upDown: boolean;
  public downDown: boolean;
  public leftDown: boolean;
  public rightDown: boolean;
  public actionDown: boolean;
  public startDown: boolean;

  private logger: Logger;

  constructor() {
    this.upPressed = false;
    this.upDown = false;

    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
    this.actionPressed = false;
    this.startPressed = false;

    this.logger = new Logger();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.repeat) {
      return;
    }

    this.logger.info(`key down: "${event.key}"`);

    switch (event.key) {
      case 'ArrowUp':
        this.upDown = true;
        this.upPressed = true;
        break;
      case 'ArrowDown':
        this.downDown = true;
        this.downPressed = true;
        break;
      case 'ArrowLeft':
        this.leftDown = true;
        this.leftPressed = true;
        break;
      case 'ArrowRight':
        this.rightDown = true;
        this.rightPressed = true;
        break;
      case ' ':
        this.actionDown = true;
        this.actionPressed = true;
        break;
      case 'Enter':
        this.startDown = true;
        this.startPressed = true;
        break;
    }
  }

  onKeyUp(event: KeyboardEvent) {
    this.logger.info(`key up: "${event.key}"`);

    switch (event.key) {
      case 'ArrowUp':
        this.upDown = false;
        this.upPressed = false;
        break;
      case 'ArrowDown':
        this.downDown = false;
        this.downPressed = false;
        break;
      case 'ArrowLeft':
        this.leftDown = false;
        this.leftPressed = false;
        break;
      case 'ArrowRight':
        this.rightDown = false;
        this.rightPressed = false;
        break;
      case ' ':
        this.actionDown = false;
        this.actionPressed = false;
        break;
      case 'Enter':
        this.startDown = false;
        this.startPressed = false;
        break;
    }
  }

  releaseUp() {
    this.upPressed = false;
  }

  releaseDown() {
    this.downPressed = false;
  }

  releaseLeft() {
    this.leftPressed = false;
  }

  releaseRight() {
    this.rightPressed = false;
  }

  releaseAction() {
    this.actionPressed = false;
  }

  releaseStart() {
    this.startPressed = false;
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
    if (this.upDown) {
      screen.drawRectangle(screen.width - btnW * 2, btnH * 0, btnW, btnH, { color, fill: true });
    }

    // down fill
    if (this.downDown) {
      screen.drawRectangle(screen.width - btnW * 2, btnH * 1, btnW, btnH, { color, fill: true });
    }

    // left fill
    if (this.leftDown) {
      screen.drawRectangle(screen.width - btnW * 3, btnH * 1, btnW, btnH, { color, fill: true });
    }

    // right fill
    if (this.rightDown) {
      screen.drawRectangle(screen.width - btnW * 1, btnH * 1, btnW, btnH, { color, fill: true });
    }

    // action fill
    if (this.actionDown) {
      screen.drawRectangle(screen.width - btnW * 7, btnH * 1, btnW * 3, btnH, { color, fill: true });
    }
  }
}

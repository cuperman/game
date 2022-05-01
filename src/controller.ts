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

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = 'white';
    context.strokeStyle = 'white';

    // Up
    if (this.up) {
      context.fillRect(320 - 10 * 2, 0, 10, 10);
    } else {
      context.strokeRect(320 - 10 * 2, 0, 10, 10);
    }

    // Down
    if (this.down) {
      context.fillRect(320 - 10 * 2, 10, 10, 10);
    } else {
      context.strokeRect(320 - 10 * 2, 10, 10, 10);
    }

    // Left
    if (this.left) {
      context.fillRect(320 - 10 * 3, 10, 10, 10);
    } else {
      context.strokeRect(320 - 10 * 3, 10, 10, 10);
    }

    // Right
    if (this.right) {
      context.fillRect(320 - 10 * 1, 10, 10, 10);
    } else {
      context.strokeRect(320 - 10 * 1, 10, 10, 10);
    }
  }
}

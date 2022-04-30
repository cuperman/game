interface Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

class Canvas {
  public element: HTMLCanvasElement;

  constructor(width: number, height: number) {
    this.element = document.createElement('canvas');
    this.element.width = width;
    this.element.height = height;
  }

  get2DContext() {
    return this.element.getContext('2d');
  }
}

async function loadImage(url: string): Promise<ImageBitmap> {
  const image = new Image();
  image.src = url;

  return new Promise((resolve, reject) => {
    image.addEventListener('load', () => {
      resolve(createImageBitmap(image));
    });
    image.addEventListener('error', () => {
      reject();
    });
  });
}

async function applyAlpha(imageBitmap: ImageBitmap, alphaColor: Color): Promise<ImageBitmap> {
  const { width, height } = imageBitmap;

  const tempCanvas = new Canvas(width, height);
  const context = tempCanvas.get2DContext();
  context.drawImage(imageBitmap, 0, 0);

  const imageData = context.getImageData(0, 0, width, height);
  const alteredData = imageData.data.map((datum, index, data) => {
    if ((index + 1) % 4 === 0) {
      const r = data[index - 3];
      const g = data[index - 2];
      const b = data[index - 1];

      if (r === alphaColor.r && g === alphaColor.g && b === alphaColor.b) {
        return 0;
      }
    }
    return datum;
  });

  return createImageBitmap(new ImageData(alteredData, width, height));
}

async function sleep(duration: number) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(null);
    }, duration);
  });
}

class Stage {
  private asset: ImageBitmap;

  constructor(asset: ImageBitmap) {
    this.asset = asset;
  }

  render(context: CanvasRenderingContext2D) {
    context.drawImage(this.asset, 0, 0, 320, 240, 0, 0, 320, 240);
  }
}

class Mario {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;

  private sprites: ImageBitmap;
  private frame: number;

  constructor(sprites: ImageBitmap) {
    this.sprites = sprites;

    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    this.frame = 0;
  }

  render(context: CanvasRenderingContext2D) {
    const width = 16;
    const height = 16;

    if (this.vy > 0 && this.vx === 0) {
      // falling
      context.drawImage(this.sprites, 116, 8, width, height, this.x, this.y, width, height);
    } else if (this.vx < 0) {
      // run left
      if (this.frame === 0) {
        context.drawImage(this.sprites, 20, 8, width, height, this.x, this.y, width, height);
        this.frame = 1;
      } else if (this.frame === 1) {
        context.drawImage(this.sprites, 38, 8, width, height, this.x, this.y, width, height);
        this.frame = 2;
      } else {
        context.drawImage(this.sprites, 56, 8, width, height, this.x, this.y, width, height);
        this.frame = 0;
      }
    } else if (this.vx > 0) {
      // run right
      if (this.frame === 0) {
        context.drawImage(this.sprites, 20, 8, width, height, this.x, this.y, width, height);
        this.frame = 1;
      } else if (this.frame === 1) {
        context.drawImage(this.sprites, 38, 8, width, height, this.x, this.y, width, height);
        this.frame = 2;
      } else {
        context.drawImage(this.sprites, 56, 8, width, height, this.x, this.y, width, height);
        this.frame = 0;
      }
    } else {
      // standing
      context.drawImage(this.sprites, 0, 8, width, height, this.x, this.y, width, height);
    }
  }

  toString() {
    const { x, y, vx, vy } = this;
    JSON.stringify({ x, y, vx, vy });
  }
}

class Controller {
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

class Game {
  public canvas: Canvas;
  public controller: Controller;

  private stage: Stage;
  private mario: Mario;

  constructor(stageAsset: ImageBitmap, marioSprites: ImageBitmap) {
    this.canvas = new Canvas(320, 240);

    this.stage = new Stage(stageAsset);
    this.mario = new Mario(marioSprites);
    this.controller = new Controller();
  }

  processInput() {
    if (this.controller.down) {
    } else if (this.controller.right) {
      this.mario.vx = 5;
    } else if (this.controller.left) {
      this.mario.vx = -5;
    } else {
      this.mario.vx = 0;
    }
  }

  applyPhysics() {
    const groundLevel = 192;

    // apply gravity
    if (this.mario.y < groundLevel) {
      this.mario.vy = this.mario.vy + 8;
    } else {
      this.mario.vy = 0;
    }

    // move objects
    if (this.mario.vx !== 0) {
      this.mario.x = this.mario.x + this.mario.vx;
    }
    if (this.mario.vy !== 0) {
      this.mario.y = this.mario.y + this.mario.vy;
    }

    // apply collisions
    if (this.mario.y > groundLevel) {
      this.mario.y = groundLevel;
    }
  }

  render() {
    const context = this.canvas.get2DContext();

    this.stage.render(context);
    this.mario.render(context);
    this.controller.render(context);
  }

  async start() {
    const targetFrameRate = 30;
    const maxDelay = 1000 / targetFrameRate;

    // start game loop
    while (true) {
      const start = new Date().getTime();

      this.processInput();
      this.applyPhysics();
      this.render();

      const end = new Date().getTime();
      const delay = maxDelay - (end - start);
      if (delay > 0) {
        await sleep(delay);
      }
    }
  }
}

async function main() {
  const marioSpriteAlpha = { r: 146, g: 144, b: 255 };

  const stageAsset = await loadImage('./img/stage1.png');
  const marioSprites = await loadImage('./img/mario.png').then((image) => applyAlpha(image, marioSpriteAlpha));

  const game = new Game(stageAsset, marioSprites);

  document.body.appendChild(game.canvas.element);
  document.body.addEventListener('keyup', (event) => game.controller.onKeyUp(event));
  document.body.addEventListener('keydown', (event) => game.controller.onKeyDown(event));

  game.start();
}

main();

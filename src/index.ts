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

  constructor(sprites: ImageBitmap) {
    this.sprites = sprites;

    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }

  render(context: CanvasRenderingContext2D) {
    const spriteX = 0;
    const spriteY = 8;

    const width = 16;
    const height = 16;

    context.drawImage(this.sprites, spriteX, spriteY, width, height, this.x, this.y, width, height);
  }
}

class Game {
  public canvas: Canvas;
  private stage: Stage;
  private mario: Mario;

  constructor(stageAsset: ImageBitmap, marioSprites: ImageBitmap) {
    this.canvas = new Canvas(320, 240);

    this.stage = new Stage(stageAsset);
    this.mario = new Mario(marioSprites);
  }

  applyPhysics() {
    const groundLevel = 192;

    // apply acceleration
    if (this.mario.y < groundLevel) {
      this.mario.vy = this.mario.vy + 8;
    }

    // move objects
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
  }

  async start() {
    const targetFrameRate = 30;
    const maxDelay = 1000 / targetFrameRate;

    // start game loop
    while (true) {
      const start = new Date().getTime();

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

  game.start();
}

main();

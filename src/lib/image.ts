export interface Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export class Canvas {
  public element: HTMLCanvasElement;

  constructor(width: number, height: number) {
    this.element = document.createElement('canvas');
    this.element.width = width;
    this.element.height = height;
  }

  get2DContext(): CanvasRenderingContext2D {
    return this.element.getContext('2d');
  }
}

export async function loadImage(url: string): Promise<ImageBitmap> {
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

export async function applyAlpha(imageBitmap: ImageBitmap, alphaColor: Color): Promise<ImageBitmap> {
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

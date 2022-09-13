import { loadImage, getImageData, gaussianBlur } from './lib/util.js';
import imgUrl from '../../assets/girl2.jpg';
export default function filter(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.save();
  grayscale();

  /**
   * 灰度
   */
  async function grayscale() {
    const img = await loadImage(imgUrl);
    const imageData = getImageData(img);
    const { width, height, data } = imageData;
    for (let i = 0; i < width * height * 4; i += 4) {
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2],
        a = data[i + 3];

      const v = 0.212 * r + 0.714 * g + 0.074 * b;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = a;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  /**
   * 灰度
   */
  async function grayscale1() {
    const img = await loadImage(imgUrl);
    const imageData = getImageData(img);
    const { width, height, data } = imageData;
    for (let i = 0; i < width * height * 4; i += 4) {
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2],
        a = data[i + 3];

      const v = 0.212 * r + 0.714 * g + 0.074 * b;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = a;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  ctx.restore();
}

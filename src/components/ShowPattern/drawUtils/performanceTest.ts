const COUNT = 1000;
const shapeTypes = [3, 4, 5, 6, 30, 100];
export default function performanceTest(
  ctx: CanvasRenderingContext2D,
  canvasDom: HTMLCanvasElement,
  callback: ({ newRafId: number }) => void
) {
  let time = 0;
  ctx.restore();
  ctx.save();
  requestAnimationFrame(() =>
    draw(ctx, canvasDom, ({ upDateTime, newRafId }) => {
      callback({ newRafId });
      if (time) {
        const fps = (1 / ((upDateTime - time) / 1000)).toFixed(0);
        time = upDateTime;
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(0, 0, 90, 40);
        ctx.fillStyle = '#f40';
        ctx.font = 'normal 16pt Arial';
        ctx.fillText(`${fps}FPS`, 10, 26);
        ctx.restore();
      } else {
        time = upDateTime;
      }
    })
  );
  ctx.restore();
}

function draw(
  ctx: CanvasRenderingContext2D,
  canvasDom: HTMLCanvasElement,
  callback
) {
  const width = canvasDom.width;
  const height = canvasDom.height;
  ctx.clearRect(0, 0, width, height);
  const shapes = createCache();
  for (let i = 0; i < COUNT; i++) {
    const shape = shapes[Math.floor(Math.random() * shapeTypes.length)];
    const x = Math.random() * width;
    const y = Math.random() * height;
    ctx.drawImage(shape, x, y);
  }
  const newRafId = requestAnimationFrame(() => draw(ctx, canvasDom, callback));
  callback({ newRafId: newRafId, upDateTime: performance.now() });
}

/**
 * 将所有的边数shapeTypes的样子缓存到数组中
 */
function createCache() {
  const ret: any = [];

  for (let i = 0; i < shapeTypes.length; i++) {
    const type = shapeTypes[i];
    const _window: any = window;
    // 创建离屏Canvas缓存图形
    const cacheCanvas = new _window.OffscreenCanvas(20, 20);
    // 将图形绘制到离屏Canvas对象上
    const context: any = cacheCanvas.getContext('2d');
    if (type >= 60) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      context.save();
      context.beginPath();
      context.fillStyle = `rgb(${r},${g},${b})`;
      context.arc(10, 10, 10, 0, Math.PI * 2);
      context.stroke();
      context.fill();
      context.restore();
    } else {
      const points = getPoints(10, 10, 10, type);
      drawPolygon(context, points);
    }
    ret.push(cacheCanvas);
  }

  // 将离屏Canvas数组（缓存对象）返回
  return ret;
}

/**
 * 获取多边形的顶点坐标
 */
function getPoints(
  x: number,
  y: number,
  r: number,
  edge: number = 3
): number[][] {
  let points: number[][] = [];
  let rotate = (Math.PI * 2) / edge;
  for (let i = 0; i < edge; i++) {
    const edgeRotate = rotate * i;
    const pointX: number = x + r * Math.cos(edgeRotate);
    const pointY: number = y + r * Math.sin(edgeRotate);
    points.push([pointX, pointY]);
  }
  return points;
}

/**
 * 绘制多边形
 */
function drawPolygon(ctx: CanvasRenderingContext2D, points: number[][]) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i][0], points[i][1]);
  }
  ctx.closePath();
  ctx.fillStyle = `rgb(${r},${g},${b})`;
  ctx.fill();
  ctx.restore();
}

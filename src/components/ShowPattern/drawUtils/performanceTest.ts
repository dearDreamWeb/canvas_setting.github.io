import { lineBox, pointBox } from '../../draw/drawRect';
const shapeTypes = [3, 4, 5, 6, 30, 100]; // 多边形边数
const FPSTIME = 30; // 每多少帧刷新一下FPS
const _window: any = window;
const optionObj = {
  showFilter: false, // 是否开启模糊
  countArr: [100, 1000, 5000, 10000, 50000, 100000], // 图形数量的选项
};
// 选项的x点
const TEXTX = 10;
// 每行选项的高度
const TEXTHEIGHT = 25;
// 选项框的宽高
const itemW = TEXTHEIGHT / 1.3;
// 图形数量选项框的四个顶点的坐标
let optionPoints: IOptionPoints[] = [];
// 开启模糊的选项框四个顶点的坐标
let filterPoints: IOptionPoints;
// 选中的图形数量的选项坐标
let clickIndex: number = 0;
// 多边形数量
let count = optionObj.countArr[clickIndex];

interface IOptionPoints {
  tl: {
    x: number;
    y: number;
  };
  tr: {
    x: number;
    y: number;
  };
  bl: {
    x: number;
    y: number;
  };
  br: {
    x: number;
    y: number;
  };
}

export default function performanceTest(
  ctx: CanvasRenderingContext2D,
  canvasDom: HTMLCanvasElement,
  callback: ({ newRafId: number }) => void
) {
  let time = 0;
  let i = 0;
  let oldFps = 0;
  ctx.restore();
  optionObj.countArr.forEach((item, index) => {
    optionPoints.push({
      tl: { x: TEXTX, y: TEXTHEIGHT * (index + 1.3) },
      tr: { x: TEXTX + itemW, y: TEXTHEIGHT * (index + 1.3) },
      bl: { x: TEXTX, y: TEXTHEIGHT * (index + 1.3) + itemW },
      br: { x: TEXTX + itemW, y: TEXTHEIGHT * (index + 1.3) + itemW },
    });
  });

  filterPoints = {
    tl: { x: TEXTX, y: TEXTHEIGHT * (optionObj.countArr.length + 1.3) },
    tr: { x: TEXTX + itemW, y: TEXTHEIGHT * (optionObj.countArr.length + 1.3) },
    bl: { x: TEXTX, y: TEXTHEIGHT * (optionObj.countArr.length + 1.3) + itemW },
    br: {
      x: TEXTX + itemW,
      y: TEXTHEIGHT * (optionObj.countArr.length + 1.3) + itemW,
    },
  };

  // 判断是否选中
  canvasDom.onclick = (e) => {
    let eventX = e.offsetX;
    let eventY = e.offsetY;
    optionPoints.forEach((item, index) => {
      const lines = lineBox(item);
      if (pointBox({ x: eventX, y: eventY }, lines)) {
        clickIndex = index;
        count = optionObj.countArr[clickIndex];
      }
    });
    // 判断是否点击中模糊
    const filterLines = lineBox(filterPoints);
    if (pointBox({ x: eventX, y: eventY }, filterLines)) {
      optionObj.showFilter = !optionObj.showFilter;
    }
  };

  ctx.save();
  requestAnimationFrame(() =>
    draw(ctx, canvasDom, ({ upDateTime, newRafId }) => {
      callback({ newRafId });
      if (time) {
        const fps = Number((1 / ((upDateTime - time) / 1000)).toFixed(0));
        time = upDateTime;
        ctx.save();
        ctx.filter = 'blur(0)';
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(0, 0, 130, TEXTHEIGHT * (optionObj.countArr.length + 2.5));
        ctx.fillStyle = '#f40';
        ctx.font = 'normal 16pt Arial';
        if (i % FPSTIME === 0) {
          ctx.fillText(`${fps}FPS`, TEXTX, TEXTHEIGHT);
          oldFps = fps;
        } else {
          ctx.fillText(`${oldFps}FPS`, TEXTX, TEXTHEIGHT);
        }
        optionTab(ctx, clickIndex);
        ctx.restore();
      } else {
        time = upDateTime;
      }
      i++;
    })
  );
  ctx.restore();
}

/**
 * 选项
 */
function optionTab(ctx: CanvasRenderingContext2D, clickIndex: number) {
  ctx.save();
  optionObj.countArr.forEach((item, index) => {
    ctx.lineWidth = 0.1;
    if (clickIndex === index) {
      ctx.fillStyle = '#f40';
      ctx.fillRect(TEXTX, TEXTHEIGHT * (index + 1.3), itemW, itemW);
    } else {
      ctx.fillStyle = '#000';
      ctx.strokeRect(TEXTX, TEXTHEIGHT * (index + 1.3), itemW, itemW);
    }
    ctx.fillText(item.toString(), TEXTX + TEXTHEIGHT, TEXTHEIGHT * (index + 2));
  });
  if (optionObj.showFilter) {
    ctx.fillStyle = '#f40';
    ctx.fillRect(
      TEXTX,
      TEXTHEIGHT * (optionObj.countArr.length + 1.3),
      itemW,
      itemW
    );
  } else {
    ctx.strokeRect(
      TEXTX,
      TEXTHEIGHT * (optionObj.countArr.length + 1.3),
      itemW,
      itemW
    );
  }

  ctx.fillText(
    `${!optionObj.showFilter ? '开启模糊' : '关闭模糊'}`,
    TEXTX + TEXTHEIGHT,
    TEXTHEIGHT * (optionObj.countArr.length + 2)
  );
  ctx.restore();
}

/**
 * 绘制图形
 */
function draw(
  ctx: CanvasRenderingContext2D,
  canvasDom: HTMLCanvasElement,
  callback
) {
  const width = canvasDom.width;
  const height = canvasDom.height;
  ctx.save();
  if (optionObj.showFilter) {
    ctx.filter = 'blur(5px)';
  }
  // 创建离屏的 Canvasconst
  const ofc = new _window.OffscreenCanvas(canvasDom.width, canvasDom.height);
  const octX = ofc.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  const shapes = createCache();
  for (let i = 0; i < count; i++) {
    const shape = shapes[Math.floor(Math.random() * shapeTypes.length)];
    const x = Math.random() * width;
    const y = Math.random() * height;
    octX.drawImage(shape, x, y);
  }
  // 再将离屏Canvas图像绘制到画布上，这一次绘制采用了滤镜
  ctx.drawImage(ofc, 0, 0);
  ctx.restore();
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

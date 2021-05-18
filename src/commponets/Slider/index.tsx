import React, { useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";

interface IProps {}
interface ICanvasOpt {
  canvasDom: HTMLElement | null;
  ctx: any;
  canvasW: number;
  canvasH: number;
}

const initCanvasOpt: ICanvasOpt = {
  canvasDom: null,
  ctx: null,
  canvasW: 0,
  canvasH: 0,
};

function Slider(): JSX.Element {
  const canvasRef = useRef<any>(null);
  const [canvasOpt, setCanvasOpt] = useState<ICanvasOpt>(initCanvasOpt);
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    initCanvas();
  }, []);

  useEffect(() => {
    const { ctx, canvasW, canvasH, canvasDom } = canvasOpt;
    if (!canvasDom) {
      return;
    }
    canvasDom.removeEventListener("click", changeArc);
    canvasDom.addEventListener("click", changeArc);
    ctx.clearRect(0, 0, canvasW, canvasH);
    drawLine(ctx, canvasW);
    drawArc(ctx);
  }, [canvasOpt]);

  //   初始化canvas的配置数据
  const initCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const _canvasDom = canvasRef.current;
    setCanvasOpt({
      ...canvasOpt,
      canvasDom: _canvasDom,
      ctx: _canvasDom.getContext("2d"),
      canvasW: _canvasDom.width,
      canvasH: _canvasDom.height,
    });
  };

  //  绘制中间的线
  const drawLine = (ctx, canvasW) => {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 4, canvasW, 2);
    ctx.stroke();
  };

  //绘制圆点
  const drawArc = (ctx, x = 5) => {
    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.arc(x, 5, 5, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  };

  // 点击改变圆点的位置
  const changeArc = e => {
    const { ctx, canvasW, canvasH, canvasDom } = canvasOpt;
    const { x } = canvasDom!.getBoundingClientRect();
    let positionX = e.pageX - x;

    setRate(parseInt(((positionX / canvasW) * 100).toFixed(2)));
    // 鼠标点击大于圆的半径
    if (positionX >= canvasW - 5) {
      positionX = canvasW - 5;
      setRate(100);
    }
    // 鼠标点击小于圆的半径
    if (positionX <= 5) {
      positionX = 5;
      setRate(0);
    }

    ctx.clearRect(0, 0, canvasW, canvasH);
    drawLine(ctx, canvasW);
    drawArc(ctx, positionX);
    // 绘制进度条
    ctx.lineCap = "round";
    ctx.fillRect(0, 3, positionX, 4);
  };

  return (
    <div className="sliderCanvas_wrap" title={rate.toString()}>
      <canvas
        ref={canvasRef}
        id="sliderCanvas"
        width="100px"
        height="10px"
      ></canvas>
    </div>
  );
}

export default Slider;

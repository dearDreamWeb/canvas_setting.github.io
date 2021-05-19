import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";

interface IProps {
  text?: string; // 文本
  onChange?: (rate: number) => void; // 数值改变
}
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

function Slider(props: IProps): JSX.Element {
  const { onChange, text } = props;
  const canvasRef = useRef<any>(null);
  const [canvasOpt, setCanvasOpt] = useState<ICanvasOpt>(initCanvasOpt);
  const [rate, setRate] = useState<number>(0);

  useEffect(() => {
    initCanvas();
  }, []);

  // 当canvas的dom获取时渲染
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

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    onChange && onChange(rate);
  }, [rate]);

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
    let xMax = canvasW - 5; // 能移动的最大距离
    let xMin = 5; // 能移动的最小距离(半径)
    setRate(parseInt((((positionX - xMin) / (xMax - xMin)) * 100).toFixed(2)));
    // 鼠标点击大于圆的半径
    if (positionX >= xMax) {
      positionX = xMax;
      setRate(100);
    }
    // 鼠标点击小于圆的半径
    if (positionX <= xMin) {
      positionX = xMin;
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
    <div className={styles.sliderCanvas_wrap} title={rate.toString()}>
      {text ? text : ""}
      <canvas
        ref={canvasRef}
        id="sliderCanvas"
        width="100px"
        height="10px"
      ></canvas>
      <span className={styles.rate_text}>{rate}</span>
    </div>
  );
}

export default Slider;

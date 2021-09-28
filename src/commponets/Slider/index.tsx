/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useRef, useState } from "react";
import styles from "./index.module.scss";
import { ContextData } from "../../globalState";

interface IProps {
  text?: string; // 文本
  onChange?: (val: number) => void; // 数值改变
  value?: number; // 数值
  min?: number;
  max?: number;
  type?: string;
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
  const { onChange, text, value, type } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasOpt, setCanvasOpt] = useState<ICanvasOpt>(initCanvasOpt);
  const [isRender, setIsRender] = useState<boolean>(false);
  const [isMove, setIsMove] = useState<boolean>(false);

  const { state } = useContext(ContextData);

  useEffect(() => {
    initCanvas();
  }, []);

  useEffect(() => {
    if (value && canvasOpt.canvasDom) {
      setIsRender(true);
    }
  }, [canvasOpt, value]);

  useEffect(() => {
    if (value && isRender) {
      changeArc({ value });
    }
  }, [isRender]);

  useEffect(() => {
    if (state.drawType === "reset") {
      const { ctx, canvasW, canvasH } = canvasOpt;
      ctx.clearRect(0, 0, canvasW, canvasH);
      changeArc({ value });
      console.log(value);
    }
  }, [state.drawType]);

  // 当canvas的dom获取时渲染
  useEffect(() => {
    const { canvasDom } = canvasOpt;
    if (!canvasDom) {
      return;
    }
    changeArc({ value });
    canvasDom.onclick = e => changeArc({ e });
    canvasDom.onmousemove = null;
    canvasDom.onmousedown = e => {
      setIsMove(true);
      changeArc({ e });
    };
    canvasDom.onmousemove = e => {
      if (isMove) {
        changeArc({ e });
      }
    };
    document.onmouseup = () => {
      setIsMove(false);
      canvasDom.onmousemove = null;
    };
  }, [canvasOpt, isMove]);

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
  const changeArc = ({ e, value }: { e?: MouseEvent; value?: number }) => {
    const { ctx, canvasW, canvasH, canvasDom } = canvasOpt;
    const { x } = canvasDom!.getBoundingClientRect();
    let positionX = e ? e!.pageX - x : value!;
    let xMax = canvasW - 5; // 能移动的最大距离
    let xMin = 5; // 能移动的最小距离(半径)
    // 鼠标点击大于圆的半径
    if (positionX >= xMax) {
      positionX = xMax;
      onChange && onChange(100);
    } else if (positionX <= xMin) {
      // 鼠标点击小于圆的半径
      positionX = xMin;
      onChange && onChange(0);
    } else {
      let num = parseInt(
        (((positionX - xMin) / (xMax - xMin)) * 100).toFixed(2)
      );
      onChange && onChange(value || num);
    }
    ctx.clearRect(0, 0, canvasW, canvasH);
    drawLine(ctx, canvasW);
    drawArc(ctx, positionX);
    // 绘制进度条
    ctx.lineCap = "round";
    ctx.fillRect(0, 3, positionX, 4);
  };

  return (
    <div className={styles.sliderCanvas_wrap}>
      {text || ""}
      <canvas
        ref={canvasRef}
        className={styles.sliderCanvas}
        width="100"
        height="10"
      ></canvas>
      <span className={styles.rate_text}>
        {type === "rotate" ? ((value || 0) * 3.6).toFixed(0) : value}
      </span>
    </div>
  );
}

export default Slider;

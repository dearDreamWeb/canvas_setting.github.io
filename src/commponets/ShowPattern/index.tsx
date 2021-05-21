import React, { useRef, useEffect, useContext } from "react";
import styles from "./index.module.scss";
import { ContextData } from "../../globalState";

function ShowPattern(): JSX.Element {
  const canvasWrapRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const { state, dispatch } = useContext(ContextData);

  //   初始化将canvas的宽高和父元素的一样
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const { width, height } = canvasWrapRef.current.getBoundingClientRect();
    canvasRef.current.width = width;
    canvasRef.current.height = height;
  }, []);

  //   canvas配置改变时绘图
  useEffect(() => {
    if (!state.drawType) {
      return;
    }
    const canvasDom = canvasRef.current;
    const ctx = canvasDom.getContext("2d");
    const {
      drawType,
      fillColor,
      strokeColor,
      lineW,
      lineType,
      shadowBlur,
      shadowOffsetX,
      shadowOffsetY,
      shadowColor,
    } = state;
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

    // console.log(drawType, fillColor, strokeColor, lineW, lineType);

    switch (drawType) {
      case "reset":
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        dispatch({ type: "resetState" });
        break;
      case "0":
        drawRect(
          ctx,
          fillColor,
          strokeColor,
          lineW,
          lineType,
          shadowBlur,
          shadowOffsetX,
          shadowOffsetY,
          shadowColor
        );
        break;
      case "1":
        drawTriangle(
          ctx,
          fillColor,
          strokeColor,
          lineW,
          lineType,
          shadowBlur,
          shadowOffsetX,
          shadowOffsetY,
          shadowColor
        );
        break;
      case "2":
        drawLine(
          ctx,
          fillColor,
          strokeColor,
          lineW,
          lineType,
          shadowBlur,
          shadowOffsetX,
          shadowOffsetY,
          shadowColor
        );
        break;
      case "3":
        drawArc(
          ctx,
          fillColor,
          strokeColor,
          lineW,
          lineType,
          shadowBlur,
          shadowOffsetX,
          shadowOffsetY,
          shadowColor
        );
        break;
      case "4":
        drawText(
          ctx,
          fillColor,
          strokeColor,
          lineW,
          lineType,
          shadowBlur,
          shadowOffsetX,
          shadowOffsetY,
          shadowColor
        );
        break;
      case "5":
        drawDuola(ctx);
        break;
    }
  }, [state]);

  /**
   * 绘制矩形
   * @param ctx
   * @param fillColor
   * @param strokeColor
   * @param lineW
   * @param lineType
   * @param shadowBlur
   * @param shadowOffsetX
   * @param shadowOffsetY
   * @param shadowColor
   */
  const drawRect = (
    ctx,
    fillColor,
    strokeColor,
    lineW,
    lineType,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    shadowColor
  ) => {
    // 绘制阴影
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    // lineWidth明明是设置线宽，最小只能到1
    ctx.lineWidth = lineW === 0 ? 1 : lineW;

    // 实线和虚线切换
    if (lineType === "dash") {
      ctx.setLineDash([3]); // [实线长度, 间隙长度]
      ctx.lineDashOffset = 0;
    } else {
      ctx.setLineDash([]);
    }

    ctx.fillRect(100, 100, 100, 100);
    ctx.strokeRect(100, 100, 100, 100);
  };

  /**
   * 绘制三角形
   * @param ctx
   * @param fillColor
   * @param strokeColor
   * @param lineW
   * @param lineType
   * @param shadowBlur
   * @param shadowOffsetX
   * @param shadowOffsetY
   * @param shadowColor
   */
  const drawTriangle = (
    ctx,
    fillColor,
    strokeColor,
    lineW,
    lineType,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    shadowColor
  ) => {
    ctx.beginPath();

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    // lineWidth明明是设置线宽，最小只能到1
    ctx.lineWidth = lineW === 0 ? 1 : lineW;

    // 实线和虚线切换
    if (lineType === "dash") {
      ctx.setLineDash([3]); // [实线长度, 间隙长度]
      ctx.lineDashOffset = 0;
    } else {
      ctx.setLineDash([]);
    }

    // 绘制阴影
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 200);
    ctx.lineTo(200, 200);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  /**
   * 绘制直线
   * @param ctx
   * @param fillColor
   * @param strokeColor
   * @param lineW
   * @param lineType
   * @param shadowBlur
   * @param shadowOffsetX
   * @param shadowOffsetY
   * @param shadowColor
   */
  const drawLine = (
    ctx,
    fillColor,
    strokeColor,
    lineW,
    lineType,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    shadowColor
  ) => {
    ctx.beginPath();

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    // lineWidth明明是设置线宽，最小只能到1
    ctx.lineWidth = lineW === 0 ? 1 : lineW;

    // 实线和虚线切换
    if (lineType === "dash") {
      ctx.setLineDash([3]); // [实线长度, 间隙长度]
      ctx.lineDashOffset = 0;
    } else {
      ctx.setLineDash([]);
    }

    // 绘制阴影
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.moveTo(100, 100);
    ctx.lineTo(200, 100);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  /**
   * 绘制圆形
   * @param ctx
   * @param fillColor
   * @param strokeColor
   * @param lineW
   * @param lineType
   * @param shadowBlur
   * @param shadowOffsetX
   * @param shadowOffsetY
   * @param shadowColor
   */
  const drawArc = (
    ctx,
    fillColor,
    strokeColor,
    lineW,
    lineType,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    shadowColor
  ) => {
    ctx.beginPath();

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    // lineWidth明明是设置线宽，最小只能到1
    ctx.lineWidth = lineW === 0 ? 1 : lineW;

    // 实线和虚线切换
    if (lineType === "dash") {
      ctx.setLineDash([3]); // [实线长度, 间隙长度]
      ctx.lineDashOffset = 0;
    } else {
      ctx.setLineDash([]);
    }

    // 绘制阴影
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.arc(100, 100, 50, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  /**
   * 绘制文本
   * @param ctx
   * @param fillColor
   * @param strokeColor
   * @param lineW
   * @param lineType
   * @param shadowBlur
   * @param shadowOffsetX
   * @param shadowOffsetY
   * @param shadowColor
   */
  const drawText = (
    ctx,
    fillColor,
    strokeColor,
    lineW,
    lineType,
    shadowBlur,
    shadowOffsetX,
    shadowOffsetY,
    shadowColor
  ) => {
    ctx.beginPath();

    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    // lineWidth明明是设置线宽，最小只能到1
    ctx.lineWidth = lineW === 0 ? 1 : lineW;

    // 实线和虚线切换
    if (lineType === "dash") {
      ctx.setLineDash([3]); // [实线长度, 间隙长度]
      ctx.lineDashOffset = 0;
    } else {
      ctx.setLineDash([]);
    }

    // 绘制阴影
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;

    // 绘制文本
    ctx.font = "30px sans-serif";
    ctx.fillText("Canvas实验室", 100, 100);

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  /**
   * 绘制哆啦A梦
   * @param ctx
   * @param fillColor
   * @param strokeColor
   * @param lineW
   * @param lineType
   * @param shadowBlur
   * @param shadowOffsetX
   * @param shadowOffsetY
   * @param shadowColor
   */
  const drawDuola = async ctx => {
    // 绘制阴影
    ctx.shadowColor = "rgba(0,0,0,0)";

    ctx.lineWidth = 3;
    // 蓝脸
    ctx.beginPath();
    ctx.arc(400, 160, 150, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fillStyle = "#00a0de";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 白脸
    ctx.beginPath();
    ctx.arc(400, 184, 110, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 左眼
    ctx.beginPath();
    ctx.ellipse(372, 80, 40, 30, Math.PI * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 右眼
    ctx.beginPath();
    ctx.ellipse(432, 80, 40, 30, Math.PI * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 左眼球
    ctx.beginPath();
    ctx.arc(380, 90, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(385, 95, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 右眼球
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(428, 100, 14, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.lineWidth = 3;

    // 鼻子
    ctx.beginPath();
    ctx.arc(402, 128, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#e70010";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 脸中线
    ctx.beginPath();
    ctx.moveTo(402, 150);
    ctx.lineTo(402, 220);
    ctx.closePath();
    ctx.stroke();

    // 嘴
    ctx.beginPath();
    ctx.arc(402, 135, 100, Math.PI * 0.2, Math.PI * 0.8);
    ctx.stroke();

    // 左侧胡须
    ctx.beginPath();
    ctx.moveTo(310, 145);
    ctx.lineTo(370, 155);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(310, 165);
    ctx.lineTo(370, 165);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(310, 185);
    ctx.lineTo(370, 175);
    ctx.stroke();

    // 右侧侧胡须
    ctx.beginPath();
    ctx.moveTo(434, 155);
    ctx.lineTo(494, 145);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(434, 165);
    ctx.lineTo(494, 165);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(434, 175);
    ctx.lineTo(494, 185);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#e70010";
    ctx.moveTo(270, 249);
    ctx.lineTo(530, 249);
    ctx.lineTo(530, 265);
    ctx.lineTo(270, 265);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
  };

  return (
    <div ref={canvasWrapRef} className={styles.showPattern_wrap}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default ShowPattern;

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

  return (
    <div ref={canvasWrapRef} className={styles.showPattern_wrap}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default ShowPattern;

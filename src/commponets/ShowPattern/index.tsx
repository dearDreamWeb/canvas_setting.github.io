import React, { useRef, useEffect, useContext } from "react";
import styles from "./index.module.scss";
import { ContextData } from "../../globalState";

function ShowPattern(): JSX.Element {
  const canvasWrapRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  // 眼睛的位置
  const eyePosition = { eyeBallX: 480, eyeBallY: 230 };

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
    canvasDom.addEventListener("mouseleave", () => {
      canvasDom.removeEventListener("mousemove", eyeBallMove);
    });
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
        canvasDom.removeEventListener("mousemove", eyeBallMove);
        canvasDom.addEventListener("mousemove", eyeBallMove);
        drawDuola(ctx, eyePosition.eyeBallX, eyePosition.eyeBallY);
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

  let timer;
  const eyeBallMove = e => {
    console.log(1);
    const newEyePosition = { ...eyePosition };
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      const { x, y } = canvasRef.current.getBoundingClientRect();
      const moveX = e.clientX - x;
      const moveY = e.clientY - y;
      const minX = 472 - 30 + 14 + 5; // x轴最小值
      const maxX = 472 + 30 - 14 - 5; // x轴最大值
      const minY = 220 - 40 + 14 + 5; // y轴最小值
      const maxY = 220 + 40 - 14 - 5; // y轴最大值
      // 勾股定理求距离
      const distance = Math.sqrt(
        Math.pow(moveX - newEyePosition.eyeBallX, 2) +
          Math.pow(moveY - newEyePosition.eyeBallY, 2)
      );
      // 定时器的速度
      const timeSpeed = 30;
      // 眼球移动的速度
      const eyeBallSpeed = 5;
      // 边界计算
      let count = 0;
      // 总时间
      let distanceTime = distance / eyeBallSpeed;
      // x轴的速度
      let eyeBallSpeedX = (moveX - newEyePosition.eyeBallX) / distanceTime;
      // y轴的速度
      let eyeBallSpeedY = (moveY - newEyePosition.eyeBallY) / distanceTime;

      let _timer;
      clearInterval(_timer);
      _timer = setInterval(() => {
        const { eyeBallX, eyeBallY } = newEyePosition;
        // 如果边界计算超过2说明x轴和y轴都已到达边界
        if (count >= 2) {
          clearInterval(_timer);
        }

        let ctx = canvasRef.current.getContext("2d");

        newEyePosition.eyeBallX += eyeBallSpeedX;
        newEyePosition.eyeBallY += eyeBallSpeedY;

        if (eyeBallX >= maxX) {
          newEyePosition.eyeBallX = maxX;
          count++;
        } else if (eyeBallX <= minX) {
          newEyePosition.eyeBallX = minX;
          count++;
        }

        if (eyeBallY >= maxY) {
          newEyePosition.eyeBallY = maxY;
          count++;
        } else if (eyeBallY <= minY) {
          newEyePosition.eyeBallY = minY;
          count++;
        }
        drawDuola(ctx, newEyePosition.eyeBallX, newEyePosition.eyeBallY);
      }, timeSpeed);
    }, 100);
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
  const drawDuola = (ctx, eyeBallX, eyeBallY) => {
    ctx.clearRect(0, 0, canvasRef.current.wdith, canvasRef.current.height);
    // 绘制阴影
    ctx.shadowColor = "rgba(0,0,0,0)";

    ctx.lineWidth = 3;
    // 蓝脸
    ctx.beginPath();
    ctx.arc(500, 300, 150, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fillStyle = "#00a0de";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 白脸
    ctx.beginPath();
    ctx.arc(500, 324, 110, Math.PI * 0.8, Math.PI * 2.2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 左眼
    ctx.beginPath();
    ctx.ellipse(472, 220, 40, 30, Math.PI * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 右眼
    ctx.beginPath();
    ctx.ellipse(532, 220, 40, 30, Math.PI * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 左眼球
    ctx.beginPath();
    ctx.arc(eyeBallX, eyeBallY, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(eyeBallX + 5, eyeBallY + 5, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 右眼球
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.arc(528, 240, 14, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.lineWidth = 3;

    // 鼻子
    ctx.beginPath();
    ctx.arc(502, 265, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#e70010";
    ctx.fill();
    ctx.closePath();
    ctx.stroke();

    // 脸中线
    ctx.beginPath();
    ctx.moveTo(502, 287);
    ctx.lineTo(502, 366);
    ctx.closePath();
    ctx.stroke();

    // 嘴
    ctx.beginPath();
    ctx.arc(502, 280, 100, Math.PI * 0.2, Math.PI * 0.8);
    ctx.stroke();

    // 左侧胡须
    ctx.beginPath();
    ctx.moveTo(420, 285);
    ctx.lineTo(480, 295);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(420, 305);
    ctx.lineTo(480, 305);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(420, 325);
    ctx.lineTo(480, 315);
    ctx.stroke();

    // 右侧侧胡须
    ctx.beginPath();
    ctx.moveTo(524, 295);
    ctx.lineTo(584, 285);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(524, 305);
    ctx.lineTo(584, 305);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(524, 315);
    ctx.lineTo(584, 325);
    ctx.stroke();

    // 脖子
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#e70010";
    ctx.moveTo(370, 389);
    ctx.lineTo(630, 389);
    ctx.lineTo(630, 405);
    ctx.lineTo(370, 405);
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

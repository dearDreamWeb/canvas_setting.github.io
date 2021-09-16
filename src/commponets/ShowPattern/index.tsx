import React, { useRef, useEffect, useContext, useState } from "react";
import styles from "./index.module.scss";
import { ContextData } from "../../globalState";

function ShowPattern(): JSX.Element {
  const canvasWrapRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const webglRef = useRef<any>(null);
  const [showCanvas, setShowCanvas] = useState(true);

  let pointsArr: number[] = [];

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
    webglRef.current.width = width;
    webglRef.current.height = height;
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
      scale, // 缩放
      rotate, // 旋转
      opacity, // 不透明度
    } = state;
    const realScale = scale * 0.02;
    const realRotate = rotate * 3.6;
    const realOpacity = opacity * 0.01;
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
    canvasDom.addEventListener("mouseleave", () => {
      canvasDom.removeEventListener("mousemove", eyeBallMove);
    });
    webglRef.current.onclick = null;
    setShowCanvas(true);

    ctx.save();
    ctx.globalAlpha = realOpacity;
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
    ctx.translate(canvasDom.width / 2, canvasDom.height / 2);
    ctx.scale(realScale, realScale);
    ctx.rotate((Math.PI / 180) * realRotate);

    switch (drawType) {
      case "reset":
        ctx.rotate((Math.PI / 180) * -realRotate);
        ctx.translate(-canvasDom.width / 2, -canvasDom.height / 2);
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        dispatch({ type: "resetState" });
        break;
      case "0":
        drawRect(ctx);
        break;
      case "1":
        drawTriangle(ctx);
        break;
      case "2":
        drawLine(ctx);
        break;
      case "3":
        drawArc(ctx);
        break;
      case "4":
        drawText(ctx);
        break;
      case "5":
        canvasDom.removeEventListener("mousemove", eyeBallMove);
        canvasDom.addEventListener("mousemove", eyeBallMove);
        drawDuola(ctx, eyePosition.eyeBallX, eyePosition.eyeBallY);
        break;
      case "8":
        drawQuadratic(ctx);
        break;
      default:
        pointsArr = [];
        setShowCanvas(false);
        break;
    }
    ctx.restore();
  }, [state]);

  useEffect(() => {
    const { drawType } = state;
    if (!showCanvas) {
      const webgl = webglRef.current;
      const gl = webgl.getContext("webgl");
      gl.clear(gl.COLOR_BUFFER_BIT);
      switch (drawType) {
        case "6":
          gl.clear(gl.COLOR_BUFFER_BIT);
          webglDraw(gl);
          break;
        case "7":
          gl.clear(gl.COLOR_BUFFER_BIT);
          webglRef.current.onclick = null;
          webglRef.current.onclick = e => webglClickDraw(e, gl);
          break;
      }
    }
  }, [showCanvas, state.drawType]);

  /**
   * 绘制矩形
   */
  const drawRect = ctx => {
    ctx.fillRect(-50, -50, 100, 100);
    ctx.strokeRect(-50, -50, 100, 100);
  };

  /**
   * 绘制三角形
   */
  const drawTriangle = ctx => {
    ctx.beginPath();
    ctx.moveTo(-50, -50);
    ctx.lineTo(-50, 50);
    ctx.lineTo(50, 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  /**
   * 绘制直线
   */
  const drawLine = ctx => {
    ctx.beginPath();
    ctx.moveTo(-50, 0);
    ctx.lineTo(50, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  /**
   * 绘制圆形
   */
  const drawArc = ctx => {
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  /**
   * 绘制文本
   */
  const drawText = ctx => {
    ctx.beginPath();
    // 绘制文本
    ctx.font = "30px sans-serif";
    ctx.fillText("Canvas实验室", -100, -15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  };

  /**
   * 绘制二次贝塞尔曲线
   */
  const drawQuadratic = ctx => {
    ctx.beginPath();
    ctx.moveTo(50,50);
    ctx.quadraticCurveTo(35,0,20,10)
    ctx.quadraticCurveTo(0,25,8,60)
    ctx.quadraticCurveTo(20,90,50,100)
    ctx.quadraticCurveTo(85,85,92,60)
    ctx.quadraticCurveTo(100,20,80,10)
    ctx.quadraticCurveTo(65,0,50,50)
    ctx.stroke();
    ctx.fill();
  };

  let timer;
  const eyeBallMove = e => {
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

  /**
   * webgl绘制点
   */
  const webglDraw = gl => {
    const vs = `
        void main(){
            gl_Position  = vec4(0.0,0.0,1.0,1.0);
            gl_PointSize  = 40.0;
        }
    `;
    const fs = `
        void main(){
            gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        }
    `;
    const vsShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsShader, vs);
    gl.compileShader(vsShader);
    let success = gl.getShaderParameter(vsShader, gl.COMPILE_STATUS);

    const fsShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsShader, fs);
    gl.compileShader(fsShader);
    let success1 = gl.getShaderParameter(fsShader, gl.COMPILE_STATUS);

    const program = gl.createProgram();
    gl.attachShader(program, vsShader);
    gl.attachShader(program, fsShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.drawArrays(gl.POINTS, 0, 1);
  };

  /**
   * 点击绘制点
   */
  const webglClickDraw = (e, gl) => {
    const { x, y, width, height } = webglRef.current.getBoundingClientRect();
    const pointX = Number(((e.pageX - x) / width - 0.5) * 2);
    const pointY = Number(-((e.pageY - y) / height - 0.5) * 2);

    const vs = `
        attribute vec2 a_position;
        void main(){
            gl_Position  = vec4(a_position,1.0,1.0);
            gl_PointSize  = 40.0;
        }
    `;
    const fs = `
        void main(){
            gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        }
    `;
    const vsShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vsShader, vs);
    gl.compileShader(vsShader);

    const fsShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fsShader, fs);
    gl.compileShader(fsShader);

    const program = gl.createProgram();
    gl.attachShader(program, vsShader);
    gl.attachShader(program, fsShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    pointsArr.push(...[pointX, pointY]);
    const point = [...pointsArr];
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(point), gl.STATIC_DRAW);

    const a_position = gl.getAttribLocation(program, "a_position");
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_position);
    gl.drawArrays(gl.POINTS, 0, point.length / 2);
  };

  return (
    <div ref={canvasWrapRef} className={styles.showPattern_wrap}>
      <canvas ref={canvasRef}></canvas>
      <canvas
        ref={webglRef}
        className={styles.webgl_canvas}
        style={{ display: showCanvas ? "none" : "block" }}
      ></canvas>
    </div>
  );
}

export default ShowPattern;

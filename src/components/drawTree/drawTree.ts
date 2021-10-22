import Vector2D from './vector2d'
const drawTree = (ctx, canvasDom) => {
    ctx.restore();
    ctx.save();
    ctx.translate(0, canvasDom.height);
    ctx.scale(1, -1);
    ctx.lineCap = 'round';
    const v0 = new Vector2D(canvasDom.width / 2, 0);
    drawBranch(ctx, v0, 50, 10, 1, 3)
    ctx.restore();

    // scanHandler(ctx, canvasDom)

    // computedDistance(ctx, canvasDom)
}

// 距离
const computedDistance = (ctx, canvasDom) => {
    ctx.save()
    // 斜率
    const k = -2;
    // y轴截距
    const b = 600;
    // 直线外的点
    const p = { x: 300, y: 500 }
    // 点p在直线上的投影
    const pProject = { x: 0, y: 0 }
    // 直线上的任意q点
    const q = { x: 180, y: 180 * k + b }
    // 直线上的任意r点
    const r = { x: 255, y: 255 * k + b }
    // 直线的方程式：kx+b-y=0
    ctx.translate(0, canvasDom.height);
    ctx.scale(1, -1);
    // 当x为0，直线在y轴的点
    const endY = k * 0 + b;
    // 当y为0，直线在x轴的点
    const endX = (0 - b) / k;

    ctx.fillRect(q.x, q.y, 3, 3)
    ctx.fillRect(r.x, r.y, 3, 3)
    ctx.save()
    ctx.translate(q.x, q.y)
    ctx.rotate(Math.PI / 180 * 180)
    ctx.fillText("Q", 10, 0)
    ctx.restore()

    ctx.save()
    ctx.translate(r.x, r.y)
    ctx.rotate(Math.PI / 180 * 180)
    ctx.fillText("R", 10, 0)
    ctx.restore()


    // 绘制直线
    ctx.beginPath();
    ctx.moveTo(endX, 0);
    ctx.lineTo(0, endY);
    ctx.stroke();

    // 绘制p点
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();

    /**
     * p点到直线的投影点pProject垂直于直线，两条垂直直线的斜率乘积为-1，由此判断p到pProject的直线斜率为-1/k
     * 联立两个直线的方程式可以得出pProject的
     * x点为 (k * q.x + p.x / k + p.y - q.y) / (1 / k + k)
     * y点为 -1 / k * (pProject.x - p.x) + p.y
     */
    pProject.x = (k * q.x + p.x / k + p.y - q.y) / (1 / k + k);
    pProject.y = -1 / k * (pProject.x - p.x) + p.y;

    // 绘制p点在直线投影到p点的线
    ctx.beginPath();
    ctx.strokeStyle = "#000"
    ctx.moveTo(pProject.x, pProject.y);
    ctx.lineTo(p.x, p.y)
    ctx.stroke();

    // 求p点到直线的距离 d=|Ax0+By0+C|/√A^2+B^2
    console.log(Math.abs(k * p.x + -1 * p.y + b) / Math.hypot(k, -1));

    const cross = (r.x - q.x) * (p.x - q.x) + (p.y - q.y) * (r.y - q.y); //|qr*qp|：矢量乘
    let pqr = 0;
    let pqrPoint = { x: 0, y: 0 }
    if (cross <= 0) {
        pqr = Math.hypot(q.x - p.x, q.y - p.y); //是|qp|：矢量的大小
        pqrPoint = { ...q }
    } else {
        const d2 = Math.pow(q.x - r.x, 2) + Math.pow(q.y - r.y, 2); //|qr|^2：矢量AB的大小的平方
        if (cross >= d2) {
            pqr = Math.hypot(r.x - p.x, r.y - p.y); //是|rp|：矢量的大小
            pqrPoint = { ...r }
        } else {
            pqr = Math.abs(k * p.x + -1 * p.y + b) / Math.hypot(k, -1);
            pqrPoint = { ...pProject }
        }
    }

    // 绘制p点到线段qr的最短距离
    ctx.beginPath();
    ctx.strokeStyle = "#f40"
    ctx.moveTo(pqrPoint.x, pqrPoint.y);
    ctx.lineTo(p.x, p.y)
    ctx.stroke();
    ctx.restore()
}

// 扫描
const scanHandler = (ctx, canvasDom) => {
    ctx.save();
    ctx.translate(canvasDom.width / 2, canvasDom.height);
    ctx.scale(1, -1);
    const aX = 200 * Math.cos(Math.PI / 180 * 120);
    const aY = 200 * Math.sin(Math.PI / 180 * 120);
    const bX = 200 * Math.cos(Math.PI / 180 * 60);
    const bY = 200 * Math.sin(Math.PI / 180 * 60);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(aX, aY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(bX, bY);
    ctx.stroke();

    canvasDom.onclick = (e) => {
        const pointVec = [e.offsetX - canvasDom.width / 2, canvasDom.height - e.offsetY]
        const v0 = new Vector2D(...pointVec)
        const isRange = Math.abs(new Vector2D(0, 1).cross(v0.normalize())) <= 0.5;
        ctx.fillStyle = isRange ? '#000' : '#f40';
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, 3, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    ctx.restore();
}

const drawBranch = (ctx, v0, length, thickness, dir, bias) => {
    const v = new Vector2D().rotate(dir).scale(length);
    const v1 = v0.copy().add(v);
    console.log(v0, v1, dir, length)
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(...v0);
    ctx.lineTo(...v1);
    ctx.stroke();
    if (thickness > 2) {
        const leftRadius = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
        const rightRadius = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
        drawBranch(ctx, v1, length * 0.9, thickness * 0.8, leftRadius, bias * 0.9);
        drawBranch(ctx, v1, length * 0.9, thickness * 0.8, rightRadius, bias * 0.9);
    }
    if (thickness < 3 && Math.random() < 0.5) {
        ctx.save();
        ctx.strokeStyle = '#c72c35';
        const th = Math.random() * 6 + 3;
        ctx.lineWidth = th;
        ctx.beginPath();
        ctx.moveTo(...v1);
        ctx.lineTo(v1.x, v1.y - 2);
        ctx.stroke();
        ctx.restore();
    }
}

export default drawTree
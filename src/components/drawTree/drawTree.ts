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
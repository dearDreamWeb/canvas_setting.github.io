interface linesItem {
    p1: controlPointsItem
    p2: controlPointsItem
}
interface controlPointsItem {
    x: number;
    y: number
}

// 绘制控制器的线段和点
const drawControl = (ctx, controlPoints, x, y, width, height, realRotate, callback) => {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(realRotate);
    ctx.translate(-(x + width / 2), -(y + height / 2));
    ctx.strokeStyle = '#f40';
    ctx.strokeRect(x, y, width, height)
    ctx.restore()
    const newControlPoints = controlPoints.map((itemPoints) => getEndPointByRotate([itemPoints.x, itemPoints.y], [x + width / 2, y + height / 2], realRotate))
    ctx.strokeStyle = '#f40';
    ctx.fillStyle = '#f40';
    newControlPoints.forEach((item) => {
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(realRotate);
        ctx.translate(-item.x, -item.y);
        ctx.fillRect(item.x, item.y, 10, 10)
        ctx.restore();
    })
    const lines: linesItem[] = []
    lines[0] = {
        p1: newControlPoints[0],
        p2: newControlPoints[1],
    };
    lines[1] = {
        p1: newControlPoints[0],
        p2: newControlPoints[2],
    };
    lines[2] = {
        p1: newControlPoints[1],
        p2: newControlPoints[3],
    };
    lines[3] = {
        p1: newControlPoints[2],
        p2: newControlPoints[3],
    };
    callback(lines)
}

// 绘制矩形
const drawRectBox = (ctx, x, y, width, height, realRotate) => {
    ctx.save();
    ctx.fillStyle = '#000';
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(realRotate);
    ctx.translate(-(x + width / 2), -(y + height / 2));
    ctx.fillRect(x, y, width, height);
    ctx.restore();
}

// 得到控制点旋转之后的坐标
const getEndPointByRotate = (startPoint: number[], centerPoint: number[], angle: number) => {
    const [centerX, centerY] = centerPoint;
    const [x1, y1] = [startPoint[0] - centerX, startPoint[1] - centerY];
    const x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
    const y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle);
    return { x: x2 + centerX, y: y2 + centerY };
}

const useDrawRect = (ctx, canvasDom, state, type, callback) => {
    ctx.restore();
    const { rectParams, rotate } = state
    let lines: linesItem[] = rectParams.lines
    let controlPoints: controlPointsItem[] = rectParams.controlPoints
    let { x, y, width, height } = rectParams;
    let isRectSelected = false;
    const realRotate = rotate * 3.6 * (Math.PI / 180);

    // 判断是否点击中图形
    const isSelected = (e) => {
        let eventX = e.clientX - canvasDom.getBoundingClientRect().left;
        let eventY = e.clientY - canvasDom.getBoundingClientRect().top;
        let intersectionCount = 0;
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            // 两个顶点
            let { p1, p2 } = line;
            if ((p1.y < eventY && p2.y < eventY) || (p1.y >= eventY && p2.y >= eventY)) {
                continue;
            } else {
                const sx = ((eventY - p1.y) / (p2.y - p1.y)) * (p2.x - p1.x) + p1.x;
                if (sx >= eventX) {
                    intersectionCount++;
                }
            }
        }
        return !(intersectionCount % 2 === 0);
    }



    if (type === 'rotate') {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        drawRectBox(ctx, x, y, width, height, realRotate)
        if (rectParams.isRectSelected) {
            drawControl(ctx, controlPoints, x, y, width, height, realRotate, (data) => lines = data)
        }
    } else {
        ctx.save()
        ctx.fillRect(rectParams.x, rectParams.y, rectParams.width, rectParams.height);
        ctx.restore()
    }

    canvasDom.onmousedown = (e) => {
        if (isSelected(e)) {
            isRectSelected = true;

            drawRectBox(ctx, x, y, width, height, realRotate)
            drawControl(ctx, controlPoints, x, y, width, height, realRotate, (data) => lines = data)
            canvasDom.onmousemove = (e) => {
                x += e.movementX
                y += e.movementY

                // ['tl', 'tr', 'bl', 'br', 'tc', 'bc', 'lc', 'rc', 'rp']
                controlPoints[0] = { x: x - 5, y: y - 5 }
                controlPoints[1] = { x: x + width - 5, y: y - 5 }
                controlPoints[2] = { x: x - 5, y: y + height - 5 }
                controlPoints[3] = { x: x + width - 5, y: y + height - 5 }
                controlPoints[4] = { x: x + width / 2 - 5, y: y - 5 }
                controlPoints[5] = { x: x + width / 2 - 5, y: y + height - 5 }
                controlPoints[6] = { x: x - 5, y: y + height / 2 - 5 }
                controlPoints[7] = { x: x + width - 5, y: y + height / 2 - 5 }
                controlPoints[8] = { x: x + width / 2 - 5, y: y - 40 }
                ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
                drawRectBox(ctx, x, y, width, height, realRotate)
                drawControl(ctx, controlPoints, x, y, width, height, realRotate, (data) => lines = data)
            }
        } else {
            isRectSelected = false
            callback({ ...rectParams, isRectSelected })
            ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
            drawRectBox(ctx, x, y, width, height, realRotate)
        }
        canvasDom.onmouseup = () => {
            canvasDom.onmousemove = null;
            drawRectBox(ctx, x, y, width, height, realRotate)
            if (isRectSelected) {
                drawControl(ctx, controlPoints, x, y, width, height, realRotate, (data) => lines = data)
            }
            callback({ ...rectParams, x, y, lines, controlPoints, isRectSelected })
        }
    }

}

export default useDrawRect
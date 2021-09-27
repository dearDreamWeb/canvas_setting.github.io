// 绘制控制器的线段和点
const drawControl = (ctx, canvasDom, controlPoints, x, y, width, height) => {
    ctx.save();
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
    ctx.fillRect(x, y, width, height);
    ctx.strokeStyle = '#f40';
    ctx.fillStyle = '#f40';
    ctx.strokeRect(x, y, width, height)
    controlPoints.forEach((item) => {
        ctx.fillRect(item.x, item.y, 10, 10)
    })
    ctx.restore()
}

const getEndPointByRotate = (startPoint: number[], centerPoint: number[], angle: number) => {
    const [centerX, centerY] = centerPoint;
    const [x1, y1] = [startPoint[0] - centerX, startPoint[1] - centerY];
    const x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
    const y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle);
    return { x: x2 + centerX, y: y2 + centerY };
}
interface linesItem {
    p1: controlPointsItem
    p2: controlPointsItem
}
interface controlPointsItem {
    x: number;
    y: number
}
const useDrawRect = (ctx, canvasDom, state, type, callback) => {
    ctx.restore();
    const { rectParams, rotate } = state

    // 判断是否点击中图形
    const isSelected = (e) => {
        let x = e.clientX - canvasDom.getBoundingClientRect().left;
        let y = e.clientY - canvasDom.getBoundingClientRect().top;
        let intersectionCount = 0;
        for (let i = 0; i < rectParams.lines.length; i++) {
            let line = rectParams.lines[i];
            // 两个顶点
            let { p1, p2 } = line;
            if ((p1.y < y && p2.y < y) || (p1.y >= y && p2.y >= y)) {
                continue;
            } else {
                const sx = ((y - p1.y) / (p2.y - p1.y)) * (p2.x - p1.x) + p1.x;
                if (sx >= x) {
                    intersectionCount++;
                }
            }
        }
        return !(intersectionCount % 2 === 0);
    }

    let lines: linesItem[] = rectParams.lines
    let controlPoints: controlPointsItem[] = rectParams.controlPoints
    let { x, y, width, height } = rectParams;
    let isRectSelected = false;
    const realRotate = rotate * 3.6 * (Math.PI / 180);

    if (type === 'rotate') {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        ctx.save();
        ctx.fillStyle = '#000';
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(realRotate);
        ctx.translate(-(x + width / 2), -(y + height / 2));
        ctx.fillRect(x, y, width, height);

        ctx.restore();
        // if (rectParams.isRectSelected) {
        // drawControl(ctx, canvasDom, controlPoints, x, y, width, height);

        const newControlPoints = controlPoints.map((itemPoints) => getEndPointByRotate([itemPoints.x, itemPoints.y], [x + width / 2, y + height / 2], realRotate))

        ctx.strokeStyle = '#f40';
        ctx.fillStyle = '#f40';
        newControlPoints.forEach((item) => {
            ctx.fillRect(item.x, item.y, 10, 10)
        })
        // }
    } else {
        ctx.save()
        ctx.fillRect(rectParams.x, rectParams.y, rectParams.width, rectParams.height);
        ctx.restore()
    }



    canvasDom.onmousedown = (e) => {

        if (isSelected(e)) {
            isRectSelected = true;
            ctx.save();
            ctx.fillStyle = '#000';
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(realRotate);
            ctx.translate(-(x + width / 2), -(y + height / 2));
            ctx.fillRect(x, y, width, height);
        
            // ctx.strokeStyle = '#f40';
            // ctx.fillStyle = '#f40';
            // ctx.strokeRect(x, y, width, height)
            // controlPoints.forEach((item) => {
            //     ctx.fillRect(item.x, item.y, 10, 10)
            // })
            ctx.restore()

            canvasDom.onmousemove = (e) => {
                x += e.movementX
                y += e.movementY
                lines[0] = {
                    p1: { x, y },
                    p2: { x: x + width, y },
                };
                lines[1] = {
                    p1: { x, y },
                    p2: { x, y: y + height },
                };
                lines[2] = {
                    p1: { x: x + width, y },
                    p2: { x: x + width, y: y + height },
                };
                lines[3] = {
                    p1: { x, y: y + height },
                    p2: { x: x + width, y: y + height },
                };
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
                drawControl(ctx, canvasDom, controlPoints, x, y, width, height)
            }
        } else {
            isRectSelected = false
            callback({ ...rectParams, isRectSelected })
            ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
            ctx.save()
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(realRotate);
            ctx.translate(-(x + width / 2), -(y + height / 2));
            ctx.fillRect(x, y, width, height);
            ctx.restore()
        }
        canvasDom.onmouseup = () => {
            canvasDom.onmousemove = null;
            ctx.save()
            ctx.translate(x + width / 2, y + height / 2);
            ctx.rotate(realRotate);
            ctx.translate(-(x + width / 2), -(y + height / 2));
            ctx.fillRect(x, y, width, height);
            ctx.restore()
            if (isRectSelected) {
                drawControl(ctx, canvasDom, controlPoints, x, y, width, height)
            }
            callback({ ...rectParams, x, y, lines, controlPoints, isRectSelected })
        }
    }

}

export default useDrawRect
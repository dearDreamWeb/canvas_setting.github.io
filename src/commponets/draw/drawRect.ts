interface linesItem {
    p1: controlPointsItem
    p2: controlPointsItem
}
interface controlPointsItem {
    x: number;
    y: number
}
const useDrawRect = (ctx, canvasDom, state, callback) => {
    const { rectParams } = state
    ctx.restore();
    let rectX = rectParams.x;
    let rectY = rectParams.y;
    let rectW = rectParams.width;
    let rectH = rectParams.height;

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

    ctx.fillRect(rectParams.x, rectParams.y, rectParams.width, rectParams.height);

    canvasDom.onmousedown = (e) => {
        if (isSelected(e)) {
            ctx.save();
            ctx.strokeStyle = '#f40';
            ctx.fillStyle = '#f40';
            ctx.strokeRect(rectX, rectY, rectW, rectH)
            rectParams.controlPoints.forEach((item) => {
                ctx.fillRect(item.x, item.y, 10, 10)
            })
            ctx.restore()
            let lines: linesItem[] = rectParams.lines
            let controlPoints: controlPointsItem[] = rectParams.controlPoints
            let { x, y, width, height } = rectParams;
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
            canvasDom.onmouseup = () => {
                canvasDom.onmousemove = null;
                callback({ ...rectParams, x, y, lines, controlPoints })
            }
        } else {
            ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
            ctx.fillRect(rectParams.x, rectParams.y, rectParams.width, rectParams.height);
        }
    }
}

export default useDrawRect
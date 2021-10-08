interface linesItem {
    p1: controlPointsItem
    p2: controlPointsItem
}
interface controlPointsItem {
    x: number;
    y: number
}

// const oCoords: any = {
//     tl: {
//       x: ltX,
//       y: ltY
//     },
//     tr: {
//       x: rtX,
//       y: rtY
//     },
//     br: {
//       x: rbX,
//       y: rbY
//     },
//     bl: {
//       x: lbX,
//       y: lbY
//     }
//   };
//   const point = {
//     x: x2,
//     y: y2
//   };
//   function lineBox(oCoords: any) {

//     var lines: any = {
//       topline: {
//         o: oCoords.tl,
//         d: oCoords.tr
//       },
//       rightline: {
//         o: oCoords.tr,
//         d: oCoords.br
//       },
//       bottomline: {
//         o: oCoords.br,
//         d: oCoords.bl
//       },
//       leftline: {
//         o: oCoords.bl,
//         d: oCoords.tl
//       },
//     };
//     return lines;
//   };
//   let lines = lineBox(oCoords);
// function pointBox(point: { y: number; x: number; }, lines: any) {

//     var b1, b2, a1, a2, xi,
//         xcount = 0,
//         iLine;

//     for (var lineKey in lines) {
//         iLine = lines[lineKey];
//         // optimisation 1: line below point. no cross
//         if ((iLine.o.y < point.y) && (iLine.d.y < point.y)) {
//             continue;
//         }
//         // optimisation 2: line above point. no cross
//         if ((iLine.o.y >= point.y) && (iLine.d.y >= point.y)) {
//             continue;
//         }
//         // optimisation 3: vertical line case
//         if ((iLine.o.x === iLine.d.x) && (iLine.o.x >= point.x)) {
//             xi = iLine.o.x;
//         }
//         // calculate the intersection point
//         else {
//             b1 = 0;
//             b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
//             a1 = point.y - b1 * point.x;
//             a2 = iLine.o.y - b2 * iLine.o.x;

//             xi = -(a1 - a2) / (b1 - b2);
//         }

//         if (xi >= point.x) {
//             xcount += 1;
//         }
//         // optimisation 4: specific for square images
//         if (xcount === 2) {
//             break;
//         }
//     }
//     return xcount;
// };

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
        p1: getEndPointByRotate([x, y], [x + width / 2, y + height / 2], realRotate),
        p2: getEndPointByRotate([x + width, y], [x + width / 2, y + height / 2], realRotate),
    };
    lines[1] = {
        p1: getEndPointByRotate([x, y], [x + width / 2, y + height / 2], realRotate),
        p2: getEndPointByRotate([x, y + height], [x + width / 2, y + height / 2], realRotate),
    };
    lines[2] = {
        p1: getEndPointByRotate([x + width, y], [x + width / 2, y + height / 2], realRotate),
        p2: getEndPointByRotate([x + width, y + height], [x + width / 2, y + height / 2], realRotate),
    };
    lines[3] = {
        p1: getEndPointByRotate([x, y + height], [x + width / 2, y + height / 2], realRotate),
        p2: getEndPointByRotate([x + width, y + height], [x + width / 2, y + height / 2], realRotate),
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
    let selectedControl: null | number = null
    let isDrag = false;

    // 判断是否点击中图形
    const isSelected = (e) => {
        let eventX = Math.floor(e.clientX - canvasDom.getBoundingClientRect().left);
        let eventY = Math.floor(e.clientY - canvasDom.getBoundingClientRect().top);
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

        // 是否点击了控制器
        let isSelectedControl = false
        selectedControl = null
        const newControlPoints = controlPoints.map((itemPoints) => getEndPointByRotate([itemPoints.x, itemPoints.y], [x + width / 2, y + height / 2], realRotate))

        newControlPoints.forEach((item, index) => {
            const lines: linesItem[] = []

            lines[0] = {
                p1: getEndPointByRotate([item.x, item.y], [item.x + 5, item.y + 5], realRotate),
                p2: getEndPointByRotate([item.x + 10, item.y], [item.x + 5, item.y + 5], realRotate),
            };
            lines[1] = {
                p1: getEndPointByRotate([item.x, item.y], [item.x + 5, item.y + 5], realRotate),
                p2: getEndPointByRotate([item.x, item.y + 10], [item.x + 5, item.y + 5], realRotate),
            };
            lines[2] = {
                p1: getEndPointByRotate([item.x + 10, item.y], [item.x + 5, item.y + 5], realRotate),
                p2: getEndPointByRotate([item.x + 10, item.y + 10], [item.x + 5, item.y + 5], realRotate),
            };
            lines[3] = {
                p1: getEndPointByRotate([item.x, item.y + 10], [item.x + 5, item.y + 5], realRotate),
                p2: getEndPointByRotate([item.x + 10, item.y + 10], [item.x + 5, item.y + 5], realRotate),
            };
            let count = 0;
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                // 两个顶点
                let { p1, p2 } = line;

                if ((p1.y < eventY && p2.y < eventY) || (p1.y >= eventY && p2.y >= eventY)) {
                    continue;
                } else {
                    const sx = ((eventY - p1.y) / (p2.y - p1.y)) * (p2.x - p1.x) + p1.x;
                    if (sx >= eventX) {
                        count++;
                    }
                }
            }

            if (!(count % 2 === 0)) {
                isSelectedControl = true
                selectedControl = index
            }
        })
        console.log(selectedControl)
        return !(intersectionCount % 2 === 0) || isSelectedControl;
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
            isDrag = true
            isRectSelected = true;
            drawRectBox(ctx, x, y, width, height, realRotate)
            drawControl(ctx, controlPoints, x, y, width, height, realRotate, (data) => lines = data)
            console.log(isDrag)
        } else {
            isRectSelected = false
            callback({ ...rectParams, isRectSelected })
            ctx.clearRect(0, 0, canvasDom.width, canvasDom.height)
            drawRectBox(ctx, x, y, width, height, realRotate)
        }
        canvasDom.onmouseup = () => {
            isDrag = false
            drawRectBox(ctx, x, y, width, height, realRotate)
            if (isRectSelected) {
                drawControl(ctx, controlPoints, x, y, width, height, realRotate, (data) => lines = data)
            }
            callback({ ...rectParams, x, y, lines, controlPoints, isRectSelected })
        }
    }
    canvasDom.onmousemove = (e) => {
        if (isDrag) {
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

    }

}

export default useDrawRect
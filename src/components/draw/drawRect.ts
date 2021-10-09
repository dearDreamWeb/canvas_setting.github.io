interface linesItem {
    o: controlPointsItem
    d: controlPointsItem
}
interface ILines {
    // 上
    topLine: linesItem,
    // 左
    leftLine: linesItem,
    // 右
    rightLine: linesItem,
    // 下
    bottomLine: linesItem,
}
interface controlPointsItem {
    x: number;
    y: number
}

// 判断鼠标样式
const getCursorStyle = (canvasDom, index, realRotate) => {
    let cursorStyle = '';
    const rotate = realRotate * 180 / Math.PI;
    const range = rotate / 45
    switch (index) {
        case 0:
            if (range <= 1) {
                cursorStyle = 'nw-resize';
            } else if (range <= 2) {
                cursorStyle = 'ne-resize';
            } else if (range <= 3) {
                cursorStyle = 'e-resize';
            } else if (range <= 4) {
                cursorStyle = 'se-resize';
            } else if (range <= 5) {
                cursorStyle = 's-resize';
            } else if (range <= 6) {
                cursorStyle = 'sw-resize';
            } else if (range <= 7) {
                cursorStyle = 'w-resize';
            } else if (range <= 8) {
                cursorStyle = 'nw-resize';
            }
            break;
        case 1:
            if (range <= 1) {
                cursorStyle = 'ne-resize';
            } else if (range <= 2) {
                cursorStyle = 'e-resize';
            } else if (range <= 3) {
                cursorStyle = 'se-resize';
            } else if (range <= 4) {
                cursorStyle = 's-resize';
            } else if (range <= 5) {
                cursorStyle = 'sw-resize';
            } else if (range <= 6) {
                cursorStyle = 'w-resize';
            } else if (range <= 7) {
                cursorStyle = 'nw-resize';
            } else if (range <= 8) {
                cursorStyle = 'ne-resize';
            }
            break;
        case 2:
            if (range <= 1) {
                cursorStyle = 'sw-resize';
            } else if (range <= 2) {
                cursorStyle = 'w-resize';
            } else if (range <= 3) {
                cursorStyle = 'nw-resize';
            } else if (range <= 4) {
                cursorStyle = 'ne-resize';
            } else if (range <= 5) {
                cursorStyle = 'e-resize';
            } else if (range <= 6) {
                cursorStyle = 'se-resize';
            } else if (range <= 7) {
                cursorStyle = 's-resize';
            } else if (range <= 8) {
                cursorStyle = 'sw-resize';
            }
            break;
        case 3:
            if (range <= 1) {
                cursorStyle = 'se-resize';
            } else if (range <= 2) {
                cursorStyle = 's-resize';
            } else if (range <= 3) {
                cursorStyle = 'sw-resize';
            } else if (range <= 4) {
                cursorStyle = 'w-resize';
            } else if (range <= 5) {
                cursorStyle = 'nw-resize';
            } else if (range <= 6) {
                cursorStyle = 'ne-resize';
            } else if (range <= 7) {
                cursorStyle = 'e-resize';
            } else if (range <= 8) {
                cursorStyle = 'se-resize';
            }
            break;
        case 4:
            if (range <= 1) {
                cursorStyle = 'n-resize';
            } else if (range <= 2) {
                cursorStyle = 'ne-resize';
            } else if (range <= 3) {
                cursorStyle = 'e-resize';
            } else if (range <= 4) {
                cursorStyle = 's-resize';
            } else if (range <= 5) {
                cursorStyle = 'sw-resize';
            } else if (range <= 6) {
                cursorStyle = 'w-resize';
            } else if (range <= 7) {
                cursorStyle = 'nw-resize';
            } else if (range <= 8) {
                cursorStyle = 'n-resize';
            }
            break;
        case 5:
            if (range <= 1) {
                cursorStyle = 's-resize';
            } else if (range <= 2) {
                cursorStyle = 'sw-resize';
            } else if (range <= 3) {
                cursorStyle = 'w-resize';
            } else if (range <= 4) {
                cursorStyle = 'nw-resize';
            } else if (range <= 5) {
                cursorStyle = 'n-resize';
            } else if (range <= 6) {
                cursorStyle = 'ne-resize';
            } else if (range <= 7) {
                cursorStyle = 'e-resize';
            } else if (range <= 8) {
                cursorStyle = 's-resize';
            }
            break;
        case 6:
            if (range <= 1) {
                cursorStyle = 'w-resize';
            } else if (range <= 2) {
                cursorStyle = 'nw-resize';
            } else if (range <= 3) {
                cursorStyle = 'n-resize';
            } else if (range <= 4) {
                cursorStyle = 'ne-resize';
            } else if (range <= 5) {
                cursorStyle = 'e-resize';
            } else if (range <= 6) {
                cursorStyle = 's-resize';
            } else if (range <= 7) {
                cursorStyle = 'sw-resize';
            } else if (range <= 8) {
                cursorStyle = 'w-resize';
            }
            break;
        case 7:
            if (range <= 1) {
                cursorStyle = 'e-resize';
            } else if (range <= 2) {
                cursorStyle = 's-resize';
            } else if (range <= 3) {
                cursorStyle = 'sw-resize';
            } else if (range <= 4) {
                cursorStyle = 'w-resize';
            } else if (range <= 5) {
                cursorStyle = 'nw-resize';
            } else if (range <= 6) {
                cursorStyle = 'n-resize';
            } else if (range <= 7) {
                cursorStyle = 'ne-resize';
            } else if (range <= 8) {
                cursorStyle = 'e-resize';
            }
            break;
        case 8:
            cursorStyle = 'move';
            break;
        default:
            cursorStyle = 'default';
            break;
    }
    canvasDom.style.cursor = cursorStyle;
}

// 获取线段
function lineBox(oCoords: any) {

    var lines: any = {
        topLine: {
            o: oCoords.tl,
            d: oCoords.tr
        },
        rightLine: {
            o: oCoords.tr,
            d: oCoords.br
        },
        bottomLine: {
            o: oCoords.br,
            d: oCoords.bl
        },
        leftLine: {
            o: oCoords.bl,
            d: oCoords.tl
        },
    };
    return lines;
};
// 判断是否在点击区域内，当为xCount为1时才是在点击区域
function pointBox(point: { y: number; x: number; }, lines: any) {

    var b1, b2, a1, a2, xi,
        xCount = 0,
        iLine;

    for (var lineKey in lines) {
        iLine = lines[lineKey];
        if ((iLine.o.y < point.y) && (iLine.d.y < point.y)) {
            continue;
        }
        if ((iLine.o.y >= point.y) && (iLine.d.y >= point.y)) {
            continue;
        }
        if ((iLine.o.x === iLine.d.x) && (iLine.o.x >= point.x)) {
            xi = iLine.o.x;
        }
        else {
            b1 = 0;
            b2 = (iLine.d.y - iLine.o.y) / (iLine.d.x - iLine.o.x);
            a1 = point.y - b1 * point.x;
            a2 = iLine.o.y - b2 * iLine.o.x;

            xi = -(a1 - a2) / (b1 - b2);
        }

        if (xi >= point.x) {
            xCount += 1;
        }

        if (xCount === 2) {
            break;
        }
    }

    return xCount === 1;
};

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
    let lines: any = {};

    lines.topLine = {
        o: getEndPointByRotate([x, y], [x + width / 2, y + height / 2], realRotate),
        d: getEndPointByRotate([x + width, y], [x + width / 2, y + height / 2], realRotate),
    };
    lines.leftLine = {
        o: getEndPointByRotate([x, y], [x + width / 2, y + height / 2], realRotate),
        d: getEndPointByRotate([x, y + height], [x + width / 2, y + height / 2], realRotate),
    };
    lines.rightLine = {
        o: getEndPointByRotate([x + width, y], [x + width / 2, y + height / 2], realRotate),
        d: getEndPointByRotate([x + width, y + height], [x + width / 2, y + height / 2], realRotate),
    };
    lines.bottomLine = {
        o: getEndPointByRotate([x, y + height], [x + width / 2, y + height / 2], realRotate),
        d: getEndPointByRotate([x + width, y + height], [x + width / 2, y + height / 2], realRotate),
    };

    callback(lines, newControlPoints)
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
    let lines: ILines = rectParams.lines
    let oCoords = rectParams.oCoords
    let controlPoints: controlPointsItem[] = rectParams.controlPoints
    let { x, y, width, height } = rectParams;
    let isRectSelected = false;  // 是否选中
    const realRotate = rotate * 3.6 * (Math.PI / 180);
    let isDrag = false;

    // 判断是否点击中图形
    const isSelected = (e) => {
        let eventX = Math.floor(e.clientX - canvasDom.getBoundingClientRect().left);
        let eventY = Math.floor(e.clientY - canvasDom.getBoundingClientRect().top);

        lines = lineBox(oCoords);

        // 是否点击了控制器
        let isSelectedControl = false
        const newControlPoints = controlPoints.map((itemPoints) => getEndPointByRotate([itemPoints.x, itemPoints.y], [x + width / 2, y + height / 2], realRotate))
        newControlPoints.forEach((item, index) => {
            const oCoords = {
                tl: getEndPointByRotate([item.x, item.y], [item.x, item.y], realRotate),
                tr: getEndPointByRotate([item.x + 10, item.y], [item.x, item.y], realRotate),
                br: getEndPointByRotate([item.x + 10, item.y + 10], [item.x, item.y], realRotate),
                bl: getEndPointByRotate([item.x, item.y + 10], [item.x, item.y], realRotate),
            }
            const lines = lineBox(oCoords);

            if (pointBox({ x: eventX, y: eventY }, lines)) {
                isSelectedControl = true;
            }
        })

        return pointBox({ x: eventX, y: eventY }, lines) || (isRectSelected && isSelectedControl);
    }

    if (type === 'rotate') {
        ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
        drawRectBox(ctx, x, y, width, height, realRotate)
        isRectSelected = true
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

            oCoords = {
                tl: getEndPointByRotate([x, y], [x + width / 2, y + height / 2], realRotate),
                tr: getEndPointByRotate([x + width, y], [x + width / 2, y + height / 2], realRotate),
                br: getEndPointByRotate([x + width, y + height], [x + width / 2, y + height / 2], realRotate),
                bl: getEndPointByRotate([x, y + height], [x + width / 2, y + height / 2], realRotate),
            }
            callback({ ...rectParams, x, y, lines, controlPoints, isRectSelected, oCoords })
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
        let controlIndex: null | number = null
        if (isRectSelected) {
            let eventX = Math.floor(e.clientX - canvasDom.getBoundingClientRect().left);
            let eventY = Math.floor(e.clientY - canvasDom.getBoundingClientRect().top);
            const newControlPoints = controlPoints.map((itemPoints) => getEndPointByRotate([itemPoints.x, itemPoints.y], [x + width / 2, y + height / 2], realRotate))
            newControlPoints.forEach((item, index) => {
                const oCoords = {
                    tl: getEndPointByRotate([item.x, item.y], [item.x, item.y], realRotate),
                    tr: getEndPointByRotate([item.x + 10, item.y], [item.x, item.y], realRotate),
                    br: getEndPointByRotate([item.x + 10, item.y + 10], [item.x, item.y], realRotate),
                    bl: getEndPointByRotate([item.x, item.y + 10], [item.x, item.y], realRotate),
                }
                const lines = lineBox(oCoords);

                if (pointBox({ x: eventX, y: eventY }, lines)) {
                    controlIndex = index
                }
            })
            getCursorStyle(canvasDom, controlIndex, realRotate)
        }

    }

}

export default useDrawRect
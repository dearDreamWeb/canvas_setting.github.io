import { createContext } from "react";

//初始数据
const initData = {
    drawType: null,  // 绘制图案的类型
    fillColor: '#000',  // 填充颜色
    strokeColor: '#000', // 线框颜色
    lineW: 0,   // 线宽
    lineType: 'solid', // 线的类型
    shadowBlur: 0, // 阴影模糊半径
    shadowOffsetX: 0, // 阴影X轴偏移量
    shadowOffsetY: 0, // 阴影Y轴偏移量
    shadowColor: '#000', // 阴影颜色
    scale: 50, // 缩放
    rotate: 0, // 旋转
    opacity: 100, // 不透明度
    textInput: 'Canvas实验室', // 文本内容
    fontSize: '36', // 文本字体大小
    textAlign: 'left', // 文本对齐方式
    textBaseline: 'top', // 文本基线对齐
    textDir: 'ltr', // 文本方向
    imgUrl: 'http://pic.616pic.com/ad_preview/00/09/19/5d50c8bfe378b.jpg-0.jpg!/fw/800/quality/90/unsharp/true/compress/true?%3E', // 图片地址
    sliceX: 0, // 切片X
    sliceY: 0, // 切片Y
    originX: 0, // 原点坐标X
    originY: 0, // 原点坐标Y
    rectParams: {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        lines: [
            // 上
            {
                p1: { x: 50, y: 50 },
                p2: { x: 150, y: 50 },
            },
            // 左
            {
                p1: { x: 50, y: 50 },
                p2: { x: 50, y: 150 },
            },
            // 右
            {
                p1: { x: 150, y: 50 },
                p2: { x: 150, y: 150 },
            },
            // 下
            {
                p1: { x: 50, y: 150 },
                p2: { x: 150, y: 150 },
            },
        ],
        // 减5是因为控制点宽高是10
        controlPoints: [
            { x: 50 - 5, y: 50 - 5 },     // tl
            { x: 150 - 5, y: 50 - 5 },    // tr
            { x: 50 - 5, y: 150 - 5 },    // bl
            { x: 150 - 5, y: 150 - 5 },   // br
            { x: 100 - 5, y: 50 - 5 },    // tc
            { x: 100 - 5, y: 150 - 5 },   // bc
            { x: 50 - 5, y: 100 - 5 },    // lc
            { x: 150 - 5, y: 100 - 5 },   // rc
            { x: 100 - 5, y: 50 - 40 }   // rp rotate point旋转点
        ],
        controlPointsType: ['tl', 'tr', 'bl', 'br', 'tc', 'bc', 'lc', 'rc', 'rp'],
        isRectSelected: false
    }
};

interface linesItem {
    p1: controlPointsItem
    p2: controlPointsItem
}
interface controlPointsItem {
    x: number;
    y: number
}

// 派发事件
const reducer = (state, action) => {
    switch (action.type) {
        // 初始化数据
        case "resetState":
            return { ...initData, drawType: 'reset' }
        // 改变数据
        case "changeState":
            return { ...state, ...action.data };
        // 改变矩形数据
        case "changeRect":
            return Object.assign(state, { rectParams: { ...action.data } });
        default:
            return state
    }
}

const ContextData: any = createContext({});

export { initData, reducer, ContextData }
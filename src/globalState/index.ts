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
};

// 派发事件
const reducer = (state, action) => {
    switch (action.type) {
        // 初始化数据
        case "resetState":
            return { ...initData, drawType: 'reset' }
        // 改变数据
        case "changeState":
            return { ...state, ...action.data };
        default:
            return state
    }
}

const ContextData: any = createContext({});

export { initData, reducer, ContextData }
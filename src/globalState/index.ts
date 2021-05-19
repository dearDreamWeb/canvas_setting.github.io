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
};

// 派发事件
const reducer = (state, action) => {
    switch (action.type) {
        // 初始化数据
        case "resetState":
            return { ...initData }
        // 改变数据
        case "changeState":
            return { ...state, ...action.data };
        default:
            return state
    }
}

const ContextData: any = createContext({});

export { initData, reducer, ContextData }
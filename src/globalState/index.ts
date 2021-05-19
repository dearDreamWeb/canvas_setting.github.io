import { createContext } from "react";

//初始数据
const initData = {
    drawType: null,  // 绘制图案的类型
    fillColor: '#000',
    strokeColor: '#000',
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
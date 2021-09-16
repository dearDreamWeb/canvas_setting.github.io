import React, { useEffect, useReducer } from "react";
import styles from "./index.module.scss";
import Slider from "../../commponets/Slider";
import CanvasSetting from "../../commponets/CanvasSetting";
import ShowPattern from "../../commponets/ShowPattern";
import { reducer, ContextData, initData } from "../../globalState"; //引入useReducer文件

const menuList = [
  {
    key: "0",
    text: "绘制矩形",
  },
  {
    key: "1",
    text: "绘制三角形",
  },
  {
    key: "2",
    text: "绘制直线",
  },
  {
    key: "3",
    text: "绘制圆形",
  },
  {
    key: "4",
    text: "绘制文本",
  },
  // {
  //   key: "5",
  //   text: "绘制哆啦A梦",
  // },
  // {
  //   key: "6",
  //   text: "webgl绘制点",
  // },
  // {
  //   key: "7",
  //   text: "webgl点击绘制点",
  // },
  {
    key: "8",
    text: "二次贝塞尔曲线",
  },
  {
    key: "9",
    text: "三次贝塞尔曲线",
  },
];

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initData);

  return (
    <ContextData.Provider
      value={{
        state,
        dispatch, // 把 dispatch 也作为 context 的一部分共享下去，从而在嵌套组件中调用以实现更新顶层的 state
      }}
    >
      <div className={styles.app}>
        <section className={styles.app_left}>
          <h1 className={styles.left_title}>Canvas实验室</h1>
          <ul className={styles.menu_list}>
            {menuList.map(item => {
              return (
                <li
                  key={item.key}
                  className={`${styles.menu_item} ${
                    item.key === state.drawType ? styles.menu_item_acitve : ""
                  }`}
                  onClick={() =>
                    dispatch({
                      type: "changeState",
                      data: { drawType: item.key },
                    })
                  }
                >
                  {item.text}
                </li>
              );
            })}
          </ul>
        </section>
        <section className={styles.app_right}>
          <div className={styles.canvas_settings}>
            <CanvasSetting />
          </div>
          <div className={styles.canvas_wrap}>
            <ShowPattern />
          </div>
        </section>
      </div>
    </ContextData.Provider>
  );
}

export default App;

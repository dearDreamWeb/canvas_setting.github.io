import React, { useContext, useEffect } from "react";
import styles from "./index.module.scss";
import { ContextData } from "../../globalState";
import Slider from "../Slider";

function CanvasSetting(): JSX.Element {
  const { state, dispatch } = useContext(ContextData);

  const changeState = (type, data) => {
    dispatch({
      type: "changeState",
      data: { [type]: data },
    });
  };

  // 改变颜色
  const changeColorState = (e, type) => {
    dispatch({
      type: "changeState",
      data: { [type]: e.target.value ? e.target.value : "#000" },
    });
  };

  //   线的类型改变
  const changeLineType = e => {
    dispatch({
      type: "changeState",
      data: { lineType: e.target.value },
    });
  };

  return (
    <div className={styles.setting_wrap}>
      <div className={styles.title_wrap}>
        <h1 className={styles.setting_title}>Canvas配置</h1>
        <button
          className={styles.reset_btn}
          onClick={() => {
            dispatch({
              type: "changeState",
              data: { drawType: "reset" },
            });
          }}
        >
          初始化数据
        </button>
      </div>

      <section className={styles.setting_main}>
        <Slider
          text="线宽："
          onChange={data => changeState("lineW", data)}
          value={state.lineW}
        />
        <Slider
          text="阴影模糊半径："
          onChange={data => changeState("shadowBlur", data)}
          value={state.shadowBlur}
        />
        <Slider
          text="阴影X轴偏移量："
          onChange={data => {
            changeState("shadowOffsetX", data);
          }}
          value={state.shadowOffsetX}
        />
        <Slider
          text="阴影Y轴偏移量："
          onChange={data => changeState("shadowOffsetY", data)}
          value={state.shadowOffsetY}
        />
        <Slider
          text="缩放："
          onChange={data => changeState("scale", data)}
          value={state.scale}
        />
        <Slider
          text="旋转："
          onChange={data => changeState("rotate", data)}
          value={state.rotate}
        />
        <Slider
          text="不透明度："
          onChange={data => changeState("opacity", data)}
          value={state.opacity}
        />
        <div>
          阴影颜色：
          <input
            type="text"
            value={state.shadowColor}
            onChange={e => changeColorState(e, "shadowColor")}
            placeholder="请输入阴影颜色"
          />
        </div>
        <div>
          填充颜色：
          <input
            type="text"
            value={state.fillColor}
            onChange={e => changeColorState(e, "fillColor")}
            placeholder="请输入填充颜色"
          />
        </div>
        <div>
          边框颜色：
          <input
            type="text"
            value={state.strokeColor}
            onChange={e => changeColorState(e, "strokeColor")}
            placeholder="请输入边框颜色"
          />
        </div>
        <div>
          线的类型：
          <select
            value={state.lineType}
            onChange={changeLineType}
            className={styles.select_diy}
          >
            <option value="solid">实线</option>
            <option value="dash">虚线</option>
          </select>
        </div>
      </section>
    </div>
  );
}

export default CanvasSetting;

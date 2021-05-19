import React, { useContext, useEffect } from "react";
import styles from "./index.module.scss";
import { ContextData } from "../../globalState";
import Slider from "../Slider";

function CanvasSetting(): JSX.Element {
  const { state, dispatch } = useContext(ContextData);

  //   线宽改变
  const changeSlider = data => {
    dispatch({
      type: "changeState",
      data: { lineW: data },
    });
  };

  //   阴影模糊半径改变
  const changeShadowBlur = data => {
    dispatch({
      type: "changeState",
      data: { shadowBlur: data },
    });
  };

  //   阴影X轴偏移量
  const changeShadowOffsetX = data => {
    dispatch({
      type: "changeState",
      data: { shadowOffsetX: data },
    });
  };

  //   阴影Y轴偏移量
  const changeShadowOffsetY = data => {
    dispatch({
      type: "changeState",
      data: { shadowOffsetY: data },
    });
  };

  //   阴影颜色改变
  const changeShadowColorr = e => {
    dispatch({
      type: "changeState",
      data: { shadowColor: e.target.value ? e.target.value : "#000" },
    });
  };

  //   填充颜色改变
  const changeFillColor = e => {
    dispatch({
      type: "changeState",
      data: { fillColor: e.target.value ? e.target.value : "#000" },
    });
  };

  //   线框颜色改变
  const changeStrokeColorr = e => {
    dispatch({
      type: "changeState",
      data: { strokeColor: e.target.value ? e.target.value : "#000" },
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
        <h1 className={styles.setting_title}>Canvas配置</h1>{" "}
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
        <Slider text="线宽：" onChange={changeSlider} value={state.lineW} />
        <Slider
          text="阴影模糊半径："
          onChange={changeShadowBlur}
          value={state.shadowBlur}
        />
        <Slider
          text="阴影X轴偏移量："
          onChange={changeShadowOffsetX}
          value={state.shadowOffsetX}
        />
        <Slider
          text="阴影Y轴偏移量："
          onChange={changeShadowOffsetY}
          value={state.shadowOffsetY}
        />
        <div>
          阴影颜色：
          <input
            type="text"
            value={state.shadowColor}
            onChange={changeShadowColorr}
            placeholder="请输入阴影颜色"
          />
        </div>
        <div>
          填充颜色：
          <input
            type="text"
            value={state.fillColor}
            onChange={changeFillColor}
            placeholder="请输入填充颜色"
          />
        </div>
        <div>
          边框颜色：
          <input
            type="text"
            value={state.strokeColor}
            onChange={changeStrokeColorr}
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

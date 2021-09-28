import React, { useContext } from "react";
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

  //   select改变
  const changeSelect = (e, type) => {
    dispatch({
      type: "changeState",
      data: { [type]: e.target.value },
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
              type: "resetState",
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
          type="rotate"
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
            onChange={e => changeSelect(e, "lineType")}
            className={styles.select_diy}
          >
            <option value="solid">实线</option>
            <option value="dash">虚线</option>
          </select>
        </div>
        {state.drawType === "4" ? (
          <>
            <div>
              文本内容：
              <input
                type="text"
                value={state.textInput}
                placeholder="请输入文本内容"
                onChange={e => changeState("textInput", e.target.value)}
              />
            </div>
            <div>
              字体大小：
              <select
                value={state.fontSize}
                onChange={e => changeSelect(e, "fontSize")}
                className={styles.select_diy}
              >
                <option value="36">36</option>
                <option value="44">44</option>
                <option value="56">56</option>
              </select>
            </div>
            <div>
              对齐方式：
              <select
                value={state.textAlign}
                onChange={e => changeSelect(e, "textAlign")}
                className={styles.select_diy}
              >
                <option value="left">左对齐</option>
                <option value="center">居中对齐</option>
                <option value="right">右对齐</option>
              </select>
            </div>
            <div>
              基线对齐：
              <select
                value={state.textBaseline}
                onChange={e => changeSelect(e, "textBaseline")}
                className={styles.select_diy}
              >
                <option value="top">顶部</option>
                <option value="middle">居中</option>
                <option value="bottom">底部</option>
              </select>
            </div>
            <div>
              文本方向：
              <select
                value={state.textDir}
                onChange={e => changeSelect(e, "textDir")}
                className={styles.select_diy}
              >
                <option value="ltr">从左向右</option>
                <option value="rtl">从右向左</option>
              </select>
            </div>
          </>
        ) : null}

        {state.drawType === "10" ? (
          <>
            <div>
              图片地址：
              <input
                type="text"
                value={state.imgUrl}
                placeholder="请输入图片地址"
                onChange={e => changeState("imgUrl", e.target.value)}
              />
            </div>
            <Slider
              text="切片X："
              onChange={data => changeState("sliceX", data)}
              value={state.sliceX}
            />
            <Slider
              text="切片Y："
              onChange={data => changeState("sliceY", data)}
              value={state.sliceY}
            />
            <Slider
              text="原点坐标X："
              onChange={data => changeState("originX", data)}
              value={state.originX}
            />
            <Slider
              text="原点坐标Y："
              onChange={data => changeState("originY", data)}
              value={state.originY}
            />
          </>
        ) : null}
      </section>
    </div>
  );
}

export default CanvasSetting;

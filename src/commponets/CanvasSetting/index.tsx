import React, { useContext, useEffect } from "react";
import styles from "./index.module.scss";
import { ContextData } from "../../globalState";
import Slider from "../Slider";

function CanvasSetting(): JSX.Element {
  const { state, dispatch } = useContext(ContextData);
  return (
    <div className={styles.setting_wrap}>
      <h1
        className={styles.setting_title}
        onClick={() => dispatch({ type: "changeState", data: { count1: 234 } })}
      >
        Canvas配置
      </h1>
      <section className={styles.setting_main}>
        <Slider text="线宽：" />
        <div>
          填充颜色：
          <input type="text" placeholder="请输入填充颜色" />
        </div>
        <div>
          边框颜色：
          <input type="text" placeholder="请输入边框颜色" />
        </div>
      </section>
    </div>
  );
}

export default CanvasSetting;

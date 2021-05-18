import React from "react";
import "./index.scss";
import Slider from "../../commponets/Slider";

function App(): JSX.Element {
  return (
    <div className="app">
      <section className="app_left"></section>
      <section className="app_right">
        <div className="canvas_settings">
          <Slider />
        </div>
        <div className="canvas_wrap">
          <canvas
            id="canvas"
            className="canvas"
            width="1600px"
            height="600px"
          ></canvas>
        </div>
      </section>
    </div>
  );
}

export default App;

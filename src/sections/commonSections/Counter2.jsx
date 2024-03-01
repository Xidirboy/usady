import React from "react";
import { Counter2Container } from "../../styleComponents/sections/commonStyle/Counter2Style";
import TitelBlack from "../utilsSections/TitelBlack";
import SliderCounter2 from "../utilsSections/SliderCounter2";

const Counter2 = ({ data = {} }) => {
  return (
    <>
      <Counter2Container>
        <div className="card">
          <div className="title">
            <TitelBlack word={data?.title ?? ""} className="main_titel" />
          </div>
          <div className="slider_t">
            <SliderCounter2 items={data?.items ?? []} />
          </div>
        </div>
      </Counter2Container>
    </>
  );
};

export default Counter2;

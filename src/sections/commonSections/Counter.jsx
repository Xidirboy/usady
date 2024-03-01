import React from "react";
import { CounterContainer } from "../../styleComponents/sections/commonStyle/CounterStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import SliderCounter from "../utilsSections/SliderCounter";

const Counter = ({ data = {} }) => {
  return (
    <>
      <CounterContainer>
        <div className="card">
          <TitelBlack word={data?.title ?? ""} className="main_titel" />
          <SliderCounter items={data?.items ?? []} />
        </div>
      </CounterContainer>
    </>
  );
};

export default Counter;

import React from "react";
import TitelBlack from "../utilsSections/TitelBlack";
import { StepContainer } from "../../styleComponents/sections/commonStyle/StepStyle";

const Step = ({ data = {} }) => {
  return (
    <>
      <StepContainer>
        <div className="card">
          <div className="s1">
            <TitelBlack word={data?.title ?? ""} />
            <div className="img_t">
              <img src={data?.image ?? ""} alt={data?.title ?? ""} />
            </div>
          </div>
          <div className="s2">
            {data?.items?.map((item, index) => (
              <div className={`step step${index + 1} light_item`} key={index}>
                <div className="num">
                  <img src={item?.image} alt="step" />
                </div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: item?.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </StepContainer>
    </>
  );
};

export default Step;

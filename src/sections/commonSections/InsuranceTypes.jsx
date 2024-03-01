import React from "react";
import { InsuranceTypesContainer } from "../../styleComponents/sections/commonStyle/InsuranceTypesStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import Slider4 from "../utilsSections/Slider4";
import { get } from "lodash";

const InsuranceTypes = ({ data = {} }) => {
  return (
    <>
      <InsuranceTypesContainer>
        <TitelBlack word={data?.title ?? ""} className="main_titel" />
        <div className="card">
          <div>
            <Slider4
              items={get(data, "items", []).filter((o) => o.height === 1)}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <Slider4
              items={get(data, "items", []).filter((o) => o.height === 2)}
            />
          </div>
        </div>
      </InsuranceTypesContainer>
    </>
  );
};

export default InsuranceTypes;

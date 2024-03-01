import React from "react";
import { UsefulServicesContainer } from "../../styleComponents/sections/commonStyle/UsefulServicesStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import Slider1 from "../utilsSections/Slider1";
import { get } from "lodash";

const UsefulServices = ({ data = "" }) => {
  return (
    <>
      <UsefulServicesContainer>
        <TitelBlack word={data?.title ?? ""} className="main_titel" />
        <Slider1 items={get(data, "items", []).filter((o) => o.height === 1)} />
        <Slider1 items={get(data, "items", []).filter((o) => o.height === 2)} />
      </UsefulServicesContainer>
    </>
  );
};

export default UsefulServices;

import React from "react";
import { PartnersContainer } from "../../styleComponents/sections/commonStyle/PartnersStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import SliderPartners from "../utilsSections/SliderPartners";

const Partners = ({ data = {} }) => {
  return (
    <>
      <PartnersContainer>
        <div className="card">
          <TitelBlack word={data?.title ?? ""} />
          <SliderPartners images={data?.image ?? []} />
        </div>
      </PartnersContainer>
    </>
  );
};

export default Partners;

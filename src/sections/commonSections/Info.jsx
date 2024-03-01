import React from "react";
import { InfoContainer } from "../../styleComponents/sections/commonStyle/InfoStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import SliderInfo from "../utilsSections/SliderInfo";

const Info = ({ data = {} }) => {
  return (
    <>
      <InfoContainer>
        <div className="card">
          <TitelBlack word={data?.title ?? ""} />
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: data?.desc ?? "" }}
          />
          <SliderInfo items={data?.items ?? []} />
        </div>
      </InfoContainer>
    </>
  );
};

export default Info;

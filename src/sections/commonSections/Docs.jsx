import React from "react";
import { DocsContainer } from "../../styleComponents/sections/commonStyle/DocsStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import SliderDocs from "../utilsSections/SliderDocs";

const Docs = ({ data = {} }) => {
  return (
    <>
      <DocsContainer>
        <div className="card">
          <TitelBlack word={data?.title ?? ""} />
          <SliderDocs items={data?.items ?? []} />
        </div>
      </DocsContainer>
    </>
  );
};

export default Docs;

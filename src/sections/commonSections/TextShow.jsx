import React from "react";
import { TextShowContainer } from "../../styleComponents/sections/commonStyle/TextShowStyle";

const TextShow = ({ data = {} }) => {
  return (
    <>
      <TextShowContainer>
        <div
          className="card light_item"
          dangerouslySetInnerHTML={{ __html: data?.desc ?? "" }}
        />
      </TextShowContainer>
    </>
  );
};

export default TextShow;

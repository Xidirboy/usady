import React from "react";
import TitelGreen from "../utilsSections/TitelGreen";
import Text from "../utilsSections/Text";
import { Btn } from "../../styleComponents/GlobalStyle";
import { BannerContainer } from "../../styleComponents/sections/commonStyle/BannerStyle";
import { Link } from "react-router-dom";

const Banner = ({ data = {} }) => {
  return (
    <>
      <BannerContainer>
        <div className="card">
          <div className="section1">
            {data?.top_title && (
              <div
                className="top_text"
                dangerouslySetInnerHTML={{ __html: data?.top_title }}
              />
            )}
            <TitelGreen word={data?.title ?? ""} />
            <Text className="text" word={data?.desc ?? ""} />
            <div className="btns">
              {data?.buttons
                ?.filter((o) => o.status === 1)
                ?.map((btn, index) => (
                  <Link to={btn?.link} key={index}>
                    <Btn
                      className="btn"
                      style={{
                        background: btn?.background_color,
                        color: btn?.color,
                        borderColor: btn?.color,
                      }}
                      dangerouslySetInnerHTML={{ __html: btn?.title }}
                    />
                  </Link>
                ))}
            </div>
          </div>
          <div className="section2">
            <img src={data?.image ?? ""} alt="homeSlider" />
          </div>
        </div>
      </BannerContainer>
    </>
  );
};

export default Banner;

import React from "react";
import { NewsSectionContainer } from "../../styleComponents/sections/commonStyle/NewsSectionStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { BtnWhite } from "../../styleComponents/GlobalStyle";
import { Link } from "react-router-dom";
import SliderNews from "../utilsSections/SliderNews";
import { useTranslation } from "react-i18next";

const NewsSection = ({ data }) => {
  const { t } = useTranslation();
  return (
    <>
      <NewsSectionContainer>
        <div className="card">
          <div className="head">
            <TitelBlack word={data?.title ?? ""} />
            <Link to="/news">
              <BtnWhite>{t("news.all")}</BtnWhite>
            </Link>
          </div>
          <SliderNews items={data?.items} />
        </div>
      </NewsSectionContainer>
    </>
  );
};

export default NewsSection;

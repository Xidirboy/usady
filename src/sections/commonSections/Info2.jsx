import React from "react";
import { Info2Container } from "../../styleComponents/sections/commonStyle/Info2Style";
import TitelBlack from "../utilsSections/TitelBlack";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Info2 = ({ data = {} }) => {
  const { t } = useTranslation();
  return (
    <>
      <Info2Container>
        <div className="card">
          <TitelBlack word={data?.title ?? ""} />
          <div className="words">
            {data?.items?.map((item, index) => (
              <div className="word" key={index}>
                <div
                  className="title"
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                />
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: item?.desc }}
                />
                <Link to={item?.link} className="link">
                  {t("info2.btn")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Info2Container>
    </>
  );
};

export default Info2;

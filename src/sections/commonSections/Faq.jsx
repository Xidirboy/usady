import React from "react";
import { FaqSectionContainer } from "../../styleComponents/sections/commonStyle/FaqSectionStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { BtnWhite } from "../../styleComponents/GlobalStyle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FaqSection = ({ data }) => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <>
      <FaqSectionContainer>
        <div className="card">
          <div className="head">
            <TitelBlack word={data?.title ?? ""} />
            <Link to="/faqs">
              <BtnWhite>{t("faqs.all")}</BtnWhite>
            </Link>
          </div>
          <div className="sections">
            <div className="section1">
              <div className="faqs">
                {data?.items?.map((item, index) => (
                  <div
                    className={
                      openFaq === index
                        ? "faq active_faq light_item"
                        : "faq light_item"
                    }
                    key={index}
                    onClick={() => {
                      setOpenFaq(index === openFaq ? -1 : index);
                    }}
                  >
                    <div className="title">
                      <div className="title_text">{item?.title}</div>
                      <div className="arrow">
                        <img alt={item?.title} src="/images/arrow.svg" />
                      </div>
                    </div>
                    {openFaq === index && (
                      <div
                        className="body"
                        dangerouslySetInnerHTML={{ __html: item?.body }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="btns m_btns">
                <Link to="/faqs">
                  <BtnWhite>{t("faqs.all")}</BtnWhite>
                </Link>
              </div>
            </div>
            <div className="section2">
              <img alt={data?.title ?? ""} src={data?.image} />
            </div>
          </div>
        </div>
      </FaqSectionContainer>
    </>
  );
};

export default FaqSection;

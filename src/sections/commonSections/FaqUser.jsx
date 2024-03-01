import React from "react";
import { FaqUserContainer } from "../../styleComponents/sections/commonStyle/FaqUserStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { BtnWhite } from "../../styleComponents/GlobalStyle";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const FaqUser = ({ data, is_all_btn = true }) => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(-1);
  const [openType, setOpenType] = useState(0);
  return (
    <>
      <FaqUserContainer>
        <div className="card">
          <div className="head">
            <TitelBlack word={data?.title ?? ""} />
            {/* <Link to="#">
              <BtnWhite>{t('faqs.title')}</BtnWhite>
            </Link> */}
          </div>
          <div className="types_slider">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={40}
              pagination={{ clickable: true }}
              className="faqSwiper"
            >
              {data?.categories?.map((item, index) => (
                <SwiperSlide
                  className={openType === index ? "item active_item" : "item"}
                  key={index}
                  onClick={() => {
                    setOpenType(index);
                    setOpenFaq(-1);
                  }}
                >
                  {item?.title}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="sections">
            <div className="section1">
              <div className="faqs">
                {data?.items
                  ?.filter((o) => {
                    return (
                      o.category_id ===
                      get(data, `categories.${openType}.id`, [])
                    );
                  })
                  ?.map((item, index) => (
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
              <div className="btns">
                {is_all_btn ? (
                  <Link to="/faqs">
                    <BtnWhite>{t("faqs.all")}</BtnWhite>
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="section2">
              <img alt={data?.title ?? ""} src={data?.image} />
            </div>
          </div>
        </div>
      </FaqUserContainer>
    </>
  );
};

export default FaqUser;

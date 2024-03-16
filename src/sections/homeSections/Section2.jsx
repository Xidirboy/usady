import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
const Section2Style = styled.div`
  max-width: 1142px;
  padding: 30px 0;
  margin: auto;
  @media (max-width: 900px) {
    max-width: 575px;
    padding: 0;
  }
  & .title2 {
    font-size: 40px;
    font-weight: 600;
    line-height: 104px;
    letter-spacing: 0em;
    text-align: center;
    color: #fff;
    @media (max-width: 900px) {
      display: none;
    }
  }
  & .Section2Slider {
    & .item {
      width: 364px;
      padding: 30px;
      border-radius: 20px;
      background-color: #fff;
      margin-right: 20px;
      @media (max-width: 900px) {
        width: 180px;
        padding: 15px;
        border-radius: 10px;
        margin-right: 10px;
        & > img {
          width: 75px;
        }
      }
      & .item_title {
        font-size: 20px;
        font-weight: 700;
        line-height: 26px;
        letter-spacing: 0em;
        text-align: left;
        padding: 16px 0;
        @media (max-width: 900px) {
          font-size: 10px;
          line-height: 13px;
          padding: 8px 0;
        }
      }
      & .item_text {
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        @media (max-width: 900px) {
          font-size: 8px;
          line-height: 11px;
        }
      }
    }
  }
`;
const Section2 = () => {
  return (
    <Section2Style>
      <div className="title2">Как это работает ?</div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        className="Section2Slider"
        // loop={true}
      >
        <SwiperSlide className="item">
          <img src="/images/home/s21.png" alt="travel" />
          <div className="item_title">Отправляй заявку и оплати</div>
          <div className="item_text">
            Отправляй заявку онлайн и экономь время и деньги
          </div>
        </SwiperSlide>
        <SwiperSlide className="item">
          <img src="/images/home/s22.png" alt="travel" />
          <div className="item_title">Отправляй заявку и оплати</div>
          <div className="item_text">
            Отправляй заявку онлайн и экономь время и деньги
          </div>
        </SwiperSlide>
        <SwiperSlide className="item">
          <img src="/images/home/s23.png" alt="travel" />
          <div className="item_title">Отправляй заявку и оплати</div>
          <div className="item_text">
            Отправляй заявку онлайн и экономь время и деньги
          </div>
        </SwiperSlide>
      </Swiper>
    </Section2Style>
  );
};

export default Section2;

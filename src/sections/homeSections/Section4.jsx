import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
const Section4Style = styled.div`
  max-width: 1400px;
  padding: 30px 0 200px 0;
  @media (max-width: 900px) {
    padding: 15px 0 50px 0;
    max-width: 600px;
  }
  margin: auto;
  & .title2 {
    font-size: 56px;
    font-weight: 600;
    line-height: 60px;
    letter-spacing: 0em;
    text-align: center;
    color: #fff;
    max-width: 700px;
    margin: auto;
    padding-bottom: 30px;
    @media (max-width: 900px) {
      font-size: 24px;
      line-height: 25px;
      padding-bottom: 10px;
    }
  }
  & .text2 {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;
    color: #fff;
    max-width: 670px;
    margin: auto;
    padding-bottom: 50px;
    @media (max-width: 900px) {
      padding-bottom: 20px;
      font-size: 12px;
      line-height: 15px;
    }
  }
  & .Section4Slider {
    & .item {
      width: 280px;
      padding: 0px;
      @media (max-width: 900px) {
        width: 120px;
      }
      & .s1 {
        height: 140px;
        justify-content: left;
        @media (max-width: 900px) {
          height: 60px;
        }
        & img {
          width: 140px;
          @media (max-width: 900px) {
            width: 60px;
          }
        }
      }
      & .s2 {
        height: 140px;
        justify-content: right;
        margin-top: -10px;
        @media (max-width: 900px) {
          height: 60px;
        }
        & img {
          width: 140px;
          @media (max-width: 900px) {
            width: 60px;
          }
        }
      }
    }
  }
`;
const Section4 = () => {
  return (
    <Section4Style>
      <div className="title2">Операторы гарантируют безопасность</div>
      <div className="text2">
        Мы работаем только с крупными туроператорами и компания FUN&SUN
        выступает гарантом безопасной сделки
      </div>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        className="Section4Slider"
        // loop={true}
      >
        <SwiperSlide className="item">
          <div className="dc_flex s1">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
          <div className="dc_flex s2">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="item">
          <div className="dc_flex s1">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
          <div className="dc_flex s2">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="item">
          <div className="dc_flex s1">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
          <div className="dc_flex s2">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="item">
          <div className="dc_flex s1">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
          <div className="dc_flex s2">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="item">
          <div className="dc_flex s1">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
          <div className="dc_flex s2">
            <img src="/images/home/s41.png" alt="travel" />
          </div>
        </SwiperSlide>
      </Swiper>
    </Section4Style>
  );
};

export default Section4;

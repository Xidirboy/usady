import React from "react";
import { TextSliderContainer } from "../../styleComponents/sections/commonStyle/TextSliderStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const TextSlider = ({ data = {} }) => {
  return (
    <>
      <TextSliderContainer>
        <div className="card">
          <TitelBlack word={data?.title ?? ""} className="main_titel" />
          <div className="slider_t">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              className="TextSliderSlider"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay]}
            >
              {data?.items.map((item, index) => (
                <SwiperSlide className="item light_item" key={index}>
                  <div
                    className="title"
                    dangerouslySetInnerHTML={{ __html: item?.title }}
                  />
                  <div
                    className="text"
                    dangerouslySetInnerHTML={{ __html: item?.desc }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </TextSliderContainer>
    </>
  );
};

export default TextSlider;

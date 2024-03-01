import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderInfoContainer } from "../../styleComponents/sections/commonStyle/InfoStyle";
import { Autoplay } from "swiper/modules";
const SliderInfo = ({ items = [] }) => {
  return (
    <>
      <SliderInfoContainer>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="infoSlider"
          // loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
        >
          {items.map((item, index) => (
            <SwiperSlide className="item light_item" key={index}>
              <div
                className="title"
                dangerouslySetInnerHTML={{ __html: item?.title ?? "" }}
              />
              <div
                className="text"
                dangerouslySetInnerHTML={{ __html: item?.desc ?? "" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderInfoContainer>
    </>
  );
};

export default SliderInfo;

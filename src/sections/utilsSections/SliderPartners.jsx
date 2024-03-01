import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderPartnersContainer } from "../../styleComponents/sections/commonStyle/PartnersStyle";
import { Autoplay } from "swiper/modules";
const SliderPartners = ({ images = [] }) => {
  return (
    <>
      <SliderPartnersContainer>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          // loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="PartnersSlider"
        >
          {images.map((image, index) => (
            <SwiperSlide className="item light_item" key={"p_" + index}>
              <a href="#">
                <img src={image} alt="partners" />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderPartnersContainer>
    </>
  );
};

export default SliderPartners;

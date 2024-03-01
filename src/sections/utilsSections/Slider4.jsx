import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Slider4Container } from "../../styleComponents/sections/commonStyle/InsuranceTypesStyle";
import { Autoplay } from "swiper/modules";
const Slider4 = ({ items = [] }) => {
  return (
    <>
      <Slider4Container>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
        >
          {items.map((item, index) => (
            <SwiperSlide
              className={`item col${item?.fixed} light_item`}
              key={index}
            >
              <div className="section1">
                <img src={item?.image} alt={item?.title} />
              </div>
              <div className="section2">
                <div
                  className="title"
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Slider4Container>
    </>
  );
};

export default Slider4;

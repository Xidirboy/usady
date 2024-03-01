import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Slider1Container } from "../../styleComponents/sections/commonStyle/UsefulServicesStyle";
import { Autoplay } from "swiper/modules";
const Slider1 = ({ items = [] }) => {
  return (
    <>
      <Slider1Container>
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
          // loop={true}
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
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: item?.desc }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Slider1Container>
    </>
  );
};

export default Slider1;

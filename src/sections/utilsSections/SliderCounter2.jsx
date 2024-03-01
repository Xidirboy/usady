import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderCounter2Container } from "../../styleComponents/sections/commonStyle/Counter2Style";
import CountUp from "react-countup";
import { Autoplay } from "swiper/modules";
const SliderCounter2 = ({ items = [] }) => {
  return (
    <>
      <SliderCounter2Container>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="Counter2Slider"
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
              <div className="count">
                <CountUp
                  start={1}
                  end={item?.count}
                  duration={2.75}
                  className="counter2"
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </div>
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
      </SliderCounter2Container>
    </>
  );
};

export default SliderCounter2;

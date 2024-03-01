import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderCounterContainer } from "../../styleComponents/sections/commonStyle/CounterStyle";
import CountUp from "react-countup";
import { Autoplay } from "swiper/modules";
const SliderCounter = ({ items = [] }) => {
  return (
    <>
      <SliderCounterContainer>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="CounterSlider"
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
                  className="counter"
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
      </SliderCounterContainer>
    </>
  );
};

export default SliderCounter;

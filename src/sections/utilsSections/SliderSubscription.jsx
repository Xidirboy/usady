import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderSubscriptionContainer } from "../../styleComponents/sections/commonStyle/SubscriptionStyle";
import { Btn } from "../../styleComponents/GlobalStyle";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
const SliderSubscription = ({ items = [] }) => {
  return (
    <>
      <SliderSubscriptionContainer>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="subscriptionSwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
        >
          {items?.map((item, index) => (
            <SwiperSlide className="item light_item" key={index}>
              <div className="section1">
                <div
                  className="top_text"
                  dangerouslySetInnerHTML={{ __html: item?.top_title }}
                />
                <div
                  className="title"
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                />
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: item?.desc }}
                />
                <div className="btns">
                  <Link to={item?.link}>
                    <Btn className="link_btn">Поделиться мнением</Btn>
                  </Link>
                </div>
              </div>
              <div className="section2">
                <img src={item?.image} alt="item" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderSubscriptionContainer>
    </>
  );
};

export default SliderSubscription;

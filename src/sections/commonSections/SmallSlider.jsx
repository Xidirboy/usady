import React from "react";
import { SmallSliderContainer } from "../../styleComponents/sections/commonStyle/SmallSliderStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import TitelBlack from "../utilsSections/TitelBlack";

const SmallSlider = ({ data = {} }) => {
  return (
    <>
      <SmallSliderContainer>
        <div className="card">
          <div className="title_target">
            <TitelBlack word={data?.title ?? ""} />
          </div>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={16}
            pagination={{
              clickable: true,
            }}
            className="SmallSlider"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
          >
            {data?.items.map((item, index) => (
              <SwiperSlide className="item light_item" key={index}>
                <Link to={item.link}>
                  <div
                    className="title"
                    dangerouslySetInnerHTML={{ __html: item?.title }}
                  />
                  <div className="img_t">
                    <img src={item.image} alt={item?.title} />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </SmallSliderContainer>
    </>
  );
};

export default SmallSlider;

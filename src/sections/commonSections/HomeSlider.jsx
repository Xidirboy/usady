import React, { useState } from "react";
import { HomeSliderContainer } from "../../styleComponents/sections/commonStyle/HomeSliderStyle";
import TitelGreen from "../utilsSections/TitelGreen";
import Text from "../utilsSections/Text";
import { Btn } from "../../styleComponents/GlobalStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// import { Autoplay } from "swiper/modules";
import { get } from "lodash";

const HomeSlider = ({ data = {}, block_id = 0 }) => {
  const [active, setActive] = useState({
    title: data?.title ?? "",
    link: get(data, "buttons.0.link", ""),
    button_text: get(data, "buttons.0.title", ""),
    image: data?.image ?? "",
    desc: data?.desc ?? "",
  });
  return (
    <>
      <HomeSliderContainer>
        <div className="card" id={`HomeSlider${block_id}`}>
          <div className="section1">
            {data?.top_title && (
              <div
                className="top_text"
                dangerouslySetInnerHTML={{ __html: data?.top_title }}
              />
            )}
            <TitelGreen word={active?.title ?? ""} />
            <Text className="text" word={active?.desc ?? ""} />
            <div className="btns">
              {data?.buttons
                ?.filter((o) => o.status === 1)
                ?.map((btn, index) => (
                  <Link to={index === 0 ? active?.link : btn?.link} key={index}>
                    <Btn
                      className="btn"
                      style={{
                        background: btn?.background_color,
                        color: btn?.color,
                        borderColor: btn?.color,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: index === 0 ? active?.button_text : btn?.title,
                      }}
                    />
                  </Link>
                ))}
            </div>
          </div>
          <div className="section2">
            <img src={active?.image ?? ""} alt="homeSlider" />
          </div>
        </div>
        <div className="slider_t">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            className="HomeSlider"
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            // modules={[Autoplay]}
          >
            {data?.items.map((item, index) => (
              <SwiperSlide className="item light_item" key={index}>
                <div
                  onClick={() => {
                    setActive({
                      title: item?.title ?? "",
                      link: item?.link ?? "",
                      image: item?.image ?? "",
                      desc: item?.desc ?? "",
                      button_text: item?.button_text ?? "",
                    });
                    document
                      .getElementById(`HomeSlider${block_id}`)
                      .scrollIntoView();
                  }}
                >
                  <div
                    className="title"
                    dangerouslySetInnerHTML={{ __html: item?.title }}
                  />
                  <div className="img_t">
                    <img src={item.image} alt={item?.title} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </HomeSliderContainer>
    </>
  );
};

export default HomeSlider;

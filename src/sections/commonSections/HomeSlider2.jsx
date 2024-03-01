import React from "react";
import { HomeSlider2Container } from "../../styleComponents/sections/commonStyle/HomeSlider2Style";
import TitelGreen from "../utilsSections/TitelGreen";
import Text from "../utilsSections/Text";
import { Btn } from "../../styleComponents/GlobalStyle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";

const HomeSlider2 = ({ data = {} }) => {
  return (
    <>
      <HomeSlider2Container>
        <div className="card">
          <div className="section1">
            {data?.top_title && (
              <div
                className="top_text"
                dangerouslySetInnerHTML={{ __html: data?.top_title }}
              />
            )}
            <TitelGreen word={data?.title ?? ""} />
            <Text className="text" word={data?.desc ?? ""} />
            <div className="btns">
              {data?.buttons
                ?.filter((o) => o.status === 1)
                ?.map((btn, index) => (
                  <Link to={btn?.link} key={index}>
                    <Btn
                      className="btn"
                      style={{
                        background: btn?.background_color,
                        color: btn?.color,
                        borderColor: btn?.color,
                      }}
                      dangerouslySetInnerHTML={{ __html: btn?.title }}
                    />
                  </Link>
                ))}
            </div>
          </div>
          <div className="section2">
            <img src={data?.image ?? ""} alt="homeSlider" />
          </div>
        </div>
        <div className="slider_t">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            className="HomeSlider2"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
          >
            {data?.items.map((item, index) => (
              <SwiperSlide className="item light_item" key={index}>
                <Link to={item.link} className="link">
                  <div className="text">
                    <div
                      className="title"
                      dangerouslySetInnerHTML={{ __html: item?.title }}
                    />
                    <div
                      className="word"
                      dangerouslySetInnerHTML={{ __html: item?.desc }}
                    />
                  </div>
                  <div className="img_t">
                    <img src={item.image} alt={item?.title} />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </HomeSlider2Container>
    </>
  );
};

export default HomeSlider2;

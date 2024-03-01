import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderNewsContainer } from "../../styleComponents/sections/commonStyle/NewsSectionStyle";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { IMG_URL } from "../../utils/api";
import Moment from "react-moment";
const SliderNews = ({ items }) => {
  return (
    <>
      <SliderNewsContainer>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="newsSlider"
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
        >
          {items?.map((item, index) => (
            <SwiperSlide className="item" key={index}>
              <Link to={`/news/${item?.slug}`}>
                <div
                  className="image"
                  style={{
                    backgroundImage: "url('" + IMG_URL + item?.image + "')",
                  }}
                ></div>
                <div className="date">
                  <Moment format="DD.MM.YYYY">{item?.created_at}</Moment>
                </div>
                <div className="name">{item?.title}</div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderNewsContainer>
    </>
  );
};

export default SliderNews;

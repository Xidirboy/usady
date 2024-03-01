import React, { Suspense, lazy } from "react";
import { ActionVideoContainer } from "../../styleComponents/sections/commonStyle/ActionVideoStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const VideoPlyr = lazy(() => import("../utilsSections/VideoPlyr"));
const ActionVideo = ({ data = {} }) => {
  return (
    <>
      <ActionVideoContainer>
        <TitelBlack word={data?.title ?? ""} className="main_titel" />
        <div className="card">
          <div className="slider_target">
            <Swiper
              slidesPerView={"auto"}
              spaceBetween={0}
              pagination={{
                clickable: true,
              }}
              className="vActionSwiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              modules={[Autoplay]}
            >
              {data?.items?.map((item, index) => (
                <SwiperSlide className="item" key={index}>
                  <div className="section">
                    <div className="s2">
                      <div className="points_l">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="img_target">
                        <img src={item?.image} alt={item?.title} />
                      </div>
                      <div className="points_r">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
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
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="video_target">
            <div className="video_container">
              <div
                className="title"
                dangerouslySetInnerHTML={{ __html: data?.video_title }}
              />
              <div>
                <Suspense>
                  <VideoPlyr source={data?.video} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </ActionVideoContainer>
    </>
  );
};

export default ActionVideo;

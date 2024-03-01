import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { API_URL } from "../../utils/api";

const VideoHistory = lazy(() => import("./VideoHistory"));

const HistoryShowSliderStyle = styled.div`
  /* padding: 0px calc(50% - 640px); */
  user-select: none;
  & .HistoryShowSlider {
    .swiper {
      width: 100%;
      padding-top: 50px;
      padding-bottom: 50px;
    }
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 100%;
      max-width: 400px;
      height: calc(100vh - 80px);
      display: flex;
      align-items: center;
      justify-content: center;
      & .h_item {
        height: 85%;
        width: 100%;
        transition: height 0.5s ease;
        /* background-color: red; */
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.swiper-slide-active {
        & .h_item {
          height: 100%;
        }
      }
    }
    .swiper-slide img {
      display: block;
      width: 100%;
    }
  }
`;
const HistoryShowSlider = ({ items = [], isOpen }) => {
  const swiperRef = useRef(null);
  const activeRef = useRef(null);
  const [active, setActive] = useState(isOpen - 1);
  useEffect(() => {
    swiperRef?.current?.swiper?.slideTo(isOpen - 1);
  }, [isOpen]);
  return (
    <HistoryShowSliderStyle>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={0}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className="HistoryShowSlider"
        ref={swiperRef}
        onSlideChange={(e) => {
          console.log("change_slide", e.realIndex);

          clearTimeout(activeRef.current);
          activeRef.current = setTimeout(() => {
            setActive(e.realIndex);
          }, 500);
        }}
      >
        {items?.map((item, index) => (
          <SwiperSlide
            key={index}
            onClick={() => swiperRef?.current?.swiper?.slideTo(index)}
          >
            <div className="h_item">
              <Suspense>
                <VideoHistory
                  source={
                    item?.video === `${API_URL}/storage/`
                      ? "/videos/video.mp4"
                      : item?.video
                  }
                  poster={item?.image}
                  is_play={index === active}
                />
              </Suspense>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </HistoryShowSliderStyle>
  );
};

export default HistoryShowSlider;

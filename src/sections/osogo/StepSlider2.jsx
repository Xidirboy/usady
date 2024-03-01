import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

const StepStyle = styled.div`
  & > .slider_target {
    padding: 16px 0;
    & .vActionSwiper {
      cursor: grab;
      & .item {
        width: 20%;
        /* @media (max-width: 1180px) {
          width: 270px;
        } */
        @media (max-width: 370px) {
          width: 90px;
        }
        & > .section {
          & > .s2 {
            display: flex;
            align-items: center;
            justify-content: center;
            & > .img_target {
              width: 70px;
              min-width: 70px;
              height: 70px;
              border-radius: 50%;
              background: rgba(45, 55, 77, 0.2);
              /* background: #00aa58; */
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 5px;
              @media (max-width: 786px) {
                width: 50px;
                min-width: 50px;
                height: 50px;
                margin: 0 3px;
              }
              & > svg {
                width: 50%;
                height: auto;
              }
            }
            & > .points_l,
            & > .points_r {
              padding: 0 3px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              @media (max-width: 1100px) {
                padding: 0 1px;
              }
              @media (max-width: 1000px) {
                display: none;
              }
              @media (max-width: 900px) {
                /* padding: 0 2px; */
                display: none;
              }
              @media (max-width: 660px) {
                display: none;
              }
              & > span {
                background: rgba(45, 55, 77, 0.2);
                height: 10px;
                width: 10px;
                border-radius: 50%;
                @media (max-width: 900px) {
                  &:last-child {
                    display: none;
                  }
                }
                /* @media (max-width: 786px) {
                  &:first-child {
                    display: none;
                  }
                } */
              }
            }
          }
          & > .text {
            & > .title {
              /* color: #000; */
              color: rgba(45, 55, 77, 0.2);
              text-align: center;
              font-size: 20px;
              font-style: normal;
              font-weight: 700;
              line-height: 27px; /* 135% */
              letter-spacing: 1px;
              padding: 16px 6px;
              @media (max-width: 786px) {
                font-size: 16px;
                line-height: 20px;
                padding: 16px 3px;
              }
              @media (max-width: 500px) {
                font-size: 12px;
                line-height: 16px;
                padding: 8px 1px;
              }
            }
          }
          &.section_active {
            & .img_target {
              background: #00aa58;
            }
            & .title {
              color: #000;
            }
          }
        }
        &:first-child {
          & .points_l {
            & span {
              background: transparent !important;
            }
          }
        }
        &:last-child {
          & .points_r {
            & span {
              background: transparent !important;
            }
          }
        }
      }
    }
  }
`;
const iconCheck = (
  <svg
    width="34"
    height="24"
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M33.21 0.774756C32.158 -0.258578 30.4498 -0.257926 29.3964 0.774756L12.2328 17.6126L4.60425 10.1293C3.55088 9.09595 1.84339 9.09595 0.790025 10.1293C-0.263342 11.1626 -0.263342 12.8376 0.790025 13.871L10.3252 23.2248C10.8516 23.7412 11.5418 24 12.232 24C12.9223 24 13.6131 23.7418 14.1395 23.2248L33.21 4.51637C34.2633 3.48375 34.2633 1.80802 33.21 0.774756Z"
      fill="white"
    />
  </svg>
);
const StepSlider = ({ data }) => {
  const [swiperOBJ, setSwiperOBJ] = useState(null);
  const slideTo = (index) => swiperOBJ?.slideTo(index);
  useEffect(() => {
    slideTo(data?.step - 3);
  }, [data?.step]);
  return (
    <StepStyle>
      <div className="slider_target">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          className="vActionSwiper"
          onSwiper={setSwiperOBJ}
        >
          {data?.items?.map((item, index) => (
            <SwiperSlide className="item" key={index}>
              <div
                className={
                  (data?.step ?? 0) > index
                    ? "section section_active"
                    : "section"
                }
              >
                <div className="s2">
                  <div className="points_l">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="img_target">{iconCheck}</div>
                  <div className="points_r">
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
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </StepStyle>
  );
};

export default StepSlider;

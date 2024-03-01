import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderDocsContainer } from "../../styleComponents/sections/commonStyle/DocsStyle";
import { Autoplay } from "swiper/modules";
const SliderDocs = ({ items = [] }) => {
  return (
    <>
      <SliderDocsContainer>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="DocsSlider"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
        >
          {items.map((item, index) => (
            <SwiperSlide className="item light_item" key={"p_" + index}>
              <a href={item?.file ?? "#"}>
                <img src={"/images/docs.svg"} alt={item?.title} />
                <div dangerouslySetInnerHTML={{ __html: item?.title ?? "" }} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderDocsContainer>
    </>
  );
};

export default SliderDocs;

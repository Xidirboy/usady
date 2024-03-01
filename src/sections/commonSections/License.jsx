import React from "react";
import LicenseContainer from "../../styleComponents/sections/commonStyle/LicenseStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";

const License = ({ data = {} }) => {
  return (
    <LicenseContainer>
      <div className="card">
        <div className="section1">
          <TitelBlack word={data?.title ?? ""} />
          <div className="lines">
            <div className="line1"></div>
            <div className="line2"></div>
          </div>

          <div className="items">
            {data?.items?.map((item, index) => (
              <div className="item" key={index}>
                <div className="year">{item?.year ?? ""}</div>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="section2">
          <Swiper
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Navigation, Pagination]}
            className="LicenseSwiper"
          >
            {data?.images?.map((image, index) => (
              <SwiperSlide key={index} className="image_item">
                <img src={image} alt={data?.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </LicenseContainer>
  );
};

export default License;

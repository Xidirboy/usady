import React, { useRef } from "react";
import MapCardContainer from "../../styleComponents/sections/commonStyle/MapCardStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import OfficeMapSection2 from "./OfficeMapSection2";

const MapCard = ({ data = {} }) => {
  const ymapsRef = useRef(null);
  const handlePoint = (index) => {
    const placemark = ymapsRef.current?.geoObjects.get(index);
    if (placemark && !placemark.balloon.isOpen()) {
      placemark.balloon.open();
    }
  };
  return (
    <MapCardContainer>
      <div className="card">
        <div className="section1">
          <TitelBlack word={data?.title ?? ""} />
          <div className="lines">
            <div className="line1"></div>
            <div className="line2"></div>
          </div>
          <div className="items">
            {data?.items?.map((item, index) => (
              <div
                className="item"
                key={index}
                onClick={() => handlePoint(index)}
              >
                <div
                  className="year"
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                />
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: item?.desc }}
                />
                <div
                  className="phone"
                  dangerouslySetInnerHTML={{ __html: item?.phone }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="section2">
          {data?.items?.length ? (
            <OfficeMapSection2 items={data?.items ?? []} ymapsRef={ymapsRef} />
          ) : null}
        </div>
      </div>
    </MapCardContainer>
  );
};

export default MapCard;

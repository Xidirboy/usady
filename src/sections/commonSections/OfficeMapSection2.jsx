import { Map, Placemark, YMaps } from "react-yandex-maps";
import { OfficeMapContainer } from "../../styleComponents/sections/commonStyle/OfficeMapStyle";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const OfficeMapSection2 = ({ items = [], className = "", ymapsRef = null }) => {
  const { t } = useTranslation();
  const calculateBoundingBox = () => {
    const lats = items.map((item) => item?.lat);
    const longs = items.map((item) => item?.long);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLong = Math.min(...longs);
    const maxLong = Math.max(...longs);

    const center = [(minLat + maxLat) / 2, (minLong + maxLong) / 2];
    const bounds = [
      [minLat, minLong],
      [maxLat, maxLong],
    ];

    return { center, bounds };
  };

  const { center, bounds } = calculateBoundingBox();
  return (
    <OfficeMapContainer className={className}>
      <div className="card">
        <YMaps
          query={{
            apikey: "fc3fa54d-c535-4eee-b905-e2098aa91967",
          }}
        >
          <div style={{ width: "100%", height: "70vh" }}>
            <Map
              instanceRef={(map) => (ymapsRef.current = map)}
              defaultState={{
                center: center,
                bounds: bounds,
                // controls: ["zoomControl", "fullscreenControl"],
              }}
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
            >
              {items.map((item, index) => (
                <Placemark
                  geometry={[item?.lat, item?.long]}
                  key={index}
                  modules={["geoObject.addon.balloon"]}
                  properties={{
                    balloonContentHeader: item?.title,
                    balloonContentBody: item?.desc,
                    balloonContentFooter: item?.phone,
                  }}
                  options={{
                    iconLayout: "default#image",
                    iconImageHref: "/images/mapIcon.svg",
                    iconImageSize: [32, 32],
                    iconImageOffset: [-16, -16],
                  }}
                />
              ))}
            </Map>
          </div>
        </YMaps>
      </div>
    </OfficeMapContainer>
  );
};

export default OfficeMapSection2;

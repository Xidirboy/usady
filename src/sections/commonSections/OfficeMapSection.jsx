import React, { useEffect, useState } from "react";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { OfficeMapContainer } from "../../styleComponents/sections/commonStyle/OfficeMapStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import Text from "../utilsSections/Text";
import Axios from "../../utils/httpClient";
import Loading from "../utilsSections/Loading";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const OfficeMapSection = ({ className = "" }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [locations, setLocation] = useState([]);
  useEffect(() => {
    getOffice();
  }, []);

  const getOffice = () => {
    setLoading(true);
    Axios()
      .get(`api/v1/location/list`)
      .then((r) => {
        setLocation(r?.data?.data ?? []);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <OfficeMapContainer className={className}>
      <div className="card">
        <TitelBlack word={`<b>${t("profile.office")}</b>`} />
        <Text word={t("profile.office_text")} />
        {loading ? (
          <Loading />
        ) : (
          <YMaps
            query={{
              apikey: "fc3fa54d-c535-4eee-b905-e2098aa91967",
            }}
          >
            <div style={{ width: "100%", height: "70vh" }}>
              <Map
                defaultState={{
                  center: [
                    get(locations, "0.lat", 41.2995),
                    get(locations, "0.long", 69.2401),
                  ],
                  zoom: 9,
                }}
                style={{ width: "100%", height: "100%", borderRadius: 20 }}
              >
                {locations.map((item, index) => (
                  <Placemark
                    geometry={[item?.lat, item?.long]}
                    key={index}
                    modules={["geoObject.addon.balloon"]}
                    properties={{
                      balloonContentHeader: item?.title,
                      balloonContentBody: ``,
                      balloonContentFooter: "",
                    }}
                  />
                ))}
              </Map>
            </div>
          </YMaps>
        )}
      </div>
    </OfficeMapContainer>
  );
};

export default OfficeMapSection;

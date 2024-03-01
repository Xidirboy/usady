import React from "react";
import { MobileAppContainer } from "../../styleComponents/sections/commonStyle/MobileAppStyle";
import TitelBlack from "../utilsSections/TitelBlack";

const MobileApp = ({ data = {} }) => {
  return (
    <>
      <MobileAppContainer>
        <TitelBlack word={data?.big_title ?? ""} className="main_titel" />
        <div className="card">
          <div className="section1 light_item">
            <div
              className="title"
              dangerouslySetInnerHTML={{ __html: data?.title ?? "" }}
            />
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: data?.small_title ?? "" }}
            />
            <div className="items">
              {data?.items?.map((item, index) => (
                <div className="item" key={index}>
                  <img src={item?.image} alt={data?.title ?? ""} />
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.title ?? "" }}
                  />
                </div>
              ))}
            </div>
            <div className="store">
              {data?.link_apple && (
                <a className="app_store" href={data?.link_apple}>
                  <img
                    src="/images/mobile_apps/app_store.svg"
                    alt="app_store inson"
                  />
                </a>
              )}
              {data?.link_google && (
                <a className="play_market" href={data?.link_google}>
                  <img
                    src="/images/mobile_apps/play_market.svg"
                    alt="play_market inson"
                  />
                </a>
              )}
            </div>
          </div>
          <div className="section2">
            <div className="qr_target">
              <img
                src={data?.qr_code}
                alt={data?.qr_text ?? ""}
                className="qr_code"
              />
              <div
                className="text"
                dangerouslySetInnerHTML={{ __html: data?.qr_text ?? "" }}
              />
            </div>
            <div className="phone_target">
              <img
                src={data?.image}
                alt={data?.qr_text ?? ""}
                className="phone"
              />
            </div>
          </div>
        </div>
      </MobileAppContainer>
    </>
  );
};

export default MobileApp;

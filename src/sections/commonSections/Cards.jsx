import React from "react";
import { CardsContainer } from "../../styleComponents/sections/commonStyle/CardsStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { BtnWhite } from "../../styleComponents/GlobalStyle";
import { Link } from "react-router-dom";

const Cards = ({ data = {} }) => {
  return (
    <>
      <CardsContainer>
        <TitelBlack word={data?.title ?? ""} className="main_titel" />
        <div className="cards">
          <div className="s1">
            <div className="item light_item">
              <div className="section1 ">
                <div
                  className="top_text"
                  dangerouslySetInnerHTML={{ __html: data?.top_title ?? "" }}
                />
                <div
                  className="title"
                  dangerouslySetInnerHTML={{ __html: data?.card_title ?? "" }}
                />
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: data?.desc ?? "" }}
                />
                <div className="btns">
                  <Link to={data?.link ?? "#"}>
                    <BtnWhite
                      dangerouslySetInnerHTML={{
                        __html: data?.button_text ?? "",
                      }}
                    />
                  </Link>
                </div>
              </div>
              <div className="section2">
                <img src={data?.image} alt={data?.title} />
              </div>
            </div>
          </div>
          <div className="s2">
            {data?.items?.map((item, index) => (
              <div className="word light_item" key={index}>
                <div className="top">
                  <div
                    className="top_text"
                    dangerouslySetInnerHTML={{ __html: item?.top_title ?? "" }}
                  />
                </div>
                <div
                  className="title"
                  dangerouslySetInnerHTML={{ __html: item?.title ?? "" }}
                />
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: item?.desc ?? "" }}
                />
                <Link
                  to={item?.link ?? "#"}
                  className="link"
                  dangerouslySetInnerHTML={{
                    __html: item?.button_text ?? "",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </CardsContainer>
    </>
  );
};

export default Cards;

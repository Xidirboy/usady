import React from "react";
import { CashbackContainer } from "../../styleComponents/sections/commonStyle/CashbackStyle";
import TitelBlack from "../utilsSections/TitelBlack";
import { get } from "lodash";

const Cashback = ({ data = {} }) => {
  return (
    <>
      <CashbackContainer>
        <div className="card">
          <div className="section1">
            <TitelBlack word={data?.title} />
          </div>
          <div className="section2">
            <div className="row">
              {get(data, "items.0", false) && (
                <div className="card card1 light_item">
                  <div className="d_target">
                    <div className="discount">
                      -{get(data, "items.0.deduction", "")}%
                    </div>
                  </div>
                  <div className="img_t">
                    <img
                      src={get(data, "items.0.image", "")}
                      alt={get(data, "items.0.title", "")}
                    />
                  </div>
                  <div
                    className="word"
                    dangerouslySetInnerHTML={{
                      __html: get(data, "items.0.title", ""),
                    }}
                  />
                </div>
              )}
              {get(data, "items.1", false) && (
                <div className="card card2 light_item">
                  <div className="d_target">
                    <div className="discount">
                      -{get(data, "items.1.deduction", "")}%
                    </div>
                  </div>
                  <div className="img_t">
                    <img
                      src={get(data, "items.1.image", "")}
                      alt={get(data, "items.1.title", "")}
                    />
                  </div>
                  <div
                    className="word"
                    dangerouslySetInnerHTML={{
                      __html: get(data, "items.1.title", ""),
                    }}
                  />
                </div>
              )}
            </div>
            <div className="row">
              {get(data, "items.2", false) && (
                <div className="card card3 light_item">
                  <div className="d_target">
                    <div className="discount">
                      -{get(data, "items.2.deduction", "")}%
                    </div>
                  </div>
                  <div className="img_t">
                    <img
                      src={get(data, "items.2.image", "")}
                      alt={get(data, "items.2.title", "")}
                    />
                  </div>
                  <div
                    className="word"
                    dangerouslySetInnerHTML={{
                      __html: get(data, "items.2.title", ""),
                    }}
                  />
                </div>
              )}
              {get(data, "items.3", false) && (
                <div className="card card4 light_item">
                  <div className="d_target">
                    <div className="discount">
                      -{get(data, "items.3.deduction", "")}%
                    </div>
                  </div>
                  <div className="img_t">
                    <img
                      src={get(data, "items.3.image", "")}
                      alt={get(data, "items.3.title", "")}
                    />
                  </div>
                  <div
                    className="word"
                    dangerouslySetInnerHTML={{
                      __html: get(data, "items.3.title", ""),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </CashbackContainer>
    </>
  );
};

export default Cashback;

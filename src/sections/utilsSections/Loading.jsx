import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

const loadAnimation = keyframes`
 0% { width: 200px; opacity: 1; }
 25% {width: 250px; opacity: 0.8; }
 50% { width: 200px; opacity: 0.6; }
 75% {width: 250px; opacity: 0.8; }
 100% {width: 200px; opacity: 1; }
`;

const LoadingStyle = styled.div`
  min-height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > .block {
    & > .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        width: 135px;
        height: 135px;
        animation-name: ${loadAnimation};
        animation-duration: 1s;
        animation-iteration-count: infinite;
      }
    }
    & > .titel {
      color: #181818;
      text-align: center;
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      letter-spacing: 1.5px;
      padding: 60px 0 10px 0;
    }
    & > .percent {
      color: #00aa58;
      text-align: center;
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      letter-spacing: 1.5px;
      padding-bottom: 20px;
    }
    & > .load_t {
      width: 430px;
      margin: auto;
      max-width: 80%;
      height: 7.818px;
      flex-shrink: 0;
      border-radius: 90px;
      background: rgba(85, 108, 130, 0.3);
      @media (max-width: 500px) {
        width: 300px;
      }
      & > .load {
        border-radius: 90px;
        background: #3648aa;
        transition: width 0.5s ease-out;
        height: 7.818px;
        flex-shrink: 0;
      }
    }
  }
`;

const Loading = ({is_loading = -1, show_persent = true}) => {
  const { t } = useTranslation();
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    if (is_loading === true) {
      setPercent(0);
    }
    const interval = setInterval(() => {
      setPercent((prevPercent) => {
        const newPercent = prevPercent + Math.floor(Math.random() * 30);
        return newPercent < 100 ? newPercent : prevPercent;
      });
    }, 100);
    return () => {
      // setPercent(100);
      clearInterval(interval);
    };
  }, [is_loading]);
  return (
    <>
      <LoadingStyle>
        <div className="block">
          <div className="icon">
            <img src="/images/logoH.svg" alt="Loading..." />
          </div>
          {show_persent ? (
            <>
              <div className="titel">{t("head.loading")}</div>
              <div className="percent">{percent}%</div>
              <div className="load_t">
                <div className="load" style={{ width: `${percent}%` }}></div>
              </div>
            </>
          ) : null}
        </div>
      </LoadingStyle>
    </>
  );
};

export default Loading;

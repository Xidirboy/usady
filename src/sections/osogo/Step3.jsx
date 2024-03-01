import React from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import { get } from "lodash";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Step3Style = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  & .step3_target {
    max-width: 880px;
    width: 100%;
    & .head {
      & div {
        text-align: center;
      }
    }
    & .s3_row {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      &:last-child {
        border-bottom: none;
      }
      & .s3_title {
        color: #181818;
        font-size: 22px;
        font-style: normal;
        font-weight: 700;
        line-height: 25px;
        letter-spacing: 1.1px;
        padding: 20px 0 10px 0;
      }
      & .s3_items {
        padding-bottom: 20px;
        & .s3_item {
          display: flex;
          padding: 10px 20px;
          &:nth-child(odd) {
            background-color: #eff2fb;
          }
          & .s3_item_title {
            color: #000;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 27px;
            letter-spacing: 0.9px;
            flex: 1;
          }
          & .s3_item_value {
            color: #5b5a5a;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 27px;
            flex: 2;
          }
        }
      }
    }
    & .is_error {
      color: red;
      padding: 20px 0;
    }
    & .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 10px;
      & button {
        padding: 16px 20px;
        margin: 10px;
      }
    }
  }
`;
const Step3 = ({ data = {}, setStep, setInsuranceData, insuranceData }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [errors, setErrors] = useState("");
  const createMerchant = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .get(`api/v1/osogo/merchant-info?anketa_id=${data?.anketa_id}`)
      .then((r) => {
        if (r?.data?.status === 1) {
          setInsuranceData({
            ...insuranceData,
            step3_result: r?.data?.data ?? "",
          });
          setStep(4);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          setErrors(r?.data?.message ?? t("auth.system_err"));
        }
      })
      .catch((e) => {
        setErrors(e?.response?.data?.message ?? t("auth.system_err"));
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  return (
    <Step3Style>
      <Forma className="step3_target" title={t("osogo_step3.title")}>
        <div className="s3_row">
          <div className="s3_title">{t("osogo_step3.subtitle")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.full_name")}</div>
              <div className="s3_item_value">
                {`${get(data, "data.owner_name", "")} ${get(
                  data,
                  "data.owner_surname",
                  ""
                )} ${get(data, "data.owner_patronym", "")}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.passport")}</div>
              <div className="s3_item_value">
                {`${get(data, "data.owner_pasp_sery", "")}  ${get(
                  data,
                  "data.owner_pasp_num",
                  ""
                )}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.pinfl")}</div>
              <div className="s3_item_value">
                {`${get(data, "data.owner_pinfl", "")}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.birthdate")}</div>
              <div className="s3_item_value">
                {`${get(data, "data.owner_birthdate", "")}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.phone")}</div>
              <div className="s3_item_value">
                {`${get(data, "data.owner_phone", "")}`}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">{t("osogo_step3.subtitle2")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.vmodel")}</div>
              <div className="s3_item_value">
                {get(data, "data.vmodel", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.year")}</div>
              <div className="s3_item_value">{get(data, "data.year", "")}</div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.renumber")}</div>
              <div className="s3_item_value">
                {get(data, "data.renumber", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.kuzov")}</div>
              <div className="s3_item_value">{get(data, "data.kuzov", "")}</div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.dvigatel")}</div>
              <div className="s3_item_value">
                {get(data, "data.dvigatel", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("osogo_step3.texpass")}</div>
              <div className="s3_item_value">{`${get(
                data,
                "data.texpsery",
                ""
              )} ${get(data, "data.texpnumber", "")} (${get(
                data,
                "data.texpdate",
                ""
              )})`}</div>
            </div>
          </div>
        </div>
        {get(data, "data.drivers", []).map((item, index) => (
          <div className="s3_row" key={index}>
            <div className="s3_title">
              {t("osogo_step3.driver")} {index + 1}
            </div>
            <div className="s3_items">
              <div className="s3_item">
                <div className="s3_item_title">
                  {t("osogo_step3.full_name")}
                </div>
                <div className="s3_item_value">
                  {`${get(item, "name", "")}  ${get(
                    item,
                    "surname",
                    ""
                  )} ( ${get(item, "relative", "")})`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">{t("osogo_step3.passport")}</div>
                <div className="s3_item_value">
                  {`${get(item, "paspsery", "")}  ${get(
                    item,
                    "paspnumber",
                    ""
                  )}`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">{t("osogo_step3.pinfl")}</div>
                <div className="s3_item_value">
                  {`${get(item, "pinfl", "")}`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">
                  {t("osogo_step3.birthdate")}
                </div>
                <div className="s3_item_value">
                  {`${get(item, "datebirth", "")}`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">{t("osogo_step3.licsery")}</div>
                <div className="s3_item_value">
                  {`${get(item, "licsery", "")} ${get(
                    item,
                    "licnumber",
                    ""
                  )} (${get(item, "licdate", "")})`}
                </div>
              </div>
            </div>
          </div>
        ))}
        {errors ? <div className="is_error">{errors}</div> : null}
        <div className="btns">
          <Btn onClick={() => createMerchant()}>{t("osogo_step3.btn1")}</Btn>
          <BtnWhite onClick={() => setStep(2)}>
            {t("osogo_step3.btn2")}
          </BtnWhite>
        </div>
      </Forma>
    </Step3Style>
  );
};

export default Step3;

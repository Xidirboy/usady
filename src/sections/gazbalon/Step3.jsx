import React from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import { filter, first, get } from "lodash";
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
const Step3 = ({
  data = {},
  setStep,
  setInsuranceData,
  insuranceData, 
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [errors, setErrors] = useState("");
  const createMerchant = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .get(`api/v1/gazbalon/merchant-info?anketa_id=${data?.anketa_id}`)
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
      <Forma className="step3_target" title={t("gaz_balon_step3.title")}>
        <div className="s3_row">
          <div className="s3_title">{t("gaz_balon_step3.subtitle")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.reg_number")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.vehicle.reg_number", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("gaz_balon_step3.tech")}</div>
              <div className="s3_item_value">
                {`${get(data, "data.vehicle.tech_seria", "")}${get(
                  data,
                  "data.vehicle.tech_number",
                  ""
                )}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.tech_date")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.vehicle.tech_date", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.body_number")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.vehicle.body_number", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.engine_number")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.vehicle.engine_number", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.avto_year")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.vehicle.year", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.model_name")}
              </div>
              <div className="s3_item_value">
                {get(insuranceData, "step1_result.model_name", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.orgname")}
              </div>
              <div className="s3_item_value">
                {get(insuranceData, "step1_result.orgname", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("gaz_balon_step3.pinfl")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step1_result.pinfl", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.date_reg")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.s_date", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.promo_code")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.promo_code", "")}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">{t("gaz_balon_step3.subtitle2")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.passport")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.beneficiary.passport", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("gaz_balon_step3.pinfl")}</div>
              <div className="s3_item_value">
                {get(data, "data.beneficiary.pinfl", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("gaz_balon_step3.inn")}</div>
              <div className="s3_item_value">
                {get(data, "data.beneficiary.inn", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.full_name")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.beneficiary.full_name", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.birth_date")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.beneficiary.birth_date", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("gaz_balon_step3.phone")}</div>
              <div className="s3_item_value">
                {get(data, "data.beneficiary.phone", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.address")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.beneficiary.address", "")}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">{t("gaz_balon_step3.subtitle3")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.passport")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.insurant.passport", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("gaz_balon_step3.pinfl")}</div>
              <div className="s3_item_value">
                {get(data, "data.insurant.pinfl", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("gaz_balon_step3.inn")}</div>
              <div className="s3_item_value">
                {get(data, "data.insurant.inn", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.full_name")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.insurant.full_name", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.birth_date")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.insurant.birth_date", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("gaz_balon_step3.phone")}</div>
              <div className="s3_item_value">
                {get(data, "data.insurant.phone", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("gaz_balon_step3.address")}
              </div>
              <div className="s3_item_value">
                {get(data, "data.insurant.address", "")}
              </div>
            </div>
          </div>
        </div>
        {errors ? <div className="is_error">{errors}</div> : null}
        <div className="btns">
          <Btn onClick={() => createMerchant()}>
            {t("gaz_balon_step3.btn1")}
          </Btn>
          <BtnWhite onClick={() => setStep(2)}>
            {t("gaz_balon_step3.btn2")}
          </BtnWhite>
        </div>
      </Forma>
    </Step3Style>
  );
};

export default Step3;

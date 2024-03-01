import React from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import { get } from "lodash";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorShow from "../formSections/ErrorShow";

const Step_6Style = styled.div`
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
const Step_6 = ({
  insuranceCreate,
  setStep,
  step,
  setInsuranceData,
  insuranceData,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [errors, setErrors] = useState("");

  return (
    <Step_6Style>
      {/* {console.log("setInsuranceData:", insuranceData)} */}
      <Forma
        className="step3_target"
        title={t("_osogo_s6.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        <div className="s3_row">
          <div className="s3_title">{t("_osogo_s6.subtitle")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.full_name")}</div>
              <div className="s3_item_value">
                {`${get(
                  insuranceData,
                  "step2_owner.LAST_NAME_LATIN",
                  ""
                )} ${get(
                  insuranceData,
                  "step2_owner.FIRST_NAME_LATIN",
                  ""
                )} ${get(insuranceData, "step2_owner.MIDDLE_NAME_LATIN", "")}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.passport")}</div>
              <div className="s3_item_value">
                {`${get(insuranceData, "step2.owner_pasp_sery", "")}  ${get(
                  insuranceData,
                  "step2.owner_pasp_num",
                  ""
                )}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.pinfl")}</div>
              <div className="s3_item_value">
                {`${get(insuranceData, "step2_result.PINFL", "")}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.phone")}</div>
              <div className="s3_item_value">
                {`${get(insuranceData, "step2.owner_phone", "")}`}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">{t("_osogo_s6.subtitle2")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.vmodel")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2_result.MODEL_NAME", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.year")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2_result.ISSUE_YEAR", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.renumber")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2.gov_number", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.kuzov")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2_result.BODY_NUMBER", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.dvigatel")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2_result.ENGINE_NUMBER", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_osogo_s6.texpass")}</div>
              <div className="s3_item_value">{`${get(
                insuranceData,
                "step2.tech_passport_seria",
                ""
              )} ${get(insuranceData, "step2.tech_passport_number", "")} (${get(
                insuranceData,
                "step2_result.TECH_PASSPORT_ISSUE_DATE",
                ""
              )})`}</div>
            </div>
          </div>
        </div>
        {get(insuranceData, "drivers", []).map((item, index) => (
          <div className="s3_row" key={index}>
            <div className="s3_title">
              {t("_osogo_s6.driver")} {index + 1}.
            </div>
            <div className="s3_items">
              <div className="s3_item">
                <div className="s3_item_title">{t("_osogo_s6.full_name")}</div>
                <div className="s3_item_value">
                  {`${get(item, "result.LAST_NAME_LATIN", "")} ${get(
                    item,
                    "result.FIRST_NAME_LATIN",
                    ""
                  )}  ${get(item, "result.MIDDLE_NAME_LATIN", "")}`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">{t("_osogo_s6.passport")}</div>
                <div className="s3_item_value">
                  {`${get(item, "paspsery", "")}  ${get(
                    item,
                    "paspnumber",
                    ""
                  )}`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">{t("_osogo_s6.pinfl")}</div>
                <div className="s3_item_value">
                  {`${get(item, "pinfl", "")}`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">{t("_osogo_s6.licsery")}</div>
                <div className="s3_item_value">
                  {`${get(item, "result.LICENSE_SERIA", "")} ${get(
                    item,
                    "result.LICENSE_NUMBER",
                    ""
                  )} (${get(item, "result.ISSUE_DATE", "")})`}
                </div>
              </div>
            </div>
          </div>
        ))}
        {errors ? <ErrorShow show_error={errors} errorText={errors} /> : null}
        <div className="btns">
          <Btn onClick={() => insuranceCreate()}>{t("_osogo_s6.btn1")}</Btn>
          <BtnWhite onClick={() => setStep(step - 1)}>
            {t("_osogo_s6.btn2")}
          </BtnWhite>
        </div>
      </Forma>
    </Step_6Style>
  );
};

export default Step_6;

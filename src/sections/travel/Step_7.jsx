import React from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import { filter, first, get } from "lodash";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ErrorShow from "../formSections/ErrorShow";

const Step_7Style = styled.div`
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
const Step_7 = ({
  data = {},
  step,
  setStep,
  setInsuranceData,
  insuranceData,
  programs,
  abroadActivity,
  abroadType,
  multiDays,
  insuranceCreate,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [errors, setErrors] = useState("");

  return (
    <Step_7Style>
      <Forma
        className="step3_target"
        title={t("_travel_s7.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        <div className="s3_row">
          <div className="s3_title">{t("_travel_s7.subtitle")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.countries")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step1.countrys", []).map((c, cindex) => (
                  <span key={cindex} style={{ paddingRight: 10 }}>
                    {cindex > 0 ? ", " : ""}
                    {c?.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.activity_id")}</div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(abroadActivity, (o) => {
                      return (
                        o?.id ===
                        parseInt(get(insuranceData, "step1.activity_id", "-1"))
                      );
                    })
                  ),
                  "name",
                  ""
                )}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.type_id")}</div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(abroadType, (o) => {
                      return (
                        o?.id === get(insuranceData, "step1.type_id", "-1")
                      );
                    })
                  ),
                  "name",
                  ""
                )}
              </div>
            </div>
            {get(insuranceData, "step1.type_id", "-1") === "1" ? (
              <div className="s3_item">
                <div className="s3_item_title">{t("_travel_s7.multi_id")}</div>
                <div className="s3_item_value">
                  {get(
                    first(
                      filter(multiDays, (o) => {
                        return (
                          o?.id === get(insuranceData, "step1.multi_id", "-1")
                        );
                      })
                    ),
                    "name",
                    ""
                  )}
                </div>
              </div>
            ) : null}
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.date")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step1.start_date", "")} /{" "}
                {get(insuranceData, "step1.end_date", "")}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">
            {t("_travel_s7.program_id")}{" "}
            {get(
              first(
                filter(
                  programs,
                  (o) =>
                    parseInt(o?.ID) ===
                    parseInt(get(insuranceData, "step1.program_id", "-1"))
                )
              ),
              "NAME",
              ""
            )}{" "}
            ({get(insuranceData, "step1_result.COST_UZS", "")}{" "}
            {t("_travel_s7.sum")})
          </div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.OTV")}</div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(
                      programs,
                      (o) =>
                        parseInt(o?.ID) ===
                        parseInt(get(insuranceData, "step1.program_id", "-1"))
                    )
                  ),
                  "OTV",
                  "0"
                )}{" "}
                {t("_travel_s7.EUR")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.MEDEX")}</div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(
                      programs,
                      (o) =>
                        parseInt(o?.ID) ===
                        parseInt(get(insuranceData, "step1.program_id", "-1"))
                    )
                  ),
                  "MEDEX",
                  "0"
                )}{" "}
                {t("_travel_s7.EUR")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.ACCIDENT")}</div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(
                      programs,
                      (o) =>
                        parseInt(o?.ID) ===
                        parseInt(get(insuranceData, "step1.program_id", "-1"))
                    )
                  ),
                  "ACCIDENT",
                  "0"
                )}{" "}
                {t("_travel_s7.EUR")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.COVID")}</div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(
                      programs,
                      (o) =>
                        parseInt(o?.ID) ===
                        parseInt(get(insuranceData, "step1.program_id", "-1"))
                    )
                  ),
                  "COVID",
                  "0"
                )}{" "}
                {t("_travel_s7.EUR")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.EVACUATION")}</div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(
                      programs,
                      (o) =>
                        parseInt(o?.ID) ===
                        parseInt(get(insuranceData, "step1.program_id", "-1"))
                    )
                  ),
                  "EVACUATION",
                  "0"
                )}{" "}
                {t("_travel_s7.EUR")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.TRANSPORT")}</div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(
                      programs,
                      (o) =>
                        parseInt(o?.ID) ===
                        parseInt(get(insuranceData, "step1.program_id", "-1"))
                    )
                  ),
                  "TRANSPORT",
                  "0"
                )}{" "}
                {t("_travel_s7.EUR")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">
                {t("_travel_s7.COMPENSATION")}
              </div>
              <div className="s3_item_value">
                {get(
                  first(
                    filter(
                      programs,
                      (o) =>
                        parseInt(o?.ID) ===
                        parseInt(get(insuranceData, "step1.program_id", "-1"))
                    )
                  ),
                  "COMPENSATION",
                  "0"
                )}{" "}
                {t("_travel_s7.EUR")}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">{t("_travel_s7.subtitle2")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.full_name")}</div>
              <div className="s3_item_value">
                {`${get(
                  insuranceData,
                  "step2_result.NVL(LAST_NAME_ENG,LAST_NAME)",
                  ""
                )} ${get(
                  insuranceData,
                  "step2_result.NVL(FIRST_NAME_ENG,FIRST_NAME)",
                  ""
                )}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.passport")}</div>
              <div className="s3_item_value">{`${get(
                insuranceData,
                "step2.passportSeries",
                ""
              )} ${get(insuranceData, "step2.passportNumber", "")}`}</div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.pinfl")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2_result.PINFL", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.birthdate")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2.birthDate", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.address")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2.address", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.phone")}</div>
              <div className="s3_item_value">
                {get(insuranceData, "step2.phone", "")}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">{t("_travel_s7.subtitle3")}</div>
        </div>
        {get(insuranceData, "insureds", []).map((item, index) => (
          <div className="s3_row" key={index}>
            <div className="s3_title">
              {index + 1}.{" "}
              {`${get(item, "result.NVL(LAST_NAME_ENG,LAST_NAME)", "")} ${get(
                item,
                "result.NVL(FIRST_NAME_ENG,FIRST_NAME)",
                ""
              )} (${get(item, "birthDate", "")})`}
            </div>
            <div className="s3_items">
              <div className="s3_item">
                <div className="s3_item_title">{t("_travel_s7.passport")}</div>
                <div className="s3_item_value">
                  {`${get(item, "passportSeries", "")}  ${get(
                    item,
                    "passportNumber",
                    ""
                  )}`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">{t("_travel_s7.pinfl")}</div>
                <div className="s3_item_value">
                  {`${get(item, "result.PINFL", "")}`}
                </div>
              </div>
            </div>
          </div>
        ))}
        {errors ? <ErrorShow errorText={errors} show_error={true} /> : null}

        <div className="btns">
          <Btn onClick={() => insuranceCreate()}>{t("_travel_s7.btn1")}</Btn>
          <BtnWhite onClick={() => setStep(step - 1)}>
            {t("_travel_s7.btn2")}
          </BtnWhite>
        </div>
      </Forma>
    </Step_7Style>
  );
};

export default Step_7;

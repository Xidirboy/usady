import React from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import { filter, first, get } from "lodash";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ReCreateStep1Style = styled.div`
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
const ReCreateStep1 = ({
  data = {},
  setStep,
  setInsuranceData,
  insuranceData,
  programs,
  abroadActivity,
  abroadGroup,
  abroadType,
  multiDays,
  abroadCountry,
  reCreatePolis,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [errors, setErrors] = useState("");
  const createMerchant = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .get(`api/v1/travel/merchant-info?anketa_id=${data?.anketa_id}`)
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
    <ReCreateStep1Style>
      <Forma className="step3_target" title={t("_travel_s7.title")}>
        <div className="s3_row">
          <div className="s3_title">{t("_travel_s7.subtitle")}</div>
          <div className="s3_items">
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.countries")}</div>
              <div className="s3_item_value">
                {filter(abroadCountry, (o) => {
                  return get(data, "data.countries", []).includes(o?.id);
                })?.map((c, cindex) => (
                  <span key={cindex} style={{ paddingRight: 10 }}>
                    {/* {cindex > 0 ? ",    " : ""} */} {c?.name}
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
                        o?.id === parseInt(get(data, "data.activity_id", "-1"))
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
                      return o?.id === get(data, "data.type_id", "-1");
                    })
                  ),
                  "name",
                  ""
                )}
              </div>
            </div>
            {get(data, "data.type_id", "-1") === "1" ? (
              <div className="s3_item">
                <div className="s3_item_title">{t("_travel_s7.multi_id")}</div>
                <div className="s3_item_value">
                  {get(
                    first(
                      filter(multiDays, (o) => {
                        return o?.id === get(data, "data.multi_id", "-1");
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
                {get(data, "data.start_date", "")} /{" "}
                {`${get(data, "data.end_date", "")}`}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">
            {t("_travel_s7.program_id")}{" "}
            {get(
              first(
                filter(programs, (o) => {
                  return (
                    parseInt(o?.ID) ===
                    parseInt(get(data, "data.program_id", "-1"))
                  );
                })
              ),
              "NAME",
              ""
            )}{" "}
            ({get(data, "premium_uzs", "")} {t("_travel_s7.sum")})
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
                        parseInt(get(data, "data.program_id", "-1"))
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
                        parseInt(get(data, "data.program_id", "-1"))
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
                        parseInt(get(data, "data.program_id", "-1"))
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
                        parseInt(get(data, "data.program_id", "-1"))
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
                        parseInt(get(data, "data.program_id", "-1"))
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
                        parseInt(get(data, "data.program_id", "-1"))
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
                        parseInt(get(data, "data.program_id", "-1"))
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
                {`${get(data, "data.applicant.first_name", "")} ${get(
                  data,
                  "data.applicant.last_name",
                  ""
                )}`}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.passport")}</div>
              <div className="s3_item_value">{`${get(
                data,
                "data.applicant.pass_sery",
                ""
              )} ${get(data, "data.applicant.pass_num", "")}`}</div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.pinfl")}</div>
              <div className="s3_item_value">
                {get(data, "data.applicant.pinfl", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.birthdate")}</div>
              <div className="s3_item_value">
                {get(data, "data.applicant.date_birth", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.address")}</div>
              <div className="s3_item_value">
                {get(data, "data.applicant.address", "")}
              </div>
            </div>
            <div className="s3_item">
              <div className="s3_item_title">{t("_travel_s7.phone")}</div>
              <div className="s3_item_value">
                {get(data, "data.applicant.phone", "")}
              </div>
            </div>
          </div>
        </div>
        <div className="s3_row">
          <div className="s3_title">{t("_travel_s7.subtitle3")}</div>
        </div>
        {get(data, "data.insured", []).map((item, index) => (
          <div className="s3_row" key={index}>
            <div className="s3_title">
              {index + 1}.{" "}
              {`${get(item, "first_name", "")}  ${get(item, "last_name", "")}`}{" "}
              ({`${get(item, "date_birth", "")}`})
            </div>
            <div className="s3_items">
              <div className="s3_item">
                <div className="s3_item_title">{t("_travel_s7.passport")}</div>
                <div className="s3_item_value">
                  {`${get(item, "pass_sery", "")}  ${get(
                    item,
                    "pass_num",
                    ""
                  )}`}
                </div>
              </div>
              <div className="s3_item">
                <div className="s3_item_title">{t("_travel_s7.pinfl")}</div>
                <div className="s3_item_value">
                  {`${get(item, "pinfl", "")}`}
                </div>
              </div>
            </div>
          </div>
        ))}
        {errors ? <div className="is_error">{errors}</div> : null}
        <div className="btns" onClick={() => reCreatePolis()}>
          <Btn>{t("_travel_s7.btn1")}</Btn>
        </div>
      </Forma>
    </ReCreateStep1Style>
  );
};

export default ReCreateStep1;

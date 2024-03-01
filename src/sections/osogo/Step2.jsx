import React, { useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import Axios from "../../utils/httpClient";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { first, get } from "lodash";
import Drivers from "./Drivers";
import ErrorShow from "../formSections/ErrorShow";
const Step2Sytle = styled.div``;
const Step2 = ({
  setLoading,
  step,
  setStep,
  insuranceData,
  setInsuranceData,
  vehicleTypes,
  useTerritoryRegions,
  relatives,
  residents,
  insuranceCreate,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [stage, setStage] = useState(1);
  const [sdata, setSdata] = useState({ discount: 0 });
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!sdata?.gov_number) {
      tt = false;
      err = { ...err, gov_number: true };
    }
    if (!sdata?.tech_passport_seria) {
      tt = false;
      err = { ...err, tech_passport_seria: true };
    }
    if (!sdata?.tech_passport_number) {
      tt = false;
      err = { ...err, tech_passport_number: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/osogo/vehicle", sdata)
        .then((r) => {
          if (r?.data?.data?.BODY_NUMBER) {
            setInsuranceData({
              ...insuranceData,
              step2: sdata,
              step2_result: r?.data?.data,
            });
            setStage(2);
          } else {
            setErrors({
              ...errors,
              common: r?.data?.message ?? t("auth.system_err"),
            });
          }
        })
        .catch((e) => {
          setErrors({
            ...errors,
            common: e?.response?.data?.message ?? t("auth.system_err"),
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      setErrors(err);
      dispatch({ type: "SET_LOADING", payload: false });
      const firstError = document.querySelector(".is_error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  const onSubmitStage2 = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!sdata?.owner_pasp_sery) {
      tt = false;
      err = { ...err, owner_pasp_sery: true };
    }
    if (!sdata?.owner_pasp_num) {
      tt = false;
      err = { ...err, owner_pasp_num: true };
    }
    if (!sdata?.owner_phone) {
      tt = false;
      err = { ...err, owner_phone: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/osogo/driver-summary", {
          pinfl: insuranceData?.step2_result?.PINFL,
          passport_series: sdata?.owner_pasp_sery,
          passport_number: sdata?.owner_pasp_num,
        })
        .then((r) => {
          if (r?.data?.data?.BIRTH_DATE) {
            setInsuranceData({
              ...insuranceData,
              step2: sdata,
              step2_owner: r?.data?.data,
            });
            setStage(3);
          } else {
            setErrors({
              ...errors,
              common: t("osogo_step2.user_err"),
            });
          }
        })
        .catch((e) => {
          setErrors({
            ...errors,
            common: e?.response?.data?.message ?? t("auth.system_err"),
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      setErrors(err);
      dispatch({ type: "SET_LOADING", payload: false });
      const firstError = document.querySelector(".is_error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  return (
    <Step2Sytle>
      <Forma title={t("osogo_step2.s2_title")}>
        <div className="sub_title">{t("osogo_step2.subtitle")}</div>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="select_target">
              <Input
                label={t("osogo_step2.gov_number")}
                placeholder="01A123AB"
                is_icon={false}
                value={sdata?.gov_number}
                is_error={errors?.gov_number}
                is_disabled={stage > 1}
                name="gov_number"
                mask="nnannnaa"
                onChange={(e) => {
                  setSdata({
                    ...sdata,
                    [e.target.name]: e.target?.value?.toUpperCase(),
                  });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
              />
            </div>
            <div className="doc_number">
              <label>{t("osogo_step2.tech_passport")}</label>
              <div className="inputs">
                <div className="seria">
                  <Input
                    mask="aaa"
                    placeholder="ABD"
                    is_icon={false}
                    value={sdata?.tech_passport_seria}
                    is_error={errors?.tech_passport_seria}
                    name="tech_passport_seria"
                    is_disabled={stage > 1}
                    onChange={(e) => {
                      setSdata({
                        ...sdata,
                        [e.target.name]: e.target?.value?.toUpperCase(),
                      });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                </div>
                <div className="number">
                  <Input
                    mask="nnnnnnn"
                    placeholder="1234567"
                    is_icon={false}
                    value={sdata?.tech_passport_number}
                    is_error={errors?.tech_passport_number}
                    is_disabled={stage > 1}
                    name="tech_passport_number"
                    onChange={(e) => {
                      setSdata({ ...sdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {stage === 1 ? (
            <div className="btns">
              <Btn>{t("osogo_step2.s2_btn1")}</Btn>
            </div>
          ) : null}
        </form>
        {stage > 1 ? (
          <>
            {stage === 2 ? (
              <div className="btns">
                <BtnWhite
                  type="button"
                  onClick={() => {
                    setStage(1);
                    setSdata({});
                    setInsuranceData({
                      ...insuranceData,
                      step2: {},
                      step2_result: {},
                    });
                  }}
                >
                  {t("osogo_step2.s2_btn2")}
                </BtnWhite>
              </div>
            ) : null}

            <div className="row">
              <div className="col_2">
                <div>
                  <Input
                    label={t("osogo_step2.model")}
                    is_disabled={true}
                    is_icon={false}
                    value={get(
                      insuranceData,
                      "step2_result.MODEL_NAME",
                      "-----"
                    )}
                  />
                </div>
                <div>
                  <Input
                    label={t("osogo_step2.vehicle_s1")}
                    is_disabled={true}
                    is_icon={false}
                    value={get(
                      first(
                        vehicleTypes,
                        (o) =>
                          o?.id ===
                          parseInt(
                            get(
                              insuranceData,
                              "step2_result.VEHICLE_TYPE_ID",
                              0
                            )
                          )
                      ),
                      "name",
                      "-----"
                    )}
                  />
                </div>
                <div>
                  <Input
                    label={t("osogo_step2.region")}
                    is_disabled={true}
                    is_icon={false}
                    value={get(
                      first(
                        useTerritoryRegions,
                        (o) =>
                          o?.id ===
                          parseInt(
                            get(insuranceData, "step2_result.USE_TERRITORY", 0)
                          )
                      ),
                      "name",
                      "-----"
                    )}
                  />
                </div>
                <div>
                  <Input
                    label={t("osogo_step2.year")}
                    is_disabled={true}
                    is_icon={false}
                    value={get(
                      insuranceData,
                      "step2_result.ISSUE_YEAR",
                      "-----"
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="sub_title">{t("osogo_step2.subtitle2")}</div>
            <form onSubmit={onSubmitStage2}>
              <div className="row">
                <div>
                  <Input
                    label={t("osogo_step2.orgname")}
                    is_disabled={true}
                    is_icon={false}
                    value={get(insuranceData, "step2_result.ORGNAME", "-----")}
                  />
                </div>
                <div className="doc_number">
                  <label>{t("osogo_step2.owner_pasp")}</label>
                  <div className="inputs">
                    <div className="seria">
                      <Input
                        placeholder="AB"
                        value={sdata?.owner_pasp_sery}
                        is_icon={false}
                        is_error={errors?.owner_pasp_sery}
                        name="owner_pasp_sery"
                        mask="aa"
                        is_disabled={stage > 2}
                        onChange={(e) => {
                          setSdata({
                            ...sdata,
                            [e.target.name]: e.target?.value?.toUpperCase(),
                          });
                          setErrors({
                            ...errors,
                            [e.target.name]: false,
                            common: "",
                          });
                        }}
                      />
                    </div>
                    <div className="number">
                      <Input
                        placeholder="1234567"
                        value={sdata?.owner_pasp_num}
                        is_icon={false}
                        is_error={errors?.owner_pasp_num}
                        is_disabled={stage > 2}
                        name="owner_pasp_num"
                        mask="nnnnnnn"
                        onChange={(e) => {
                          setSdata({
                            ...sdata,
                            [e.target.name]: e.target?.value,
                          });
                          setErrors({
                            ...errors,
                            [e.target.name]: false,
                            common: "",
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col_2">
                  <div>
                    <Input
                      label={t("osogo_step2.pinfl")}
                      value={insuranceData?.step2_result?.PINFL}
                      is_icon={false}
                      is_disabled={true}
                    />
                  </div>
                  <div>
                    <Input
                      label={t("osogo_step2.owner_phone")}
                      is_disabled={stage > 2}
                      is_icon={false}
                      value={sdata?.owner_phone}
                      is_error={errors?.owner_phone}
                      name="owner_phone"
                      mask="+998(nn) nnn-nn-nn"
                      onChange={(e) => {
                        const p = e?.target?.value ?? "";
                        const v =
                          p.substring(1, 4) +
                          p.substring(5, 7) +
                          p.substring(9, 12) +
                          p.substring(13, 15) +
                          p.substring(16, 18);
                        setSdata({ ...sdata, [e.target.name]: v });
                        setErrors({
                          ...errors,
                          [e.target.name]: false,
                          common: false,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="checkbox_single">
                <label>
                  <input
                    type="checkbox"
                    name="applicant_isowner"
                    checked={sdata?.applicant_isowner}
                    onChange={(e) => {
                      if (stage === 2) {
                        setSdata({
                          ...sdata,
                          [e.target.name]: sdata?.applicant_isowner ? 0 : 1,
                        });
                        setErrors({
                          ...errors,
                          [e.target.name]: false,
                          common: "",
                        });
                      }
                    }}
                  />
                  {t("osogo_step2.isowner")}
                </label>
              </div>
              {stage === 2 ? (
                <div className="btns">
                  <Btn>{t("osogo_step2.s2_btn1")}</Btn>
                </div>
              ) : null}
            </form>
            {stage > 2 ? (
              <>
                {stage === 3 ? (
                  <div className="btns">
                    <BtnWhite
                      type="button"
                      onClick={() => {
                        setStage(1);
                        setSdata({});
                        setInsuranceData({
                          ...insuranceData,
                          step2: {},
                          step2_result: {},
                        });
                      }}
                    >
                      {t("osogo_step2.s2_btn2")}
                    </BtnWhite>
                  </div>
                ) : null}
                <Drivers
                  limit={insuranceData?.step1?.driver_limit === 4 ? 5 : -1}
                  setInsuranceData={setInsuranceData}
                  insuranceData={insuranceData}
                  residents={residents}
                  relatives={relatives}
                  drivers={get(insuranceData, "drivers", [{}])}
                  setDrivers={(l) =>
                    setInsuranceData({ ...insuranceData, drivers: l })
                  }
                />
                <div className="btns">
                  <Btn
                    style={{ margin: "0 20px 20px 0" }}
                    onClick={() => insuranceCreate()}
                  >
                    {t("osogo_step2.s2_btn3")}
                  </Btn>
                  <BtnWhite>{t("osogo_step2.s2_btn4")}</BtnWhite>
                </div>
              </>
            ) : null}
          </>
        ) : null}
        {/* {errors?.common ? (
          <div
            style={{ color: "red", padding: "0 0 20px 0" }}
            dangerouslySetInnerHTML={{ __html: errors?.common ?? "" }}
          />
        ) : null} */}
        <ErrorShow show_error={errors?.common} errorText={errors?.common} />
      </Forma>
    </Step2Sytle>
  );
};

export default Step2;

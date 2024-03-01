import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import Axios from "../../utils/httpClient";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import Insureds from "./Insureds";
import ErrorShow from "../formSections/ErrorShow";
const Step_5Sytle = styled.div``;
const Step_5 = ({
  setStep,
  step,
  sdata,
  setSdata,
  insuranceData,
  setInsuranceData,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const submitStage1 = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (sdata?.passportSeries?.length !== 2) {
      tt = false;
      err = { ...err, passportSeries: true };
    }
    if (sdata?.passportNumber?.length !== 7) {
      tt = false;
      err = { ...err, passportNumber: true };
    }
    if (!sdata?.birthDate) {
      tt = false;
      err = { ...err, birthDate: true };
    }
    if (!sdata?.address) {
      tt = false;
      err = { ...err, address: true };
    }
    if (tt) {
      Axios()
        .post(`api/v1/travel/provider/passport-birth-date`, {
          birthDate: dateFormat(sdata?.birthDate),
          passportSeries: sdata?.passportSeries,
          passportNumber: sdata?.passportNumber,
        })
        .then((r) => {
          if (r?.data?.data?.PINFL) {
            setInsuranceData({
              ...insuranceData,
              step2: sdata,
              step2_result: r?.data?.data ?? {},
            });
            setStep(6);
          } else {
            setErrors({ common: t("_travel_s5.common_err") });
          }
        })
        .catch((e) => {
          setErrors({ common: t("_travel_s5.common_err") });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
      setErrors(err);
    }
  };
  const dateFormat = (d = "") => {
    const dl = d.split("-");
    return `${dl[2]}.${dl[1]}.${dl[0]}`;
  };
  return (
    <Step_5Sytle>
      <Forma
        title={t("_travel_s5.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        <form onSubmit={submitStage1}>
          <div className="row">
            <div className="doc_number">
              <label>{t("_travel_s5.passport")}</label>
              <div className="inputs">
                <div className="seria">
                  <Input
                    mask="aa"
                    placeholder="AB"
                    is_icon={false}
                    value={sdata?.passportSeries}
                    is_error={errors?.passportSeries}
                    name="passportSeries"
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
                    value={sdata?.passportNumber}
                    is_error={errors?.passportNumber}
                    name="passportNumber"
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
            <div className="col_2">
              <div>
                <Input
                  label={t("_travel_s5.birthDate")}
                  type="date"
                  is_icon={false}
                  value={sdata?.birthDate}
                  is_error={errors?.birthDate}
                  name="birthDate"
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
            {get(insuranceData, "step2_result.PINFL", "") ? (
              <div>
                <Input
                  label={t("_travel_s5.full_name")}
                  is_disabled={true}
                  is_icon={false}
                  value={`${get(
                    insuranceData,
                    "step2_result.NVL(LAST_NAME_ENG,LAST_NAME)",
                    ""
                  )} ${get(
                    insuranceData,
                    "step2_result.NVL(FIRST_NAME_ENG,FIRST_NAME)",
                    ""
                  )}`}
                  name="full_name"
                  type="text"
                />
              </div>
            ) : null}
            <div>
              <Input
                label={t("_travel_s5.address")}
                is_icon={false}
                value={sdata?.address}
                is_error={errors?.address}
                name="address"
                type="text"
                onChange={(e) => {
                  const p = e?.target?.value;
                  setSdata({ ...sdata, [e.target.name]: p });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: false,
                  });
                }}
              />
            </div>
          </div>
          <div className="btns">
            <Btn type="submit">{t("_travel_s5.btn")}</Btn>
          </div>
        </form>
        <div className="date_error_check">
          <ErrorShow show_error={errors?.common} errorText={errors?.common} />
        </div>
      </Forma>
    </Step_5Sytle>
  );
};

export default Step_5;

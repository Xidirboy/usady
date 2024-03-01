import React, { useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import Axios from "../../utils/httpClient";
import { Btn } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ErrorShow from "../formSections/ErrorShow";
const Step1Sytle = styled.div``;
const Step1 = ({
  setLoading,
  step,
  setStep,
  insuranceData,
  setInsuranceData,
  sdata,
  setSdata,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
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
              step2: { ...(insuranceData?.step2 ?? {}), ...sdata },
              step2_result: r?.data?.data,
            });
            setStep(2);
          } else {
            setErrors({
              ...errors,
              common: r?.data?.data?.ERROR_MESSAGE ?? t("auth.system_err"),
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
    <Step1Sytle>
      <Forma title={t("_osogo_s1.title")}>
        <div className="sub_title">{t("_osogo_s1.subtitle")}</div>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="select_target">
              <Input
                label={t("_osogo_s1.gov_number")}
                placeholder="01A123AB"
                is_icon={false}
                value={sdata?.gov_number}
                is_error={errors?.gov_number}
                // is_disabled={stage > 1}
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
              <label>{t("_osogo_s1.tech_passport")}</label>
              <div className="inputs">
                <div className="seria">
                  <Input
                    mask="aaa"
                    placeholder="ABD"
                    is_icon={false}
                    value={sdata?.tech_passport_seria}
                    is_error={errors?.tech_passport_seria}
                    name="tech_passport_seria"
                    // is_disabled={stage > 1}
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
                    // is_disabled={stage > 1}
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
          <ErrorShow show_error={errors?.common} errorText={errors?.common} />
          <div className="btns">
            <Btn>{t("_osogo_s1.btn1")}</Btn>
          </div>
        </form>
        {/* {errors?.common ? (
          <div
            style={{ color: "red", padding: "0 0 20px 0" }}
            dangerouslySetInnerHTML={{ __html: errors?.common ?? "" }}
          />
        ) : null} */}
      </Forma>
    </Step1Sytle>
  );
};

export default Step1;

import React, { useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import Axios from "../../utils/httpClient";
import { Btn } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import ErrorShow from "../formSections/ErrorShow";
const Step2Sytle = styled.div``;
const Step2 = ({
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
    // if (!sdata?.owner_phone) {
    //   tt = false;
    //   err = { ...err, owner_phone: true };
    // }
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
              step2: { ...(insuranceData?.step2 ?? {}), ...sdata },
              step2_owner: r?.data?.data,
            });
            setStep(3);
          } else {
            setErrors({
              ...errors,
              common: t("_osogo_s2.user_err"),
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
      <Forma
        title={t("_osogo_s2.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        {/* <div className="sub_title">{t("_osogo_s2.subtitle")}</div> */}
        <form onSubmit={onSubmitStage2}>
          <div className="row">
            <div>
              <Input
                label={t("_osogo_s2.owner_full_name")}
                is_disabled={true}
                is_icon={false}
                value={get(insuranceData, "step2_result.ORGNAME", "-----")}
              />
            </div>
            <div>
              <Input
                is_disabled={true}
                is_icon={false}
                label={t("_osogo_s2.pinfl")}
                value={insuranceData?.step2_result?.PINFL}
              />
            </div>
            <div className="doc_number">
              <label>{t("_osogo_s2.owner_pasp")}</label>
              <div className="inputs">
                <div className="seria">
                  <Input
                    placeholder="AB"
                    value={sdata?.owner_pasp_sery}
                    is_icon={false}
                    is_error={errors?.owner_pasp_sery}
                    name="owner_pasp_sery"
                    mask="aa"
                    // is_disabled={stage > 2}
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
                    // is_disabled={stage > 2}
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
          </div>
          <ErrorShow show_error={errors?.common} errorText={errors?.common} />
          <div className="btns">
            <Btn>{t("_osogo_s2.btn")}</Btn>
          </div>
        </form>
        {/* {errors?.common ? (
          <div
            style={{ color: "red", padding: "0 0 20px 0" }}
            dangerouslySetInnerHTML={{ __html: errors?.common ?? "" }}
          />
        ) : null} */}
      </Forma>
    </Step2Sytle>
  );
};

export default Step2;

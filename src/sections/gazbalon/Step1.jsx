import React, { useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import Axios from "../../utils/httpClient";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import { Link } from "react-router-dom";
import ErrorShow from "../formSections/ErrorShow";
const Step1Sytle = styled.div``;
const Step1 = ({
  setLoading,
  step,
  setStep,
  insuranceData,
  setInsuranceData,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [stage, setStage] = useState(1);
  const [sdata, setSdata] = useState({});
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
        .post("api/v1/gazbalon/vehicle", sdata)
        .then((r) => {
          if (r?.data?.data?.body_number) {
            setInsuranceData({
              ...insuranceData,
              step1: sdata,
              step1_result: r?.data?.data,
            });
            setStage(2);
            setErrors({
              ...errors,
              common: "",
            });
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
  return (
    <Step1Sytle>
      <Forma title={t("gaz_balon_step1.s1_title")}>
        <div className="sub_title">{t("gaz_balon_step1.subtitle")}</div>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="select_target">
              <Input
                label={t("gaz_balon_step1.gov_number")}
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
              <label>{t("gaz_balon_step1.tech_passport")}</label>
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
            {stage === 2 ? (
              <>
                <div className="col_2">
                  <div>
                    <Input
                      label={t("gaz_balon_step1.model")}
                      is_disabled={true}
                      is_icon={false}
                      value={get(insuranceData, "step1_result.model_name", "")}
                    />
                  </div>
                  <div>
                    <Input
                      label={t("gaz_balon_step1.year")}
                      is_disabled={true}
                      is_icon={false}
                      value={get(insuranceData, "step1_result.issue_year", "")}
                    />
                  </div>
                </div>
                <div>
                  <Input
                    label={t("gaz_balon_step1.orgname")}
                    is_disabled={true}
                    is_icon={false}
                    value={get(insuranceData, "step1_result.orgname", "")}
                  />
                </div>
              </>
            ) : null}
          </div>
          {stage === 1 ? (
            <>
              <div className="checkbox_single">
                <label
                  style={
                    errors?.is_offerta
                      ? { color: "red", cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
                >
                  <input
                    type="checkbox"
                    name="is_offerta"
                    checked={sdata?.is_offerta}
                    onChange={(e) => {
                      setSdata({
                        ...sdata,
                        [e.target.name]: sdata?.is_offerta ? 0 : 1,
                      });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  {t("osogo_step1.offerta")}
                  <Link
                    to={"https://apiinson.yarbek.uz/public-offer"}
                    target="blank" className="offer_link"
                  >
                    {t("osogo_step1.view_offerta")}
                  </Link>
                </label>
              </div>
              <div className="btns">
                <Btn type="submit">{t("gaz_balon_step1.s2_btn1")}</Btn>
              </div>
            </>
          ) : (
            <div className="btns">
              <Btn
                type="button"
                style={{ margin: "0 10px 10px 0" }}
                onClick={() => {
                  setStep(2);
                }}
              >
                {t("gaz_balon_step1.s2_btn1")}
              </Btn>
              <BtnWhite
                type="button"
                style={{ margin: "0 10px 0 0" }}
                onClick={() => {
                  setInsuranceData({
                    ...insuranceData,
                    step1_result: {},
                  });
                  setStage(1);
                }}
              >
                {t("gaz_balon_step1.s2_btn2")}
              </BtnWhite>
            </div>
          )}
        </form>
        {/* {errors?.common ? (
          <div
            style={{ color: "red", padding: "0 0 20px 0" }}
            dangerouslySetInnerHTML={{ __html: errors?.common ?? "" }}
          />
        ) : null} */}
        <ErrorShow show_error={errors?.common} errorText={errors?.common} />
      </Forma>
    </Step1Sytle>
  );
};

export default Step1;

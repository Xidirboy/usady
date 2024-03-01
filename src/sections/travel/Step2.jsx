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
const Step2Sytle = styled.div``;
const Step2 = ({
  setLoading,
  step,
  setStep,
  insuranceData,
  setInsuranceData,
  insuranceCreate
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sdata, setSdata] = useState({});
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState(1);

  const getUserData = () => {
    Axios()
      .post(`api/v1/travel/provider/passport-birth-date`, {
        birthDate: "asdsd",
        passportSeries: "as",
        passportNumber: 121323,
      })
      .then((r) => {})
      .catch((e) => {})
      .finally(() => {});
  };
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
    if (!sdata?.phone) {
      tt = false;
      err = { ...err, phone: true };
    }
    if (!sdata?.address) {
      tt = false;
      err = { ...err, address: true };
    }
    if (!sdata?.start_date) {
      tt = false;
      err = { ...err, start_date: true };
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
            setStage(2);
          } else {
            setErrors({ common: t("travel_step2.common_err") });
          }
        })
        .catch((e) => {
          setErrors({ common: t("travel_step2.common_err") });
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
    <Step2Sytle>
      <Forma title={t("travel_step2.title")}>
        <form onSubmit={submitStage1}>
          <div className="row">
            <div className="doc_number">
              <label>{t("travel_step2.passport")}</label>
              <div className="inputs">
                <div className="seria">
                  <Input
                    mask="aa"
                    placeholder="AB"
                    is_icon={false}
                    value={sdata?.passportSeries}
                    is_error={errors?.passportSeries}
                    name="passportSeries"
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
                    value={sdata?.passportNumber}
                    is_error={errors?.passportNumber}
                    is_disabled={stage > 1}
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
                  label={t("travel_step2.birthDate")}
                  type="date"
                  is_icon={false}
                  value={sdata?.birthDate}
                  is_error={errors?.birthDate}
                  is_disabled={stage > 1}
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
              <div>
                <Input
                  label={t("travel_step2.phone")}
                  is_disabled={stage > 1}
                  is_icon={false}
                  value={sdata?.phone}
                  is_error={errors?.phone}
                  name="phone"
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
            {get(insuranceData, "step2_result.PINFL", "") ? (
              <div>
                <Input
                  label={t("travel_step2.full_name")}
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
                label={t("travel_step2.address")}
                is_disabled={stage > 1}
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
            <div className="date_target">
              <div>
                <Input
                  label={t("travel_step2.start_date")}
                  type="date"
                  is_icon={false}
                  value={sdata?.start_date}
                  is_error={errors?.start_date}
                  name="start_date"
                  is_disabled={stage > 1}
                  onChange={(e) => {
                    let newDate = "";
                    if (e.target.value) {
                      let end_date = new Date(e.target.value);
                      end_date.setMonth(end_date.getMonth() + 12);
                      const year = end_date.getFullYear();
                      const month = (end_date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const day = end_date
                        .getDate()
                        .toString()
                        .padStart(2, "0");
                      newDate = `${year}-${month}-${day}`;
                    } else {
                      newDate = "";
                    }
                    setSdata({
                      ...sdata,
                      [e.target.name]: e.target.value,
                      end_date: newDate,
                    });
                    setErrors({
                      ...errors,
                      [e.target.name]: false,
                      common: "",
                    });
                  }}
                />
              </div>
              <div>
                <Input
                  label={t("travel_step2.end_date")}
                  type="date"
                  is_icon={false}
                  value={sdata?.end_date}
                  is_disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="btns">
            {stage > 1 ? (
              <BtnWhite
                type="button"
                onClick={() => {
                  setInsuranceData({
                    ...insuranceData,
                    step2: {},
                    step2_result: {},
                  });
                  setSdata({});
                  setStage(1);
                }}
              >
                {t("travel_step2.s1_clear_btn")}
              </BtnWhite>
            ) : (
              <Btn type="submit">{t("travel_step2.s1_btn")}</Btn>
            )}
          </div>
        </form>
        {stage > 1 ? (
          <>
            <Insureds
              limit={-1}
              setInsuranceData={setInsuranceData}
              insuranceData={insuranceData}
              insureds={get(insuranceData, "insureds", [{}])}
              setInsureds={(l) =>
                setInsuranceData({ ...insuranceData, insureds: l })
              }
            />
            <div className="btns">
              <Btn
                style={{ margin: "0 20px 20px 0" }}
                onClick={() => insuranceCreate()}
              >
                {t("travel_step2.s2_btn")}
              </Btn> 
            </div>
          </>
        ) : null}
        {/* {errors?.common ? (
          <div
            style={{ color: "red", padding: "0 0 20px 0", fontSize: 18 }}
            dangerouslySetInnerHTML={{ __html: errors?.common ?? "" }}
          />
        ) : null} */}
        <ErrorShow show_error={errors?.common} errorText={errors?.common} />
      </Forma>
    </Step2Sytle>
  );
};

export default Step2;

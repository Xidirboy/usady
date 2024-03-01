import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import CheckBox from "../formSections/CheckBox";
import Axios from "../../utils/httpClient";
import { Btn } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ErrorShow from "../formSections/ErrorShow";
import { get } from "lodash";
const Step3Sytle = styled.div``;
const Step3 = ({
  setLoading,
  step,
  setStep,
  insuranceData,
  setInsuranceData,
  sdata,
  setSdata,
  vehicleTypes,
  useTerritoryRegions,
  discounts,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    // if (!sdata?.vehicle) {
    //   tt = false;
    //   err = { ...err, vehicle: true };
    // }
    // if (!sdata?.use_territory) {
    //   tt = false;
    //   err = { ...err, use_territory: true };
    // }
    if (!sdata?.driver_limit) {
      tt = false;
      err = { ...err, driver_limit: true };
    }
    if (!sdata?.period) {
      tt = false;
      err = { ...err, period: true };
    }
    if (!sdata?.date_from) {
      tt = false;
      err = { ...err, date_from: true };
    }
    // if (!sdata?.date_to) {
    //   tt = false;
    //   err = { ...err, date_to: true };
    // }
    if (!sdata?.is_offerta) {
      tt = false;
      err = { ...err, is_offerta: true };
    }
    if (tt) {
      const ssdata = {
        ...sdata,
        vehicle: get(insuranceData, "step2_result.VEHICLE_TYPE_ID", null),
        use_territory: get(insuranceData, "step2_result.USE_TERRITORY", null),
      };
      Axios()
        .post("api/v1/osogo/calc-prem", ssdata)
        .then((r) => {
          if (r?.data?.data?.prem) {
            setInsuranceData({
              ...insuranceData,
              step1: ssdata,
              step1_result: r?.data?.data,
            });
            setStep(4);
            const firstError = document.querySelector(".title_target");
            if (firstError) {
              firstError.scrollIntoView({
                behavior: "smooth",
              });
            }
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
  const checkDateNow = (inputValue) => {
    if (inputValue) {
      var nowDate = new Date();
      var inputDate = new Date(inputValue);
      nowDate.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
      var ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(nowDate.getDate() + 90);
      ninetyDaysAgo.setHours(0, 0, 0, 0);
      return inputDate < nowDate || inputDate > ninetyDaysAgo;
    }
    return false;
  };
  return (
    <Step3Sytle>
      <Forma
        title={t("_osogo_s3.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="date_target">
              <div>
                <div className="select_target">
                  <Input
                    label={t("_osogo_s3.driver_limit")}
                    placeholder={""}
                    is_icon={false}
                    value={sdata?.driver_limit}
                    is_error={errors?.driver_limit}
                    name="driver_limit"
                    onChange={(e) => {
                      setSdata({ ...sdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                    options={[
                      { value: 10, label: t("_osogo_s3.driver_limit_1") },
                      { value: 4, label: t("_osogo_s3.driver_limit_2") },
                    ]}
                  />
                </div>
              </div>
              <div>
                <div className="select_target">
                  <Input
                    label={t("_osogo_s3.period")}
                    placeholder={""}
                    is_icon={false}
                    value={sdata?.period}
                    is_error={errors?.period}
                    name="period"
                    onChange={(e) => {
                      let newDate = "";
                      if (sdata?.date_from) {
                        let date_to = new Date(sdata?.date_from);
                        date_to.setMonth(
                          date_to.getMonth() + (e.target.value === 1 ? 6 : 12)
                        );
                        const year = date_to.getFullYear();
                        const month = (date_to.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const day = date_to
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
                        date_to: newDate,
                      });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                    options={[
                      { value: 2, label: t("_osogo_s3.period_1") },
                      { value: 1, label: t("_osogo_s3.period_2") },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="date_target">
              <div>
                <Input
                  label={t("_osogo_s3.date_from")}
                  type="date"
                  is_icon={false}
                  value={sdata?.date_from}
                  is_error={errors?.date_from}
                  name="date_from"
                  onChange={(e) => {
                    let newDate = "";
                    if (e.target.value) {
                      let date_to = new Date(e.target.value);
                      date_to.setMonth(
                        date_to.getMonth() + (sdata?.period === 1 ? 6 : 12)
                      );
                      const year = date_to.getFullYear();
                      const month = (date_to.getMonth() + 1)
                        .toString()
                        .padStart(2, "0");
                      const day = date_to.getDate().toString().padStart(2, "0");
                      newDate = `${year}-${month}-${day}`;
                    } else {
                      newDate = "";
                    }
                    setSdata({
                      ...sdata,
                      [e.target.name]: e.target.value,
                      date_to: newDate,
                    });
                    setErrors({
                      ...errors,
                      [e.target.name]: false,
                      date_check_now: checkDateNow(e?.target?.value),
                      common: "",
                    });
                  }}
                />
              </div>
              <div>
                <Input
                  label={t("_osogo_s3.date_to")}
                  type="date"
                  is_icon={false}
                  value={sdata?.date_to}
                  is_disabled={true}
                />
              </div>
            </div>
            <div className="date_error_check">
              <ErrorShow
                show_error={errors?.date_check_now}
                errorText={t("_osogo_s3.date_check")}
              />
            </div>
          </div>
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
              {t("_osogo_s3.offerta")}{" "}
              <Link
                to={"https://apiinson.yarbek.uz/public-offer"}
                target="blank"
                className="offer_link"
              >
                {t("_osogo_s3.view_offerta")}
              </Link>
            </label>
          </div>
          <ErrorShow show_error={errors?.common} errorText={errors?.common} />
          <div className="btns">
            <Btn>{t("_osogo_s3.btn")}</Btn>
          </div>
        </form>
      </Forma>
    </Step3Sytle>
  );
};

export default Step3;

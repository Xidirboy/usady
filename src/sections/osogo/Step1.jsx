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
const Step1Sytle = styled.div``;
const Step1 = ({
  setLoading,
  step,
  setStep,
  insuranceData,
  setInsuranceData,
  vehicleTypes,
  useTerritoryRegions,
  discounts,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sdata, setSdata] = useState({ discount: 0 });
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!sdata?.vehicle) {
      tt = false;
      err = { ...err, vehicle: true };
    }
    if (!sdata?.use_territory) {
      tt = false;
      err = { ...err, use_territory: true };
    }
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
      Axios()
        .post("api/v1/osogo/calc-prem", sdata)
        .then((r) => {
          if (r?.data?.data?.prem) {
            setInsuranceData({
              ...insuranceData,
              step1: sdata,
              step1_result: r?.data?.data,
            });
            setStep(2);
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
  return (
    <Step1Sytle>
      <Forma title={t("osogo_step1.s1_title")}>
        <form onSubmit={onSubmit}>
          <div className="row">
            <CheckBox
              label={t("osogo_step1.vehicle")}
              items={vehicleTypes}
              name="vehicle"
              value={sdata?.vehicle}
              is_error={errors?.vehicle}
              onChange={(v) => {
                setSdata({ ...sdata, [v.name]: v.value });
                setErrors({ ...errors, common: "", [v.name]: false });
              }}
            />
          </div>
          <div className="row">
            <div className="select_target">
              <Input
                label={t("osogo_step1.use_territory")}
                placeholder={"Select"}
                is_icon={false}
                value={sdata?.use_territory}
                is_error={errors?.use_territory}
                name="use_territory"
                onChange={(e) => {
                  setSdata({ ...sdata, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
                options={useTerritoryRegions.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
              />
            </div>
          </div>
          <div className="row">
            <div className="select_target">
              <Input
                label={t("osogo_step1.discount")}
                placeholder={""}
                is_icon={false}
                value={sdata?.discount}
                is_error={errors?.discount}
                name="discount"
                onChange={(e) => {
                  setSdata({ ...sdata, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
                options={discounts.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
              />
            </div>
          </div>
          <div className="row">
            <CheckBox
              label={t("osogo_step1.driver_limit")}
              items={[
                { id: 10, name: t("osogo_step1.driver_limit_1") },
                { id: 4, name: t("osogo_step1.driver_limit_2") },
              ]}
              name="driver_limit"
              value={sdata?.driver_limit}
              is_error={errors?.driver_limit}
              onChange={(v) => {
                setSdata({ ...sdata, [v.name]: v.value });
                setErrors({ ...errors, common: "", [v.name]: false });
              }}
            />
          </div>
          <div className="row">
            <CheckBox
              label={t("osogo_step1.period")}
              items={[
                { id: 2, name: t("osogo_step1.period_1") },
                { id: 1, name: t("osogo_step1.period_2") },
              ]}
              name="period"
              value={sdata?.period}
              is_error={errors?.period}
              onChange={(v) => {
                setSdata({
                  ...sdata,
                  [v.name]: v.value,
                  date_from: "",
                  date_to: "",
                });
                setErrors({ ...errors, common: "", [v.name]: false });
              }}
            />
          </div>
          <div className="row">
            <div className="date_target">
              <div>
                <Input
                  label={t("osogo_step1.date_from")}
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
                      common: "",
                    });
                  }}
                />
              </div>
              <div>
                <Input
                  label={t("osogo_step1.date_to")}
                  type="date"
                  is_icon={false}
                  value={sdata?.date_to}
                  is_disabled={true}
                  // is_error={errors?.date_to}
                  // name="date_to"
                  // onChange={(e) => {
                  //   setSdata({ ...sdata, [e.target.name]: e.target.value });
                  //   setErrors({
                  //     ...errors,
                  //     [e.target.name]: false,
                  //     common: "",
                  //   });
                  // }}
                />
              </div>
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
              {t("osogo_step1.offerta")}
              <Link
                to={"https://apiinson.yarbek.uz/public-offer"}
                target="blank"
                className="offer_link"
              >
                {t("osogo_step1.view_offerta")}
              </Link>
            </label>
          </div>
          <div className="btns">
            <Btn>{t("osogo_step1.s1_btn")}</Btn>
          </div>
          {/* {errors?.common ? (
            <div
              style={{ color: "red", padding: "0 0 20px 0" }}
              dangerouslySetInnerHTML={{ __html: errors?.common ?? "" }}
            />
          ) : null} */}
          <ErrorShow show_error={errors?.common} errorText={errors?.common} />
        </form>
      </Forma>
    </Step1Sytle>
  );
};

export default Step1;

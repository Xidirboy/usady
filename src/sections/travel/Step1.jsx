import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import CheckBox from "../formSections/CheckBox";
import Axios from "../../utils/httpClient";
import { Btn } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import SelectComp from "../formSections/SelectComp";
import { forEach } from "lodash";
import { Link } from "react-router-dom";
import ErrorShow from "../formSections/ErrorShow";
const Step1Sytle = styled.div``;
const Step1 = ({
  setLoading,
  step,
  setStep,
  insuranceData,
  setInsuranceData,
  programs,
  abroadActivity,
  abroadGroup,
  abroadType,
  multiDays,
  abroadCountry,
  getAbroadProgram,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sdata, setSdata] = useState({ day: 1 });
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {},
      step1 = { day: 1 };
    if (!sdata?.countrys?.length) {
      tt = false;
      err = { ...err, countrys: true };
    }
    if (sdata?.program_id) {
      step1 = { ...step1, program_id: sdata.program_id };
    } else {
      tt = false;
      err = { ...err, program_id: true };
    }
    if (sdata?.activity_id) {
      step1 = { ...step1, activity_id: sdata.activity_id };
    } else {
      tt = false;
      err = { ...err, activity_id: true };
    }
    if (sdata?.group_id) {
      step1 = { ...step1, group_id: sdata.group_id };
    } else {
      tt = false;
      err = { ...err, group_id: true };
    }
    if (sdata?.type_id) {
      step1 = { ...step1, type_id: sdata.type_id };
    } else {
      tt = false;
      err = { ...err, type_id: true };
    }
    if (sdata?.multi_id) {
      step1 = { ...step1, multi_id: sdata.multi_id };
    } else {
      tt = false;
      err = { ...err, multi_id: true };
    }

    if (!sdata?.is_offerta) {
      tt = false;
      err = { ...err, is_offerta: true };
    }
    const today = getToday();
    step1 = { ...step1, date_reg: today };
    if (tt) {
      Axios()
        .post("api/v1/travel/price/initial", step1)
        .then((r) => {
          if (r?.data?.data?.COST_USD) {
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
  const changeCountry = (select) => {
    setSdata({ ...sdata, countrys: select, program_id: "" });
    setErrors({
      ...errors,
      countrys: false,
      common: "",
      program_id: "",
    });
    if (select.length) {
      const fdata = new FormData();
      forEach(select, (item) => {
        fdata.append("countries[]", item?.value);
      });
      getAbroadProgram(fdata);
    }
  };
  const getToday = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    return `${currentDate}.${currentMonth}.${currentYear}`;
  };
  return (
    <Step1Sytle>
      <Forma title={t("osogo_step1.s1_title")}>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="select_target">
              <SelectComp
                is_multi={true}
                label={t("travel_step1.country")}
                options={abroadCountry?.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
                is_error={errors?.countrys}
                value={sdata?.countrys}
                name="countrys"
                onChange={(select) => {
                  changeCountry(select);
                }}
              />
            </div>
          </div>
          {sdata?.countrys?.length ? (
            <div className="row">
              <div className="select_target">
                <Input
                  label={t("travel_step1.program")}
                  placeholder={""}
                  is_icon={false}
                  value={sdata?.program_id}
                  is_error={errors?.program_id}
                  name="program_id"
                  onChange={(e) => {
                    setSdata({ ...sdata, [e.target.name]: e.target.value });
                    setErrors({
                      ...errors,
                      [e.target.name]: false,
                      common: "",
                    });
                  }}
                  options={programs?.map((item) => ({
                    value: item?.ID,
                    label: item?.NAME,
                  }))}
                />
              </div>
            </div>
          ) : null}
          <div className="row">
            <div className="select_target">
              <Input
                label={t("travel_step1.activity")}
                placeholder={""}
                is_icon={false}
                value={sdata?.activity_id}
                is_error={errors?.activity_id}
                name="activity_id"
                onChange={(e) => {
                  setSdata({ ...sdata, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
                options={abroadActivity?.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
              />
            </div>
          </div>
          <div className="row">
            <div className="select_target">
              <Input
                label={t("travel_step1.group")}
                placeholder={""}
                is_icon={false}
                value={sdata?.group_id}
                is_error={errors?.group_id}
                name="group_id"
                onChange={(e) => {
                  setSdata({ ...sdata, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
                options={abroadGroup?.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
              />
            </div>
          </div>
          <div className="row">
            <div className="select_target">
              <Input
                label={t("travel_step1.type")}
                placeholder={""}
                is_icon={false}
                value={sdata?.type_id}
                is_error={errors?.type_id}
                name="type_id"
                onChange={(e) => {
                  setSdata({ ...sdata, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
                options={abroadType?.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
              />
            </div>
          </div>
          <div className="row">
            <div className="select_target">
              <Input
                label={t("travel_step1.multi")}
                placeholder={""}
                is_icon={false}
                value={sdata?.multi_id}
                is_error={errors?.multi_id}
                name="multi_id"
                onChange={(e) => {
                  setSdata({ ...sdata, [e.target.name]: e.target.value });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
                options={multiDays?.map((item) => ({
                  value: item?.id,
                  label: item?.name,
                }))}
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

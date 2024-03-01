import React, { useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import CheckBox from "../formSections/CheckBox";
import { Btn } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useTranslation } from "react-i18next";
import SelectComp from "../formSections/SelectComp";
import { forEach } from "lodash";
import ErrorShow from "../formSections/ErrorShow";
const Step_1Sytle = styled.div``;
const Step_1 = ({
  step,
  setStep,
  sdata,
  setSdata,
  abroadActivity,
  abroadGroup,
  abroadType,
  multiDays,
  abroadCountry,
  getAbroadProgram,
}) => {
  const { t } = useTranslation();
  // const [sdata, setSdata] = useState({ day: 1 });
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    let tt = true,
      err = {};
    if (!sdata?.countrys?.length) {
      tt = false;
      err = { ...err, countrys: true };
    }
    // if (!sdata?.program_id) {
    //   tt = false;
    //   err = { ...err, program_id: true };
    // }
    if (!sdata?.activity_id) {
      tt = false;
      err = { ...err, activity_id: true };
    }
    if (!sdata?.group_id) {
      tt = false;
      err = { ...err, group_id: true };
    }
    if (!sdata?.start_date) {
      tt = false;
      err = { ...err, start_date: true };
    }
    if (!sdata?.type_id) {
      tt = false;
      err = { ...err, type_id: true };
    } else {
      if (sdata?.type_id === "0") {
        if (!sdata?.end_date) {
          tt = false;
          err = { ...err, end_date: true };
        }
      }
      if (sdata?.type_id === "1") {
        if (!sdata?.multi_id) {
          tt = false;
          err = { ...err, multi_id: true };
        }
      }
    }
    // console.log(tt, err);
    if (tt) {
      const today = getToday();
      setSdata({ ...sdata, day: 1, date_reg: today });
      window.scrollTo({ top: 0, behavior: "smooth" });
      setStep(2);
    } else {
      setErrors(err);
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
    <Step_1Sytle>
      <Forma title={t("_travel_s1.title")}>
        <form onSubmit={onSubmit}>
          <div className="row">
            {/* <div className="select_target"> */}
            <div>
              <SelectComp
                is_multi={true}
                label={t("_travel_s1.country")}
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
            <CheckBox
              label={t("_travel_s1.type")}
              items={abroadType}
              name="type_id"
              value={sdata?.type_id}
              is_error={errors?.type_id}
              onChange={(v) => {
                setSdata({ ...sdata, [v.name]: v.value });
                setErrors({ ...errors, common: "", [v.name]: false });
              }}
            />
            <div className="date_target">
              <div>
                <Input
                  label={t("_travel_s1.date_start")}
                  type="date"
                  is_icon={false}
                  value={sdata?.start_date}
                  is_error={errors?.start_date}
                  name="start_date"
                  onChange={(e) => {
                    setSdata({
                      ...sdata,
                      [e.target.name]: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      [e.target.name]: false,
                      date_check_now: checkDateNow(e?.target?.value),
                      common: "",
                    });
                  }}
                />
                {errors?.date_check_now ? (
                  <div className="date_error_check">
                    <ErrorShow
                      show_error={errors?.date_check_now}
                      errorText={t("_travel_s1.date_check")}
                    />
                  </div>
                ) : null}
              </div>
              {sdata?.type_id === "0" && sdata?.start_date ? (
                <div>
                  <Input
                    label={t("_travel_s1.date_end")}
                    type="date"
                    is_icon={false}
                    value={sdata?.end_date}
                    is_error={errors?.end_date}
                    name="end_date"
                    onChange={(e) => {
                      setSdata({
                        ...sdata,
                        [e.target.name]: e.target.value,
                      });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        end_date_check_now: checkDateNow(e?.target?.value),
                        common: "",
                      });
                    }}
                  />
                  {errors?.end_date_check_now ? (
                    <div className="date_error_check">
                      <ErrorShow
                        show_error={errors?.end_date_check_now}
                        errorText={t("_travel_s1.date_check")}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
              {sdata?.type_id === "1" && sdata?.start_date ? (
                <div>
                  <Input
                    label={t("_travel_s1.multi")}
                    placeholder={""}
                    is_icon={false}
                    value={sdata?.multi_id}
                    is_error={errors?.multi_id}
                    name="multi_id"
                    onChange={(e) => {
                      const endDate = new Date(sdata?.start_date);
                      endDate.setDate(endDate.getDate() + 90);
                      const year = endDate.getFullYear();
                      const month = String(endDate.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const day = String(endDate.getDate()).padStart(2, "0");
                      const formattedDate = `${year}-${month}-${day}`;
                      setSdata({
                        ...sdata,
                        [e.target.name]: e.target.value,
                        end_date: formattedDate,
                      });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                    options={multiDays?.map((item) => ({
                      value: item?.id,
                      label: item?.name,
                      days: item?.days,
                    }))}
                  />
                </div>
              ) : null}
            </div>
            {/* {console.log("sdata", sdata)} */}

            <div className="select_target">
              <Input
                label={t("_travel_s1.activity")}
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
            <div className="select_target">
              <Input
                label={t("_travel_s1.group")}
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
          <div className="btns">
            <Btn>{t("_travel_s1.btn")}</Btn>
          </div>
          {errors?.common ? (
            <div className="date_error_check">
              <ErrorShow
                show_error={errors?.common}
                errorText={errors?.common}
              />
            </div>
          ) : null}
        </form>
      </Forma>
    </Step_1Sytle>
  );
};

export default Step_1;

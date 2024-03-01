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
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
const Step_3Sytle = styled.div`
  & .row {
    & .items {
      & > .item {
        display: flex;
        & > span.icon {
          margin-top: 2px;
        }
      }
    }
  }
  & .price_travel {
    font-weight: bold;
    font-size: 18px;
    color: #5b5a5a;
    padding-top: 10px;
    & .price_value {
      color: #00aa58;
    }
  }
`;
const ItemProgramStyle = styled.div`
  & .NAME {
    font-weight: bold;
  }
  & .OTV {
    color: #00aa58;
    font-weight: bold;
  }
  & .MEDEX,
  & .ACCIDENT,
  & .COVID,
  & .EVACUATION,
  & .TRANSPORT,
  & .COMPENSATION {
    font-size: 14px;
  }
`;
const ItemProgram = ({ obj }) => {
  const { t } = useTranslation();
  return (
    <ItemProgramStyle>
      <div className="NAME">{obj?.NAME}</div>
      <div className="OTV">
        {t("_travel_s3.OTV")}: {obj?.OTV} {t("_travel_s3.EUR")}
      </div>
      <div className="MEDEX">
        {t("_travel_s3.MEDEX")}: {obj?.MEDEX} {t("_travel_s3.EUR")}
      </div>
      <div className="ACCIDENT">
        {t("_travel_s3.ACCIDENT")}: {obj?.ACCIDENT} {t("_travel_s3.EUR")}
      </div>
      <div className="COVID">
        {t("_travel_s3.COVID")}: {obj?.COVID} {t("_travel_s3.EUR")}
      </div>
      <div className="EVACUATION">
        {t("_travel_s3.EVACUATION")}: {obj?.EVACUATION} {t("_travel_s3.EUR")}
      </div>
      <div className="TRANSPORT">
        {t("_travel_s3.TRANSPORT")}: {obj?.TRANSPORT} {t("_travel_s3.EUR")}
      </div>
      <div className="COMPENSATION">
        {t("_travel_s3.COMPENSATION")}: {obj?.OTCOMPENSATIONV}{" "}
        {t("_travel_s3.EUR")}
      </div>
    </ItemProgramStyle>
  );
};
const Step_3 = ({
  setStep,
  step,
  sdata,
  setSdata,
  setInsuranceData,
  insuranceData,
  programs = [],
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const getToday = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    return `${currentDate}.${currentMonth}.${currentYear}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setStep(4);
  };
  const onCalckPrice = (program_id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {},
      step1 = { day: 1 };
    if (!sdata?.countrys?.length) {
      tt = false;
      err = { ...err, countrys: true };
    }
    // if (sdata?.program_id) {
    //   step1 = { ...step1, program_id: sdata.program_id };
    // } else {
    //   tt = false;
    //   err = { ...err, program_id: true };
    // }
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
      // tt = false;
      // err = { ...err, multi_id: true };
      step1 = { ...step1, multi_id: 1 };
    }
    const today = getToday();
    step1 = { ...step1, program_id: program_id, date_reg: today };
    if (tt) {
      Axios()
        .post("api/v1/travel/price/initial", step1)
        .then((r) => {
          if (r?.data?.data?.COST_USD) {
            setInsuranceData({
              ...insuranceData,
              step1: { ...sdata, program_id: program_id },
              step1_result: r?.data?.data,
              show_result: true,
              program: programs.find((o) => o?.ID === program_id),
            });
            // setStep(4);
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
            setInsuranceData({
              ...insuranceData,
              step1: { ...sdata, program_id: program_id },
              show_result: false,
            });
          }
        })
        .catch((e) => {
          setErrors({
            ...errors,
            common: e?.response?.data?.message ?? t("auth.system_err"),
          });
          setInsuranceData({
            ...insuranceData,
            step1: { ...sdata, program_id: program_id },
            show_result: false,
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      console.log("err", err);
      setErrors({
        ...err,
        common: t("_travel_s3.valid_err"),
      });
      setInsuranceData({
        ...insuranceData,
        step1: { ...sdata, program_id: program_id },
        show_result: false,
      });
      dispatch({ type: "SET_LOADING", payload: false });
      const firstError = document.querySelector(".is_error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <Step_3Sytle>
      <Forma
        title={t("_travel_s3.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        <form onSubmit={onSubmit}>
          <div className="row">
            <CheckBox
              label={""}
              items={programs.map((o) => ({
                id: o?.ID,
                // name: o?.NAME,
                name: <ItemProgram obj={o} />,
              }))}
              name="program_id"
              value={sdata?.program_id}
              is_error={errors?.program_id}
              onChange={(v) => {
                setSdata({ ...sdata, [v.name]: v.value });
                setErrors({ ...errors, common: "", [v.name]: false });
                onCalckPrice(v.value);
              }}
            />
          </div>
          {errors?.common ? (
            <div className="date_error_check">
              <ErrorShow
                show_error={errors?.common}
                errorText={errors?.common}
              />
            </div>
          ) : null}
          {insuranceData?.show_result ? (
            <>
              <div className="price_travel">
                {t("_travel_s3.price")}{" "}
                <span className="price_value">
                  {insuranceData?.step1_result?.COST_UZS} {t("_travel_s3.sum")}
                </span>
              </div>
              <div className="btns">
                <Btn>{t("_travel_s3.btn")}</Btn>
              </div>
            </>
          ) : null}
        </form>
      </Forma>
    </Step_3Sytle>
  );
};

export default Step_3;

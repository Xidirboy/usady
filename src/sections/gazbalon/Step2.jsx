import React, { useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import Axios from "../../utils/httpClient";
import { Btn } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { get } from "lodash";
import Beneficiary from "./Beneficiary";
import Insurant from "./Insurant";
import ErrorShow from "../formSections/ErrorShow";
const Step2Sytle = styled.div``;
const Step2 = ({
  setLoading,
  step,
  setStep,
  insuranceData,
  setInsuranceData,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const createInsurance = () => {
    // e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let idata = {
      insurant: {
        inn: get(insuranceData, "insurant.inn", ""),
        pinfl: get(insuranceData, "insurant_result.PINFL", ""),
        passport: `${get(insuranceData, "insurant.passportSeries", "")}${get(
          insuranceData,
          "insurant.passportNumber",
          ""
        )}`,
        full_name: `${get(
          insuranceData,
          "insurant_result.FIRST_NAME",
          ""
        )} ${get(insuranceData, "insurant_result.LAST_NAME", "")} ${get(
          insuranceData,
          "insurant_result.MIDDLE_NAME",
          ""
        )}`,
        phone: get(insuranceData, "insurant.phone", ""),
        address: get(insuranceData, "insurant.address", ""),
        birth_date: dateFormat(get(insuranceData, "insurant.birthDate", "")),
        fizyur: 0,
      },
      beneficiary: {
        inn: get(insuranceData, "beneficiary.inn", ""),
        pinfl: get(insuranceData, "beneficiary_result.PINFL", ""),
        passport: `${get(insuranceData, "beneficiary.passportSeries", "")}${get(
          insuranceData,
          "beneficiary.passportNumber",
          ""
        )}`,
        full_name: `${get(
          insuranceData,
          "beneficiary_result.FIRST_NAME",
          ""
        )} ${get(insuranceData, "beneficiary_result.LAST_NAME", "")} ${get(
          insuranceData,
          "beneficiary_result.MIDDLE_NAME",
          ""
        )}`,
        phone: get(insuranceData, "beneficiary.phone", ""),
        address: get(insuranceData, "beneficiary.address", ""),
        birth_date: dateFormat(get(insuranceData, "beneficiary.birthDate", "")),
        fizyur: 0,
      },
      vehicle: {
        reg_number: get(insuranceData, "step1.gov_number", ""),
        tech_seria: get(insuranceData, "step1.tech_passport_seria", ""),
        tech_number: get(insuranceData, "step1.tech_passport_number", ""),
        marka_id: get(insuranceData, "step1_result.marka_id", ""),
        model_id: get(insuranceData, "step1_result.model_id", ""),
        type_id: get(insuranceData, "step1_result.vehicle_type_id", ""),
        tech_date: get(
          insuranceData,
          "step1_result.tech_passport_issue_date",
          ""
        ),
        year: get(insuranceData, "step1_result.issue_year", ""),
        body_number: get(insuranceData, "step1_result.body_number", ""),
        engine_number: get(insuranceData, "step1_result.engine_number", ""),
        price: 0,
      },
      s_date: getToday(),
      promo_code: get(insuranceData, "promo_code", ""),
    };
    Axios()
      .post("api/v1/gazbalon/create", idata)
      .then((r) => {
        if (r?.data?.data?.anketa_id) {
          const ii_data = JSON.parse(r?.data?.data?.data ?? "{}");
          const ii_response = JSON.parse(r?.data?.data?.response ?? "{}");
          setInsuranceData({
            ...insuranceData,
            insuranceObj: {
              ...(r?.data?.data ?? {}),
              data: ii_data,
              response: ii_response,
            },
          });
          setErrors({
            ...errors,
            common: "",
          });
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setStep(3);
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
          common:
            e?.response?.data?.data?.ERROR_MESSAGE ?? t("auth.system_err"),
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  const getToday = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    return `${currentDate}.${currentMonth}.${currentYear}`;
  };
  const dateFormat = (d = "") => {
    const dl = d.split("-");
    return `${dl[2]}.${dl[1]}.${dl[0]}`;
  };
  return (
    <Step2Sytle>
      <Forma title={t("osogo_step2.s2_title")}>
        <Beneficiary
          insuranceData={insuranceData}
          setInsuranceData={setInsuranceData}
        />
        {get(insuranceData, "beneficiary_result.PINFL", false) ? (
          <>
            <Insurant
              insuranceData={insuranceData}
              setInsuranceData={setInsuranceData}
            />
            {get(insuranceData, "insurant_result.PINFL", false) ? (
              <>
                <div className="row">
                  <div className="number">
                    <Input
                      label={t("gaz_balon_step2.promo_code")}
                      placeholder=""
                      value={insuranceData?.promo_code}
                      is_icon={false}
                      name="promo_code"
                      onChange={(e) => {
                        setInsuranceData({
                          ...insuranceData,
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

                <div className="btns">
                  <Btn
                    type="button"
                    style={{ marginRight: 20 }}
                    onClick={createInsurance}
                  >
                    {t("gaz_balon_step2.submit")}
                  </Btn>
                </div>
              </>
            ) : null}
          </>
        ) : null}
        {/* {errors?.common ? (
          <div
            style={{ color: "red", padding: "0 0 20px 0" }}
            dangerouslySetInnerHTML={{ __html: errors?.common ?? "" }}
          />
        ) : null} */}
        <ErrorShow show_error={errors?.common} errorText={errors?.common} />
      </Forma>
    </Step2Sytle>
  );
};

export default Step2;

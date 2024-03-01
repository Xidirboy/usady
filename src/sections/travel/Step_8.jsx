import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Axios from "../../utils/httpClient";
const Step_8Style = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: center;
  & .step4_target {
    max-width: 880px;
    width: 100%;
    & .head {
      & div {
        text-align: center;
      }
    }
    & .payments {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 20px 0;
      & .payment {
        width: 300px;
        margin: 10px;
        text-align: center;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 20px;
        border-radius: 20px;
        cursor: pointer;
        color: #181818;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 2.5px;
        &:hover {
          color: #fff;
          background: rgb(0, 170, 88);
        }
      }
    }
  }
`;
const Step_8 = ({ step, setStep, setInsuranceData, insuranceData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  useEffect(() => {
    if (insuranceData?.anketa_id) {
      createMerchant();
    }
  }, [insuranceData?.anketa_id]);
  const createMerchant = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .get(`api/v1/travel/merchant-info?anketa_id=${insuranceData?.anketa_id}`)
      .then((r) => {
        if (r?.data?.status === 1) {
          setInsuranceData({
            ...insuranceData,
            step3_result: r?.data?.data ?? "",
          });
          // setStep(4);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          setErrors(r?.data?.message ?? t("auth.system_err"));
        }
      })
      .catch((e) => {
        setErrors(e?.response?.data?.message ?? t("auth.system_err"));
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  return (
    <Step_8Style>
      <Forma
        className="step4_target"
        title={t("_travel_s8.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        <div className="payments">
          <Link
            className="payment"
            to={insuranceData?.step3_result?.payme}
            target="blank"
          >
            {t("_travel_s8.payme")}
          </Link>
          <Link
            className="payment"
            to={insuranceData?.step3_result?.click}
            target="blank"
          >
            {t("_travel_s8.click")}
          </Link>
        </div>
      </Forma>
    </Step_8Style>
  );
};

export default Step_8;

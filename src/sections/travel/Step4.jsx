import React from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Step4Style = styled.div`
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
const Step4 = ({ data = {}, setStep, setInsuranceData, insuranceData }) => {
  const { t } = useTranslation();
  return (
    <Step4Style>
      <Forma className="step4_target" title={t("osogo_step4.title")}>
        <div className="payments">
          <Link className="payment" to={data?.payme} target="blank">
            {t("osogo_step4.payme")}
          </Link>
          <Link className="payment" to={data?.click} target="blank">
            {t("osogo_step4.click")}
          </Link>
        </div>
      </Forma>
    </Step4Style>
  );
};

export default Step4;

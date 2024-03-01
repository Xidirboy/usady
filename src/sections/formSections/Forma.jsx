import React from "react";
import styled from "styled-components";
import FormTitle from "./FormTitle";
import { Btn } from "../../styleComponents/GlobalStyle";
import { FaArrowLeft } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
const FormaStyle = styled.div`
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.1);
  & > .head {
    padding: 12px 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      padding: 8px 16px;
    }
    & .back_btn {
      padding: 10px;
      margin-left: 10px;
    }
  }
  & > .f_body {
    padding: 0 30px;
    @media (max-width: 576px) {
      padding: 0px 16px;
    }
  }
`;
const Forma = ({
  children,
  title = "",
  className = "",
  has_back = false,
  onBack = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <FormaStyle className={className}>
      <div className="head">
        <FormTitle word={title} />
        {has_back ? (
          <Tooltip hasArrow label={t("tooltips.back")}>
            <Btn
              className="back_btn"
              onClick={() => {
                onBack();
              }}
            >
              <FaArrowLeft />
            </Btn>
          </Tooltip>
        ) : null}
      </div>
      <div className="f_body">{children}</div>
    </FormaStyle>
  );
};

export default Forma;

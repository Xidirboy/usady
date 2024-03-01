import React from "react";
import styled from "styled-components";
import { RiErrorWarningFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
const ErrorShowStyele = styled.div`
  display: none;
  background-color: #ffefed;
  max-width: 350px;
  border-radius: 10px;
  padding: 10px 20px;
  color: #f75555;
  margin-top: 10px;
  align-items: center;
  justify-content: left;
  font-size: 400 !important;
  & .icon_err {
    padding-right: 15px;
    font-size: 20px;
  }
`;
const ErrorShow = ({ errorText = "", show_error = false }) => {
  const { t } = useTranslation();
  return (
    <div>
      {show_error ? (
        <ErrorShowStyele style={show_error ? { display: "flex" } : {}}>
          <span className="icon_err">
            <RiErrorWarningFill />
          </span>
          <span
            dangerouslySetInnerHTML={{
              __html: errorText?.length
                ? errorText
                : t("auth.default_error_text"),
            }}
          />
        </ErrorShowStyele>
      ) : null}
    </div>
  );
};

export default ErrorShow;

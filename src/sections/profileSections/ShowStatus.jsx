import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const ShowStatusStyle = styled.div`
  &.status_pay {
    color: orange;
  }
  &.status_success {
    color: #00aa58;
  }
  &.status_error {
    color: red;
  }
  &.status_created {
    color: blue;
  }
`;
const ShowStatus = ({ status = 0 }) => {
  const { t } = useTranslation();
  return (
    <ShowStatusStyle
      className={
        status === 3
          ? "status_pay"
          : status === 2
          ? "status_success"
          : status === -1
          ? "status_error"
          : "status_error"
      }
    >
      {status === 3
        ? t("my_polis.status_pay")
        : status === 2
        ? t("my_polis.status_success")
        : status === -1
        ? t("my_polis.status_error")
        : t("my_polis.status_created")}
    </ShowStatusStyle>
  );
};

export default ShowStatus;

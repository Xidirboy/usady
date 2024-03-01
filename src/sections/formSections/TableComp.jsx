import React from "react";
import styled from "styled-components";
const TableCompStyle = styled.div`
  display: block;
  width: 100%;
  border-radius: 20px;
  background: #fff;
  overflow-x: auto;
  box-shadow: rgba(0, 34, 125, 0.1) 0px 0px 20px 0px;
  & > table {
    min-width: 100%;
    & > thead {
      border-radius: 20px 20px 0px 0px;
      background: #3648aa;
      & td {
        padding: 20px;
        color: #fff;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 25px; /* 125% */
        letter-spacing: 1px;
        &:first-child {
          border-radius: 20px 0px 0px 0px;
        }
        &:last-child {
          border-radius: 0px 20px 0px 0px;
        }
      }
    }
    & > tbody {
      & tr {
        & td {
          padding: 20px;
          color: #5b5a5a;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: 27px; /* 150% */
          letter-spacing: 0.9px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        &:last-child {
          & td {
            border-bottom: none;
          }
        }
      }
    }
    & .nowrap {
      white-space: nowrap !important;
    }
  }
`;
const TableComp = ({ children }) => {
  return <TableCompStyle>{children}</TableCompStyle>;
};

export default TableComp;

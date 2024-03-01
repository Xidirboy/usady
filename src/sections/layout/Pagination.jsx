import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PaginationStyle = styled.div`
  border-top: 1px solid rgba(54, 72, 170, 0.3);
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 20px 0;
  & > .left,
  & > .right,
  & > .page {
    border: 1px solid rgba(54, 72, 170, 0.4);
    height: 40px;
    min-width: 40px;
    width: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3648aa;
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    /* line-height: 139.9%; */
    margin: 0 10px;
    cursor: pointer;
    &.current_page {
      border: 1px solid rgb(0, 170, 88);
      background-color: rgb(0, 170, 88);
      color: #fff;
      & path {
        fill: #fff !important;
      }
    }
    &:hover {
      border: 1px solid rgba(54, 72, 170, 1);
      background-color: rgba(54, 72, 170, 1);
      color: #fff;
      & path {
        fill: #fff !important;
      }
    }
  }
`;

const Pagination = ({
  path = "/",
  total = 1,
  current_page = 1,
  per_page = 25,
}) => {
  const pages = () => {
    let l = [];
    for (let i = 0; i < total / per_page; i++) {
      l.push(
        <Link
          to={`${path}?page=${i + 1}`}
          className={current_page === i + 1 ? "page current_page" : "page"}
        >
          {i + 1}
        </Link>
      );
    }
    return l;
  };
  return (
    <>
      <PaginationStyle>
        <Link
          className="left"
          to={`${path}?page=${current_page !== 1 ? current_page - 1 : 1}`}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.41475 13.723L0.202775 7.51715C0.129042 7.44327 0.076692 7.36324 0.0457243 7.27704C0.0147566 7.19085 -0.000481271 7.0985 1.02969e-05 7C1.03141e-05 6.90149 0.0152483 6.80915 0.0457244 6.72295C0.0762006 6.63676 0.128551 6.55673 0.202775 6.48285L6.41475 0.258576C6.58679 0.0861928 6.80185 1.18927e-06 7.05991 1.23439e-06C7.31797 1.27952e-06 7.53917 0.0923496 7.7235 0.277046C7.90783 0.461743 8 0.677222 8 0.923484C8 1.16975 7.90783 1.38523 7.7235 1.56992L2.30415 7L7.7235 12.4301C7.89554 12.6025 7.98157 12.815 7.98157 13.0677C7.98157 13.3203 7.8894 13.5388 7.70507 13.723C7.52074 13.9077 7.30568 14 7.05991 14C6.81413 14 6.59908 13.9077 6.41475 13.723Z"
              fill="#3648AA"
            />
          </svg>
        </Link>
        {pages()}
        <Link
          className="right"
          to={`${path}?page=${
            current_page < total / per_page ? current_page + 1 : current_page
          }`}
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.58525 13.723L7.79723 7.51715C7.87096 7.44327 7.92331 7.36324 7.95428 7.27704C7.98524 7.19085 8.00048 7.0985 7.99999 7C7.99999 6.90149 7.98475 6.80915 7.95428 6.72295C7.9238 6.63676 7.87145 6.55673 7.79723 6.48285L1.58525 0.258576C1.41321 0.0861928 1.19815 1.18927e-06 0.94009 1.23439e-06C0.682026 1.27952e-06 0.460828 0.0923496 0.276496 0.277046C0.0921651 0.461743 -8.35265e-07 0.677222 -7.92207e-07 0.923484C-7.4915e-07 1.16975 0.0921652 1.38523 0.276497 1.56992L5.69585 7L0.276499 12.4301C0.104456 12.6025 0.0184344 12.815 0.0184344 13.0677C0.0184345 13.3203 0.1106 13.5388 0.294932 13.723C0.479263 13.9077 0.694317 14 0.940092 14C1.18587 14 1.40092 13.9077 1.58525 13.723Z"
              fill="#3648AA"
            />
          </svg>
        </Link>
      </PaginationStyle>
    </>
  );
};

export default Pagination;

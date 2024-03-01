import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeToken } from "../../utils/tokenStorge";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/httpClient";
import CheckUser from "../layout/CheckUser";

const BarStyle = styled.div`
  width: 300px;
  padding-right: 20px;
  & > .t_bar {
    @media (max-width: 900px) {
      display: none;
    }
  }
`;

const BarLinksStyle = styled.div`
  & > .card {
    border-radius: 20px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 34, 125, 0.1);
    @media (max-width: 900px) {
      box-shadow: none;
      border-radius: 0px;
    }

    & > .link {
      display: block;
      width: 100%;
      color: #5b5a5a;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 27px;
      padding: 0 20px;
      cursor: pointer;
      @media (max-width: 900px) {
        padding: 0;
      }
      &:hover {
        color: #00aa58;
      }
      &.active {
        border-bottom: 3px solid #3648aa;
        background: #eff2fb;
        color: #3648aa;
        & > .title {
          border-bottom: 0 !important;
          & > .icon {
            & circle {
              fill: #3648aa;
            }
          }
        }
      }
      &:first-child {
        padding-top: 5px;
        border-radius: 20px 20px 0 0;
        @media (max-width: 900px) {
          border-radius: 0;
          padding-top: 0px;
        }
      }
      &:last-child {
        padding-bottom: 5px;
        border-bottom: 0;
        border-radius: 0 0 20px 20px;
        @media (max-width: 900px) {
          border-radius: 0;
          padding-bottom: 0px;
        }
        & > .title {
          border-bottom: 0 !important;
        }
      }
      & > .title {
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 10px 0;
        @media (max-width: 900px) {
          padding: 10px 20px;
        }

        & > .icon {
          padding-right: 20px;
        }
      }
    }
  }
`;
const iconBar = (
  <svg
    width="7"
    height="7"
    viewBox="0 0 7 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3.5" cy="3.5" r="3.5" fill="#00AA58" />
  </svg>
);
const BarLinks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logOut = () => {
    removeToken();
    dispatch({ type: "SET_USER", payload: {} });
    navigate("/");
  };
  return (
    <BarLinksStyle>
      <div className="card">
        <NavLink to="/profile" className={"link"} end={true}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.account")}
          </div>
        </NavLink>
        <NavLink to="/profile/my-insurances" className={"link"}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.my_insurances")}
          </div>
        </NavLink>
        <NavLink to="/profile/history-paid" className={"link"} end={true}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.history")}
          </div>
        </NavLink>
        {/* <NavLink to="/profile/notification" className={"link"} end={true}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.notification")}
          </div>
        </NavLink> */}
        <NavLink
          to="/profile/notification-common"
          className={"link"}
          end={true}
        >
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.notification")}
          </div>
        </NavLink>
        {/* <NavLink to="/profile/feedback" className={"link"} end={true}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.feedback")}
          </div>
        </NavLink> */}
        <NavLink to="/profile/appeals" className={"link"} end={true}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.appeals")}
          </div>
        </NavLink>
        {/* <NavLink to="/profile/office" className={"link"} end={true}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.office")}
          </div>
        </NavLink> */}
        {/* <NavLink to="/profile/claims" className={"link"} end={true}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.claims")}
          </div>
        </NavLink> */}
        <div className={"link"} onClick={logOut}>
          <div className="title">
            <span className="icon">{iconBar}</span>
            {t("profile.log_out")}
          </div>
        </div>
      </div>
    </BarLinksStyle>
  );
};
const Bar = ({ openBar, setOpenBar }) => {
  return (
    <>
      <CheckUser />
      <BarStyle>
        <div className="t_bar">
          <BarLinks />
        </div>
      </BarStyle>
      <Drawer
        placement={"left"}
        onClose={() => setOpenBar(false)}
        isOpen={openBar}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Link to="/">
              <img src="/images/logoH.svg" alt="Inson" style={{ width: 100 }} />
            </Link>
          </DrawerHeader>
          <DrawerBody style={{ padding: 0 }}>
            <BarLinks />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Bar;

import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import LanSelect from "./headerSections/LanSelect";
import { useDispatch, useSelector } from "react-redux";
import MobileTab from "./headerSections/MobileTab";
const HeaderStyle = styled.div`
  & .navs {
    border-bottom: 1px solid #235dff;
    @media (max-width: 900px) {
      border-bottom: none;
    }
    & .left_nav {
      padding: 20px 0;
      @media (max-width: 900px) {
        padding: 10px 0;
      }
      & .logo {
        & .logo_desktop {
          @media (max-width: 900px) {
            display: none;
          }
        }
        & .logo_mobile {
          display: none;
          @media (max-width: 900px) {
            display: block;
          }
        }
      }
    }
    & .right_nav {
      & .right_links {
        @media (max-width: 900px) {
          display: none;
        }
        & .r_link {
          font-size: 20px;
          font-weight: 500;
          line-height: 32px;
          letter-spacing: 0em;
          margin: 0 20px;
        }
      }
    }
  }
  & .second_navs {
    @media (max-width: 900px) {
      display: none;
    }
    & .item_left {
      & .item {
        font-size: 24px;
        font-weight: 500;
        line-height: 38px;
        letter-spacing: 0em;
        margin: 0 20px;
      }
      & .first_item {
        font-size: 24px;
        font-weight: 600;
        line-height: 38px;
        letter-spacing: 0em;
        color: #2b3f5a !important;
        margin-left: 0;
      }
    }
    & .item_right {
      & .user {
        cursor: pointer;
        & .user_icon {
          & img {
            width: 52px;
            height: 52px;
            border-radius: 50%;
            border: 1px solid #e0e0e0;
          }
        }
        & .user_name {
          margin: 20px 0;
          padding: 0 20px;
          & .top_text {
            font-size: 14px;
            font-weight: 500;
            line-height: 22px;
            letter-spacing: 0.2px;
          }
          & .name {
            font-size: 18px;
            font-weight: 700;
            line-height: 29px;
            letter-spacing: 0em;
          }
        }
        &:hover {
          & .user_icon {
            & img {
              border-color: var(--blue);
            }
          }
          & .name {
            color: var(--blue);
          }
        }
      }
      & .user_notification {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        border: 1px solid #e0e0e0;
        &:hover {
          border-color: var(--blue);
        }
      }
    }
  }
`;
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s);
  const showUserName = () => {
    if (user?.first_name || user?.last_name) {
      return `${user?.first_name} ${user?.last_name}`;
    } else {
      return `+${user?.name}`;
    }
  };
  return (
    <>
      <HeaderStyle className="container_main">
        <div className="ds_flex navs">
          <div className=" left_nav ">
            <Link to="/" className="logo">
              <img src="/images/logo.svg" className="logo_desktop" />
              <img src="/images/logoM.svg" className="logo_mobile" />
            </Link>
          </div>
          <div className="ds_flex right_nav">
            <div className="right_links">
              <NavLink to={"/contacts"} className={"r_link"}>
                Kонтакты
              </NavLink>
              <NavLink to={"/abaut"} className={"r_link"}>
                О компании
              </NavLink>
            </div>
            <div className="lan">
              <LanSelect />
            </div>
          </div>
        </div>
        <div className="ds_flex second_navs">
          <div className="item_left">
            <NavLink className="item first_item" to="/">
              Главная
            </NavLink>
            <NavLink className="item" to="/agets">
              Агенты
            </NavLink>
            <NavLink className="item" to="/my-applications">
              Мои заявки
            </NavLink>
            <NavLink className="item" to="/travel-agencies">
              Турфирмы
            </NavLink>
          </div>
          <div className="dc_flex item_right">
            {user?.id ? (
              <>
                <Link to="/profile" className="dc_flex user">
                  <div className="user_icon">
                    <img src="/images/profile/user.svg" alt="tripusk user" />
                  </div>
                  <div className="user_name">
                    <div className="top_text">Good morning! 🌤️</div>
                    <div className="name">{showUserName()}</div>
                  </div>
                </Link>
                <Link to="/notification" className="dc_flex user_notification">
                  <img
                    src="/images/profile/notificationHas.svg"
                    alt="notification user"
                  />
                </Link>
              </>
            ) : (
              <div className="dc_flex user">
                <div
                  className="user_name"
                  onClick={() => {
                    dispatch({ type: "SET_AUTH_MODAL", payload: true });
                  }}
                >
                  <div className="name">Войти</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </HeaderStyle>
      <MobileTab />
    </>
  );
};

export default Header;

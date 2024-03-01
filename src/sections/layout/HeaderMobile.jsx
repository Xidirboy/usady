import React, { useEffect } from "react";
import { HeaderMobileContainer } from "../../styleComponents/sections/LayoutStyle";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { find, get } from "lodash";
import ZoomSelect from "../utilsSections/header/ZoomSelect";
import LanSelect from "../utilsSections/header/LanSelect";
import { useTranslation } from "react-i18next";
import { issetToken } from "../../utils/tokenStorge";
import DarkMode from "../utilsSections/header/DarkMode";
import AudioDiktorBtn from "../utilsSections/header/AudioDiktorBtn";
import { useDispatch } from "react-redux";

const HeaderMobile = ({ menu = [], params = {}, setAuthModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [browserParms, setBrowserParms] = useState(params);
  useEffect(() => {
    setBrowserParms(params);
  }, [params]);
  const menuList = () => {
    let l = [],
      p_str = "";
    if (browserParms?.parent1) {
      l = get(find(menu, { slug: browserParms?.parent1 }), "childs", []);
      p_str = "/" + browserParms?.parent1;
      if (browserParms?.parent2) {
        l = get(find(l, { slug: browserParms?.parent2 }), "childs", []);
        p_str += "/" + browserParms?.parent2;
      } else {
        l = get(find(l, { slug: browserParms?.page_slug }), "childs", []);
        p_str += "/" + browserParms?.page_slug;
      }
    } else {
      if (browserParms?.page_slug) {
        l = get(find(menu, { slug: browserParms?.page_slug }), "childs", []);
        p_str = "/" + browserParms?.page_slug;
      } else {
        l = menu;
        p_str = "";
      }
    }
    return { list: l, p_str: p_str };
  };
  const openChild = (item_slug) => {
    if (browserParms?.parent1) {
    } else {
      if (browserParms?.page_slug) {
        setBrowserParms({
          parent1: browserParms?.page_slug,
          page_slug: item_slug,
        });
      } else {
        setBrowserParms({ page_slug: item_slug });
      }
    }
  };
  const openParent = () => {
    if (browserParms?.parent1) {
      setBrowserParms({
        parent1: null,
        parent2: null,
        page_slug: browserParms?.parent1,
      });
    } else {
      if (browserParms?.page_slug) {
        setBrowserParms({
          parent1: null,
          parent2: null,
          page_slug: null,
        });
      }
    }
  };
  return (
    <>
      <HeaderMobileContainer>
        <div className="m_container">
          <div className="top">
            <Link to="/" className="logo">
              <img src="/images/logoH.svg" alt="logo" />
            </Link>
            <div className="m_links">
              {/* <div className="location">Ташкент</div> */}
              <div className="lan">
                <LanSelect />
              </div>
            </div>
          </div>
        </div>
        <div className="bar">
          <NavLink to="/" className="bar_link">
            <div className="icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.7">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.18753 11.3788C4.03002 11.759 4 11.9533 4 12V20.0018C4 20.5529 4.44652 21 5 21H8V15C8 13.8954 8.89543 13 10 13H14C15.1046 13 16 13.8954 16 15V21H19C19.5535 21 20 20.5529 20 20.0018V12C20 11.9533 19.97 11.759 19.8125 11.3788C19.6662 11.0256 19.4443 10.5926 19.1547 10.1025C18.5764 9.1238 17.765 7.97999 16.8568 6.89018C15.9465 5.79788 14.9639 4.78969 14.0502 4.06454C13.5935 3.70204 13.1736 3.42608 12.8055 3.2444C12.429 3.05862 12.1641 3 12 3C11.8359 3 11.571 3.05862 11.1945 3.2444C10.8264 3.42608 10.4065 3.70204 9.94978 4.06454C9.03609 4.78969 8.05348 5.79788 7.14322 6.89018C6.23505 7.97999 5.42361 9.1238 4.8453 10.1025C4.55568 10.5926 4.33385 11.0256 4.18753 11.3788ZM10.3094 1.45091C10.8353 1.19138 11.4141 1 12 1C12.5859 1 13.1647 1.19138 13.6906 1.45091C14.2248 1.71454 14.7659 2.07921 15.2935 2.49796C16.3486 3.33531 17.4285 4.45212 18.3932 5.60982C19.3601 6.77001 20.2361 8.0012 20.8766 9.08502C21.1963 9.62614 21.4667 10.1462 21.6602 10.6134C21.8425 11.0535 22 11.5467 22 12V20.0018C22 21.6599 20.6557 23 19 23H16C14.8954 23 14 22.1046 14 21V15H10V21C10 22.1046 9.10457 23 8 23H5C3.34434 23 2 21.6599 2 20.0018V12C2 11.5467 2.15748 11.0535 2.33982 10.6134C2.53334 10.1462 2.80369 9.62614 3.12345 9.08502C3.76389 8.0012 4.63995 6.77001 5.60678 5.60982C6.57152 4.45212 7.65141 3.33531 8.70647 2.49796C9.2341 2.07921 9.77521 1.71454 10.3094 1.45091Z"
                    fill="#556C82"
                  />
                </g>
              </svg>
            </div>
            <div className="title">{t("head.home")}</div>
          </NavLink>
          <div className="bar_link" onClick={() => setShowMenu(true)}>
            <div className="icon">
              <svg
                width="25"
                height="19"
                viewBox="0 0 25 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M0 1.9C0 0.850659 0.839466 0 1.875 0H23.125C24.1605 0 25 0.850659 25 1.9C25 2.94934 24.1605 3.8 23.125 3.8H1.875C0.839466 3.8 0 2.94934 0 1.9Z"
                    fill="#556C82"
                  />
                  <path
                    d="M0 9.5C0 8.45066 0.839466 7.6 1.875 7.6H23.125C24.1605 7.6 25 8.45066 25 9.5C25 10.5493 24.1605 11.4 23.125 11.4H1.875C0.839466 11.4 0 10.5493 0 9.5Z"
                    fill="#556C82"
                  />
                  <path
                    d="M0 17.1C0 16.0507 0.839466 15.2 1.875 15.2H23.125C24.1605 15.2 25 16.0507 25 17.1C25 18.1493 24.1605 19 23.125 19H1.875C0.839466 19 0 18.1493 0 17.1Z"
                    fill="#556C82"
                  />
                </g>
              </svg>
            </div>
            <div className="title">{t("head.category")}</div>
          </div>
          <div
            className="bar_link"
            onClick={() => {
              dispatch({ type: "SET_SOS_MODAL", payload: true });
            }}
          >
            <div className="icon">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 14.5L19.1666 10.8333C19.0092 10.5773 18.7885 10.3662 18.5258 10.2202C18.2631 10.0742 17.9672 9.99841 17.6666 10H7.33329C7.03275 9.99841 6.73687 10.0742 6.47414 10.2202C6.21142 10.3662 5.99072 10.5773 5.83329 10.8333L3.99996 14.5L1.93329 16.42C1.84931 16.4979 1.78228 16.5923 1.7364 16.6972C1.69052 16.8022 1.66676 16.9155 1.66663 17.03V24.1667C1.66663 24.3877 1.75442 24.5996 1.9107 24.7559C2.06698 24.9122 2.27895 25 2.49996 25H5.83329C6.16663 25 6.66663 24.6667 6.66663 24.3333V23.3333H18.3333V24.1667C18.3333 24.5 18.6666 25 19 25H22.5C22.721 25 22.9329 24.9122 23.0892 24.7559C23.2455 24.5996 23.3333 24.3877 23.3333 24.1667V17.03C23.3332 16.9155 23.3094 16.8022 23.2635 16.6972C23.2176 16.5923 23.1506 16.4979 23.0666 16.42L21 14.5ZM7.49996 11.6667H17.5L19.1666 15H5.83329L7.49996 11.6667ZM8.33329 19.3333C8.33329 19.6667 7.83329 20 7.49996 20H3.99996C3.66663 20 3.33329 19.5 3.33329 19.1667V17.3333C3.49996 16.8333 3.83329 16.5 4.33329 16.6667L7.66663 17.3333C7.99996 17.3333 8.33329 17.8333 8.33329 18.1667V19.3333ZM21.6666 19.1667C21.6666 19.5 21.3333 20 21 20H17.5C17.1666 20 16.6666 19.6667 16.6666 19.3333V18.1667C16.6666 17.8333 17 17.3333 17.3333 17.3333L20.6666 16.6667C21.1666 16.5 21.5 16.8333 21.6666 17.3333V19.1667ZM13.5354 5.85821C13.4166 6.33335 12.9897 6.66667 12.5 6.66667C12.0102 6.66667 11.5833 6.33335 11.4645 5.85821L9.99996 0H15L13.5354 5.85821ZM1.83329 3L6.16663 0.5L7.7894 6.40101C7.91177 6.84599 7.70249 7.3154 7.28972 7.52179C6.91761 7.70784 6.4682 7.63491 6.17403 7.34074L1.83329 3ZM18.8333 0.5L23.1666 3L18.9156 7.39764C18.5722 7.7529 18.0329 7.8331 17.6009 7.59313C17.1527 7.34412 16.9383 6.81667 17.0856 6.32555L18.8333 0.5Z"
                  fill="#BE0000"
                />
              </svg>
            </div>
            <div className="title">{t("head.sos")}</div>
          </div>
          {issetToken() ? (
            <NavLink to="/profile" className="bar_link">
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M24.6593 25.5589C24.0895 23.9641 22.8341 22.5549 21.0876 21.5499C19.3412 20.5448 17.2013 20 15 20C12.7987 20 10.6588 20.5448 8.91239 21.5498C7.16595 22.5549 5.91049 23.9641 5.34074 25.5589"
                      stroke="#556C82"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <circle
                      cx="15"
                      cy="10"
                      r="5"
                      stroke="#556C82"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
              </div>
              <div className="title">{t("head.profile")}</div>
            </NavLink>
          ) : (
            <div className="bar_link" onClick={() => setAuthModal(true)}>
              <div className="icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M24.6593 25.5589C24.0895 23.9641 22.8341 22.5549 21.0876 21.5499C19.3412 20.5448 17.2013 20 15 20C12.7987 20 10.6588 20.5448 8.91239 21.5498C7.16595 22.5549 5.91049 23.9641 5.34074 25.5589"
                      stroke="#556C82"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <circle
                      cx="15"
                      cy="10"
                      r="5"
                      stroke="#556C82"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </g>
                </svg>
              </div>
              <div className="title">{t("head.profile")}</div>
            </div>
          )}
        </div>
        <div className={showMenu ? "m_menu show_menu" : "m_menu"}>
          <div className="head">
            <span className="t_back">
              {browserParms?.page_slug && (
                <button className="back_btn" onClick={() => openParent()}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1794 3.26872C15.7889 2.8782 15.1557 2.8782 14.7652 3.26872L8.12075 9.91319C6.94949 11.0844 6.94913 12.9833 8.11993 14.155L14.6903 20.7304C15.0808 21.1209 15.714 21.1209 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53243 12.7441C9.14191 12.3536 9.14191 11.7205 9.53243 11.3299L16.1794 4.68294C16.5699 4.29241 16.5699 3.65925 16.1794 3.26872Z"
                      fill="white"
                    />
                  </svg>
                  <span className="back">{t("head.back")}</span>
                </button>
              )}
            </span>
            <button
              className="close"
              onClick={() => {
                setShowMenu(false);
                setBrowserParms(params);
              }}
            >
              <svg
                width="35"
                height="35"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.5046 26.183C28.8128 26.4912 28.9859 26.9092 28.9859 27.3451C28.9859 27.781 28.8128 28.199 28.5046 28.5072C28.1963 28.8154 27.7783 28.9886 27.3424 28.9886C26.9066 28.9886 26.4885 28.8154 26.1803 28.5072L17.5001 19.8242L8.81705 28.5045C8.50884 28.8127 8.09082 28.9858 7.65495 28.9858C7.21907 28.9858 6.80105 28.8127 6.49284 28.5045C6.18463 28.1962 6.01147 27.7782 6.01147 27.3423C6.01147 26.9065 6.18463 26.4884 6.49284 26.1802L15.1758 17.5L6.49557 8.81696C6.18736 8.50875 6.01421 8.09072 6.01421 7.65485C6.01421 7.21897 6.18736 6.80095 6.49557 6.49274C6.80378 6.18453 7.2218 6.01138 7.65768 6.01138C8.09356 6.01138 8.51158 6.18453 8.81979 6.49274L17.5001 15.1757L26.1831 6.49137C26.4913 6.18316 26.9093 6.01001 27.3452 6.01001C27.7811 6.01001 28.1991 6.18316 28.5073 6.49137C28.8155 6.79958 28.9886 7.2176 28.9886 7.65348C28.9886 8.08936 28.8155 8.50738 28.5073 8.81559L19.8243 17.5L28.5046 26.183Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <div className="select_btns">
            <ZoomSelect />
            <DarkMode />
            <AudioDiktorBtn />
          </div>
          <div className="links">
            {menuList().list?.map((item, index) => (
              <div className="l_card" key={index}>
                <div className="l_link">
                  <NavLink
                    onClick={() => setShowMenu(false)}
                    to={`${menuList()?.p_str}/${item?.slug}`}
                    className="item"
                  >
                    {item?.title}
                  </NavLink>
                  {item?.childs?.length ? (
                    <button
                      className="childs"
                      onClick={() => openChild(item?.slug)}
                    >
                      <svg
                        width="10"
                        height="19"
                        viewBox="0 0 10 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.292867 17.7545C0.683393 18.145 1.31656 18.145 1.70708 17.7545L8.35154 11.11C9.5228 9.93875 9.52316 8.03989 8.35236 6.86818L1.78203 0.292795C1.39151 -0.0977287 0.75834 -0.0977287 0.367816 0.292795C-0.0227079 0.683319 -0.0227079 1.31648 0.367816 1.70701L6.93986 8.27905C7.33038 8.66958 7.33038 9.30274 6.93986 9.69326L0.292867 16.3403C-0.0976572 16.7308 -0.0976572 17.3639 0.292867 17.7545Z"
                          fill="#00AA58"
                        />
                      </svg>
                    </button>
                  ) : null}
                </div>
                {item?.childs?.length ? null : (
                  <div className="desc">{item?.body}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </HeaderMobileContainer>
    </>
  );
};

export default HeaderMobile;

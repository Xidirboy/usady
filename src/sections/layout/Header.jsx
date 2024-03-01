import React, { useState } from "react";
import { HeaderContainer } from "../../styleComponents/sections/LayoutStyle";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { find, get } from "lodash";
import HeaderMobile from "./HeaderMobile";
import ZoomSelect from "../utilsSections/header/ZoomSelect";
import LanSelect from "../utilsSections/header/LanSelect";
import { useTranslation } from "react-i18next";
import { issetToken } from "../../utils/tokenStorge";
import DarkMode from "../utilsSections/header/DarkMode";
import { Tooltip } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import AudioDiktorBtn from "../utilsSections/header/AudioDiktorBtn";
import { LuMenuSquare } from "react-icons/lu";
import SosModal from "./SosModal";
const Header = ({ setAuthModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { menu = [] } = useSelector((s) => s);
  const [openAll, setOpenAll] = useState(false);
  const params = useParams();
  const menuList = () => {
    let l = [],
      p_str = "";
    if (params?.parent1) {
      l = get(find(menu, { slug: params?.parent1 }), "childs", []);
      p_str = "/" + params?.parent1;
    } else {
      if (params?.page_slug) {
        l = get(find(menu, { slug: params?.page_slug }), "childs", []);
        p_str = "/" + params?.page_slug;
      } else {
        l = get(menu, "0.childs", []);
        p_str = "/" + get(menu, "0.slug", "");
      }
    }
    return { list: l, p_str: p_str };
  };
  return (
    <>
      <HeaderContainer>
        <div className="navs">
          <div className="navs1">
            <div className="nav_l">
              <Link to="/" className="logo">
                <img src="/images/logoH.svg" alt="logo" />
              </Link>
              <div className="links">
                {menu.map((item, index) => (
                  <NavLink to={`/${item?.slug}`} className="link" key={index}>
                    {item?.title}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="nav_r">
              <span className="select_btn">
                <ZoomSelect />
              </span>
              <span className="select_btn">
                <DarkMode />
              </span>
              <span className="select_btn">
                <AudioDiktorBtn />
              </span>
              <span className="lan">
                <LanSelect />
              </span>
              {/* <span className="icon_btn">
                <img src="/images/search.svg" alt="user" />
              </span> */}

              <Tooltip hasArrow label={t("tooltips.profile")}>
                {issetToken() ? (
                  <NavLink to="/profile" className="icon_btn">
                    <img src="/images/user.svg" alt="user" />
                  </NavLink>
                ) : (
                  <span className="icon_btn" onClick={() => setAuthModal(true)}>
                    <img src="/images/user.svg" alt="user" />
                  </span>
                )}
              </Tooltip>
            </div>
          </div>
          {menuList()?.list?.length ? (
            <div className="navs2">
              <div
                className="l_links"
                style={openAll ? { height: "auto" } : {}}
              >
                {menuList()?.list?.map((item, index) => (
                  <div className="link_t" key={index}>
                    <NavLink
                      to={`${menuList()?.p_str}/${item?.slug}`}
                      className="link"
                      end
                    >
                      {item?.title}
                    </NavLink>
                    {item?.childs?.length ? (
                      <div className="menu">
                        <div className="menu_target">
                          {item?.childs?.map((citem, cindex) => (
                            <NavLink
                              end
                              to={`${menuList()?.p_str}/${item?.slug}/${
                                citem?.slug
                              }`}
                              className="m_item light_item"
                              key={cindex}
                            >
                              <div
                                to={`${menuList()?.p_str}/${item?.slug}/${
                                  citem?.slug
                                }`}
                                className="m_link"
                              >
                                {citem?.title}
                              </div>
                              <div className="body">{citem?.body}</div>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="r_links">
                <div className="all_nav" onClick={() => setOpenAll(!openAll)}>
                  {openAll ? <IoClose /> : <LuMenuSquare />}
                  {/* Все */}
                </div>
                <button
                  className="sos_target"
                  onClick={() => {
                    dispatch({ type: "SET_SOS_MODAL", payload: true });
                  }}
                >
                  <div className="link_t">
                    <span className="link">
                      <span className="sos">{t("head.sos")}</span>
                      <span className="sos_text">{t("head.case")}</span>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mobile_nav">
          <HeaderMobile
            menu={menu}
            params={params}
            setAuthModal={setAuthModal}
          />
        </div>
      </HeaderContainer>
      <SosModal />
    </>
  );
};

export default Header;

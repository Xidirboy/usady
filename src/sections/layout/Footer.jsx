import React from "react";
import { FooterContainer } from "../../styleComponents/sections/LayoutStyle";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { get } from "lodash";

const Footer = () => {
  const { t } = useTranslation();
  const { footer } = useSelector((s) => s);
  return (
    <FooterContainer>
      <div className="footer">
        <div className="block logo_block">
          <Link to="/" className="img_t">
            <img src="/images/logoH.svg" alt="logo" />
          </Link>
          <div className="word">{t("footer.rights")}</div>
          <div className="apps">
            {get(footer, "icons", []).map((item, index) => (
              <Link to={item?.link} key={index} target="blank">
                <img src={item?.icon_full} alt={item?.link} />
              </Link>
            ))}
          </div>
        </div>
        <div className="link_block">
          <div className="f_links">
            {get(footer, "links", []).map((item, index) => (
              <Link to={item?.link} key={index} target="blank">
                {item?.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="block contact">
          {get(footer, "address", []).map((item, index) => (
            <div key={index}>
              <div className="phone_t">{item?.title}</div>
              <div className="phone">{item?.value}</div>
            </div>
          ))}
          <div className="apps m_apps">
            {get(footer, "icons", []).map((item, index) => (
              <Link to={item?.link} key={index} target="blank">
                <img src={item?.icon_full} alt="app" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;

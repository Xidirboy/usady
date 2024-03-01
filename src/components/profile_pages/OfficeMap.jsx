import React, { useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Bar from "../../sections/profileSections/Bar";
import { OfficeMapContainer } from "../../styleComponents/components/profile_pages_style/OfficeMapStyle";
import { useTranslation } from "react-i18next";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import OfficeMapSection from "../../sections/commonSections/OfficeMapSection";
import CheckUser from "../../sections/layout/CheckUser";
const OfficeMap = () => {
  const { t } = useTranslation();
  const [openBar, setOpenBar] = useState(false);
  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("profile.office")}
          navs={[{ title: t("profile.account"), link: "/profile" }]}
        />
        <OfficeMapContainer>
          <div className="top_title">
            <button className="bar_btn" onClick={() => setOpenBar(true)}>
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
                  ></path>
                  <path
                    d="M0 9.5C0 8.45066 0.839466 7.6 1.875 7.6H23.125C24.1605 7.6 25 8.45066 25 9.5C25 10.5493 24.1605 11.4 23.125 11.4H1.875C0.839466 11.4 0 10.5493 0 9.5Z"
                    fill="#556C82"
                  ></path>
                  <path
                    d="M0 17.1C0 16.0507 0.839466 15.2 1.875 15.2H23.125C24.1605 15.2 25 16.0507 25 17.1C25 18.1493 24.1605 19 23.125 19H1.875C0.839466 19 0 18.1493 0 17.1Z"
                    fill="#556C82"
                  ></path>
                </g>
              </svg>
            </button>
            <TitelBlack word={t("profile.title")} />
          </div>
          <div className="p_main">
            <Bar openBar={openBar} setOpenBar={setOpenBar} />
            <div className="content">
              <div className="content_card">
                <OfficeMapSection className={"target_map"} />
              </div>
            </div>
          </div>
        </OfficeMapContainer>
      </Layout>
    </>
  );
};

export default OfficeMap;

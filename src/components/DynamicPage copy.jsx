import { Suspense, lazy, useEffect, useState } from "react";
// import ActionVideo from "../sections/commonSections/ActionVideo";
import Banner from "../sections/commonSections/Banner";
import Cards from "../sections/commonSections/Cards";
import Cashback from "../sections/commonSections/Cashback";
import Counter from "../sections/commonSections/Counter";
import Counter2 from "../sections/commonSections/Counter2";
import FaqSection from "../sections/commonSections/Faq";
import FaqUser from "../sections/commonSections/FaqUser";
// import Historys from "../sections/commonSections/Historys";
import HomeSlider from "../sections/commonSections/HomeSlider";
import HomeSlider2 from "../sections/commonSections/HomeSlider2";
import Info from "../sections/commonSections/Info";
import Info2 from "../sections/commonSections/Info2";
import InsuranceTypes from "../sections/commonSections/InsuranceTypes";
import MobileApp from "../sections/commonSections/MobileApp";
// import Navigator from "../sections/commonSections/Navigator";
import NewsSection from "../sections/commonSections/NewsSection";
import Partners from "../sections/commonSections/Partners";
import Search from "../sections/commonSections/Search";
import Step from "../sections/commonSections/Step";
import Subscription from "../sections/commonSections/Subscription";
import TextShow from "../sections/commonSections/TextShow";
import TextSlider from "../sections/commonSections/TextSlider";
import UsefulServices from "../sections/commonSections/UsefulServices";
import Layout from "../sections/layout/Layout";
import Axios from "../utils/httpClient";
import { get } from "lodash";
import { useParams } from "react-router-dom";
import Docs from "../sections/commonSections/Docs";
import Loading from "../sections/utilsSections/Loading";
// import NotFountSection from "../sections/utilsSections/NotFountSection";
import { useTranslation } from "react-i18next";
import Application from "../sections/commonSections/Application";
import SmallSlider from "../sections/commonSections/SmallSlider";
// import License from "../sections/commonSections/License";

const NotFountSection = lazy(() =>
  import("../sections/utilsSections/NotFountSection")
);
const ActionVideo = lazy(() =>
  import("../sections/commonSections/ActionVideo")
);
const Navigator = lazy(() => import("../sections/commonSections/Navigator"));
const Historys = lazy(() => import("../sections/commonSections/Historys"));
const License = lazy(() => import("../sections/commonSections/License"));

const DynamicPage = () => {
  const { t, i18n } = useTranslation();
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(false);
  const [notFount, setNotFount] = useState(false);
  const params = useParams();
  useEffect(() => {
    getPageData(params?.page_slug ?? "home");
    return () => {
      document.title = t("site_name");
    };
  }, [params?.page_slug, i18n.language]);
  const getPageData = (page_slug = "home") => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLoading(true);
    setNotFount(false);
    Axios()
      .get(`api/v1/page?slug=${page_slug}`)
      .then((r) => {
        if (r?.data?.status === 1) {
          setPageData(r?.data ?? {});
          document.title = get(r, "data.data.title", "Inson");
        } else {
          setNotFount(true);
          document.title = t("404.head_title");
        }
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
        const hash = window.location.hash;
        if (hash) scrollToElement(hash);
        // const sections = document.querySelectorAll(".animated__section");
        // sections.forEach((section) => {
        //   const sectionTop = section.getBoundingClientRect().bottom;
        //   if (
        //     sectionTop < window.innerHeight
        //     // && sectionBottom >= 0
        //   ) {
        //     section.classList.add("animated__active");
        //   } else {
        //     section.classList.remove("animated__active");
        //   }
        // });
      });
  };

  // animated
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     const sections = document.querySelectorAll(".animated__section");
  //     sections.forEach((section) => {
  //       const sectionTop = section.getBoundingClientRect().bottom;
  //       // const sectionBottom = section.getBoundingClientRect().bottom;

  //       if (
  //         sectionTop < window.innerHeight
  //         // && sectionBottom >= 0
  //       ) {
  //         section.classList.add("animated__active");
  //       } else {
  //         section.classList.remove("animated__active");
  //       }
  //     });
  //   });
  // }, [pageData?.data, params?.page_slug]);

  useEffect(() => {
    // console.log("window.location.hash", window.location.hash);
    const hash = window.location.hash;
    if (hash) scrollToElement(hash);
  }, [window.location.hash]);
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId?.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // setTimeout(() => {
      //   element.scrollIntoView({ behavior: "smooth", block: "start" });
      // }, 1000);
    }
  };
  return (
    <>
      <Layout headerShow={true}>
        {loading ? (
          <Loading is_loading={loading} />
        ) : (
          <>
            {notFount ? (
              <Suspense>
                <NotFountSection />
              </Suspense>
            ) : (
              <>
                <Suspense>
                  <Navigator
                    active={get(pageData, "menu.title", "")}
                    navs={
                      get(pageData, "menu.parents.parents", null)
                        ? [
                            {
                              title: get(
                                pageData,
                                "menu.parents.parents.title",
                                ""
                              ),
                              link: `/${get(
                                pageData,
                                "menu.parents.parents.slug",
                                ""
                              )}`,
                            },
                            {
                              title: get(pageData, "menu.parents.title", ""),
                              link: `/${get(
                                pageData,
                                "menu.parents.parents.slug",
                                ""
                              )}/${get(pageData, "menu.parents.slug", "")}`,
                            },
                          ]
                        : get(pageData, "menu.parents", null)
                        ? [
                            {
                              title: get(pageData, "menu.parents.title", ""),
                              link: `/${get(
                                pageData,
                                "menu.parents.slug",
                                ""
                              )}`,
                            },
                          ]
                        : []
                    }
                  />
                </Suspense>
                {get(pageData, "data.items", []).map((section, sitem) => (
                  <div id={`block_${section?.id}`} key={"section_" + sitem}>
                    <div style={{ borderTop: "1px solid #000" }}>
                      Type: {section?.type} Id: {section?.id}
                    </div>
                    {section?.type === 0 ? (
                      <div className="animated__section">
                        <Partners data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 1 ? (
                      <div className="animated__section">
                        <Cashback data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 2 ? (
                      <div className="animated__section">
                        <Counter2 data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 3 ? (
                      <div className="animated__section">
                        <Counter data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 4 ? (
                      <div className="animated__section">
                        <Info data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 5 ? (
                      <div className="animated__section">
                        <Step data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 6 ? (
                      <div className="animated__section">
                        <TextShow data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 7 ? (
                      <div className="animated__section">
                        <UsefulServices data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 8 ? (
                      <div className="animated__section">
                        <InsuranceTypes data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 9 ? (
                      <div className="animated__section">
                        <ActionVideo data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 10 ? (
                      <div className="animated__section">
                        <Info2 data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 11 ? (
                      <div className="animated__section">
                        <TextSlider data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 12 ? (
                      <div className="animated__section">
                        <Banner data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 13 ? (
                      <div className="animated__section">
                        <Banner data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 14 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Historys data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 15 ? (
                      <div className="animated__section">
                        <HomeSlider
                          data={get(section, "items", {})}
                          block_id={get(section, "id", 0)}
                        />
                      </div>
                    ) : section?.type === 16 ? (
                      <div className="animated__section">
                        <HomeSlider2 data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 17 ? (
                      <div className="animated__section">
                        <Search data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 18 ? (
                      <div className="animated__section">
                        <Subscription data={section} />
                      </div>
                    ) : section?.type === 19 ? (
                      <div className="animated__section">
                        <Cards data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 20 ? (
                      <div className="animated__section">
                        <NewsSection data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 21 ? (
                      <div className="animated__section">
                        <FaqSection data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 22 ? (
                      <div className="animated__section">
                        <FaqUser data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 23 ? (
                      <div className="animated__section">
                        <MobileApp data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 24 ? (
                      <div className="animated__section">
                        <Docs data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 25 ? (
                      <div className="animated__section">
                        <Application data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 26 ? (
                      <div className="animated__section">
                        <SmallSlider data={get(section, "items", {})} />
                      </div>
                    ) : section?.type === 27 ? (
                      <div className="animated__section">
                        <License data={get(section, "items", {})} />
                      </div>
                    ) : null}
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </Layout>
    </>
  );
};
export default DynamicPage;

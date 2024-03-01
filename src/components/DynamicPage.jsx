import { Suspense, lazy, useEffect, useState } from "react";
// import Loading from "../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import Layout from "../sections/layout/Layout";
import Axios from "../utils/httpClient";
import { get } from "lodash";
import { useParams } from "react-router-dom";

const MapCard = lazy(() => import("../sections/commonSections/MapCard"));
const Banner = lazy(() => import("../sections/commonSections/Banner"));
const Cards = lazy(() => import("../sections/commonSections/Cards"));
const Cashback = lazy(() => import("../sections/commonSections/Cashback"));
const Counter = lazy(() => import("../sections/commonSections/Counter"));
const Counter2 = lazy(() => import("../sections/commonSections/Counter2"));
const FaqSection = lazy(() => import("../sections/commonSections/Faq"));
const FaqUser = lazy(() => import("../sections/commonSections/FaqUser"));
const HomeSlider = lazy(() => import("../sections/commonSections/HomeSlider"));
const HomeSlider2 = lazy(() =>
  import("../sections/commonSections/HomeSlider2")
);
const Info = lazy(() => import("../sections/commonSections/Info"));
const Info2 = lazy(() => import("../sections/commonSections/Info2"));
const InsuranceTypes = lazy(() =>
  import("../sections/commonSections/InsuranceTypes")
);
const MobileApp = lazy(() => import("../sections/commonSections/MobileApp"));
const NewsSection = lazy(() =>
  import("../sections/commonSections/NewsSection")
);
const Docs = lazy(() => import("../sections/commonSections/Docs"));

const Partners = lazy(() => import("../sections/commonSections/Partners"));
const Search = lazy(() => import("../sections/commonSections/Search"));
const Step = lazy(() => import("../sections/commonSections/Step"));
const Subscription = lazy(() =>
  import("../sections/commonSections/Subscription")
);
const TextShow = lazy(() => import("../sections/commonSections/TextShow"));
const TextSlider = lazy(() => import("../sections/commonSections/TextSlider"));
const UsefulServices = lazy(() =>
  import("../sections/commonSections/UsefulServices")
);
const NotFountSection = lazy(() =>
  import("../sections/utilsSections/NotFountSection")
);
const ActionVideo = lazy(() =>
  import("../sections/commonSections/ActionVideo")
);
const Navigator = lazy(() => import("../sections/commonSections/Navigator"));
const Historys = lazy(() => import("../sections/commonSections/Historys"));
const License = lazy(() => import("../sections/commonSections/License"));
const Application = lazy(() =>
  import("../sections/commonSections/Application")
);
const SmallSlider = lazy(() =>
  import("../sections/commonSections/SmallSlider")
);
const Loading = lazy(() => import("../sections/utilsSections/Loading"));

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
          <Suspense>
            <Loading is_loading={loading} />
          </Suspense>
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
                    {/* <div style={{ borderTop: "1px solid #000" }}>
                      Type: {section?.type} Id: {section?.id}
                    </div> */}
                    {section?.type === 0 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Partners data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 1 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Cashback data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 2 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Counter2 data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 3 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Counter data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 4 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Info data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 5 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Step data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 6 ? (
                      <div className="animated__section">
                        <Suspense>
                          <TextShow data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 7 ? (
                      <div className="animated__section">
                        <Suspense>
                          <UsefulServices data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 8 ? (
                      <div className="animated__section">
                        <Suspense>
                          <InsuranceTypes data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 9 ? (
                      <div className="animated__section">
                        <Suspense>
                          <ActionVideo data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 10 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Info2 data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 11 ? (
                      <div className="animated__section">
                        <Suspense>
                          <TextSlider data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 12 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Banner data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 13 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Banner data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 14 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Historys data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 15 ? (
                      <div className="animated__section">
                        <Suspense>
                          <HomeSlider
                            data={get(section, "items", {})}
                            block_id={get(section, "id", 0)}
                          />
                        </Suspense>
                      </div>
                    ) : section?.type === 16 ? (
                      <div className="animated__section">
                        <Suspense>
                          <HomeSlider2 data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 17 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Search data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 18 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Subscription data={section} />
                        </Suspense>
                      </div>
                    ) : section?.type === 19 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Cards data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 20 ? (
                      <div className="animated__section">
                        <Suspense>
                          <NewsSection data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 21 ? (
                      <div className="animated__section">
                        <Suspense>
                          <FaqSection data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 22 ? (
                      <div className="animated__section">
                        <Suspense>
                          <FaqUser data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 23 ? (
                      <div className="animated__section">
                        <Suspense>
                          <MobileApp data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 24 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Docs data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 25 ? (
                      <div className="animated__section">
                        <Suspense>
                          <Application data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 26 ? (
                      <div className="animated__section">
                        <Suspense>
                          <SmallSlider data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 27 ? (
                      <div className="animated__section">
                        <Suspense>
                          <License data={get(section, "items", {})} />
                        </Suspense>
                      </div>
                    ) : section?.type === 28 ? (
                      <div className="animated__section">
                        <Suspense>
                          <MapCard data={get(section, "items", {})} />
                        </Suspense>
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

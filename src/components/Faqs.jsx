import React, { useEffect, useState } from "react";
import Layout from "../sections/layout/Layout";
import Navigator from "../sections/commonSections/Navigator";
import { useTranslation } from "react-i18next";
import Axios from "../utils/httpClient";
import Loading from "../sections/utilsSections/Loading";
// import TitelBlack from "../sections/utilsSections/TitelBlack";
// import { NewViewContainer } from "../styleComponents/components/NewViewStyle";
import FaqUser from "../sections/commonSections/FaqUser";

const Faqs = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getData();
    getCategory();
  }, []);
  const getData = () => {
    setLoading(true);
    Axios()
      .get(`api/v1/faqs/list`)
      .then((r) => {
        setData(r?.data?.data);
      })
      .catch((e) => {})
      .finally(() => {
        // setLoading(false);
      });
  };
  const getCategory = () => {
    setLoading(true);
    Axios()
      .get(`api/v1/faq-categories/list`)
      .then((r) => {
        setCategory(r?.data?.data);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Layout>
        {loading ? (
          <Loading is_loading={loading} />
        ) : (
          <>
            <Navigator
              active={t("faqs.title")}
              //   navs={[{ title: t("news.title"), link: "/news" }]}
            />
            <div>
              <div className="target">
                <FaqUser
                  data={{
                    title: t("faqs.title"),
                    items: data,
                    categories: category,
                    image: "/images/faq.svg",
                  }}
                  is_all_btn={false}
                />
              </div>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

export default Faqs;

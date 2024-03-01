import React, { useEffect, useState } from "react";
import Layout from "../sections/layout/Layout";
import Navigator from "../sections/commonSections/Navigator";
import { useTranslation } from "react-i18next";
import Axios from "../utils/httpClient";
import { useParams } from "react-router-dom";
import Loading from "../sections/utilsSections/Loading";
import TitelBlack from "../sections/utilsSections/TitelBlack";
import { NewViewContainer } from "../styleComponents/components/NewViewStyle";
import Card from "../sections/formSections/Card";
import { IMG_URL } from "../utils/api";

const NewView = () => {
  const { t } = useTranslation();
  const params = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getData();
  }, []);
  const getData = () => {
    setLoading(true);
    Axios()
      .get(`api/v1/news/${params?.slug}/detail`)
      .then((r) => {
        setData(r?.data?.data);
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
              active={data?.title}
              navs={[{ title: t("news.title"), link: "/news" }]}
            />
            <NewViewContainer>
              <div className="target">
                <TitelBlack word={data?.title} className="title" />
                <Card>
                  <div className="img_target">
                    <img src={`${IMG_URL}${data?.image}`} alt={data?.title} />
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: data?.body }} />
                </Card>
              </div>
            </NewViewContainer>
          </>
        )}
      </Layout>
    </>
  );
};

export default NewView;

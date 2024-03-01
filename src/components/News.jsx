import { Link, useSearchParams } from "react-router-dom";
import Navigator from "../sections/commonSections/Navigator";
import Layout from "../sections/layout/Layout";
import TitelBlack from "../sections/utilsSections/TitelBlack";
import { NewsContainer } from "../styleComponents/components/NewsStyle";
import Pagination from "../sections/layout/Pagination";
import { useEffect, useState } from "react";
import Axios from "../utils/httpClient";
import Loading from "../sections/utilsSections/Loading";
import { IMG_URL } from "../utils/api";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";

const News = () => {
  const per_page = 24;
  const { t } = useTranslation();
  let [searchParams] = useSearchParams();
  const [list, setList] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getList();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [window.location.search]);
  const getList = () => {
    setLoading(true);
    Axios()
      .get(
        `api/v1/news/list?per_page=${per_page}&page=${searchParams.get("page")}`
      )
      .then((r) => {
        setList(r?.data?.data);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Layout>
        <Navigator
          active={t("news.title")}
          //   navs={[{ title: "Автострахование ", link: "/kosko" }]}
        />
        <NewsContainer>
          {loading ? (
            <Loading is_loading={loading} />
          ) : (
            <>
              <div className="card">
                <div className="head">
                  <TitelBlack word={t("news.title")} />
                  {/* <Link to="#">
                <BtnWhite>Все новости</BtnWhite>
              </Link> */}
                </div>

                <div className="items">
                  {list?.data?.map((item, index) => (
                    <div className="item" key={index}>
                      <Link to={`/news/${item?.slug}`}>
                        <div
                          className="image"
                          style={{
                            backgroundImage: `url(${IMG_URL}${item?.image})`,
                          }}
                        ></div>
                        <div className="date">
                          <Moment format="DD.MM.YYYY">
                            {item?.created_at}
                          </Moment>
                        </div>
                        <div
                          className="name"
                          dangerouslySetInnerHTML={{ __html: item?.title }}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
                <Pagination
                  path="/news"
                  total={list?.total}
                  current_page={list?.current_page}
                  per_page={list?.per_page}
                />
              </div>
            </>
          )}
        </NewsContainer>
      </Layout>
    </>
  );
};
export default News;

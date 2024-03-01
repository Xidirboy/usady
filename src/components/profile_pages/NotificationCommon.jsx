import React, { useEffect, useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Bar from "../../sections/profileSections/Bar";
import { useTranslation } from "react-i18next";
// import Card from "../../sections/formSections/Card";
import Axios from "../../utils/httpClient";
import { NotificationCommonContainer } from "../../styleComponents/components/profile_pages_style/NotificationCommonStyle";
import Loading from "../../sections/utilsSections/Loading";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import CheckUser from "../../sections/layout/CheckUser";

const NotificationCommon = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [openBar, setOpenBar] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    setListLoading(true);
    Axios()
      .get("api/v1/notification/list?type=1")
      .then((r) => {
        setData(r?.data);
      })
      .catch((e) => {})
      .finally(() => {
        setListLoading(false);
      });
  };
  const viewAll = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .post("api/v1/notification/read-all")
      .then((r) => {
        getList();
      })
      .catch((e) => {})
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  const checkView = (i_date = null) => {
    const read_date = new Date(data?.user_read);
    const item_date = new Date(i_date);
    return read_date > item_date;
  };
  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("profile.notification")}
          navs={[{ title: t("profile.account"), link: "/profile" }]}
        />
        <NotificationCommonContainer>
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
                {listLoading ? (
                  <Loading />
                ) : (
                  <>
                    <div className="head">
                      {t("profile.notification")}
                      <span className="all_check" onClick={() => viewAll()}>
                        <IoCheckmarkDoneSharp />
                      </span>
                    </div>
                    <div className="list">
                      {data?.data?.map((item, index) => (
                        <div className="item" key={index}>
                          <div className="i_head">
                            <div className="s1">
                              <div className="i_title">{item?.title}</div>
                              <div className="i_desc_mobile">{item?.desc}</div>
                            </div>
                            <div className="s2">
                              <div className="s2_t">
                                <div className="i_date">
                                  <Moment format="HH:mm DD-MM-YYYY">
                                    {item?.created_at}
                                  </Moment>
                                </div>
                                {checkView(item?.created_at) ? (
                                  <IoCheckmarkDoneSharp />
                                ) : (
                                  <IoCheckmarkSharp />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="i_desc">{item?.desc}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </NotificationCommonContainer>
      </Layout>
    </>
  );
};

export default NotificationCommon;

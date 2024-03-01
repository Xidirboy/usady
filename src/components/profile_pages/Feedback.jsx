import React, { useEffect, useState } from "react";
import { FeedbackContainer } from "../../styleComponents/components/profile_pages_style/FeedbackStyle";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Bar from "../../sections/profileSections/Bar";
import { useTranslation } from "react-i18next";
import Card from "../../sections/formSections/Card";
import FormTitle from "../../sections/formSections/FormTitle";
import { Btn } from "../../styleComponents/GlobalStyle";
import Input from "../../sections/formSections/Input";
import Stars from "../../sections/formSections/Stars";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/httpClient";
import TableComp from "../../sections/formSections/TableComp";
import Moment from "react-moment";
import Loading from "../../sections/utilsSections/Loading";
import { get } from "lodash";
import ErrorShow from "../../sections/formSections/ErrorShow";
import CheckUser from "../../sections/layout/CheckUser";

const Feedback = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const [pdata, setPdata] = useState({
    rate: 1,
    name: `${get(user, "first_name", "")} ${get(user, "last_name", "")}`,
    email: `user@mail.com`,
    phone: `${get(user, "name", "anonim")}`,
  });
  const [errors, setErrors] = useState({});
  const [list, setList] = useState({});
  const [openBar, setOpenBar] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!pdata?.name) {
      tt = false;
      err = { ...err, name: true };
    }
    if (!pdata?.email) {
      tt = false;
      err = { ...err, email: true };
    }
    if (!pdata?.phone) {
      tt = false;
      err = { ...err, phone: true };
    }
    if (!pdata?.body) {
      tt = false;
      err = { ...err, body: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/feedback/create", pdata)
        .then((r) => {
          if (r?.data?.data?.id) {
            setPdata({ rate: 1 });
            setList({ ...list, data: [r?.data?.data, ...(list?.data ?? [])] });
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            setErrors({
              ...errors,
              common: r?.data?.message ?? t("auth.system_err"),
            });
          }
        })
        .catch((e) => {
          setErrors({
            ...errors,
            common: e?.response?.data?.message ?? t("auth.system_err"),
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      setErrors(err);
      dispatch({ type: "SET_LOADING", payload: false });
      const firstError = document.querySelector(".is_error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  useEffect(() => {
    getFeedback();
  }, []);
  const getFeedback = () => {
    setListLoading(true);
    Axios()
      .get("api/v1/feedback/list")
      .then((r) => {
        setList(r?.data);
      })
      .catch((e) => {})
      .finally(() => {
        setListLoading(false);
      });
  };
  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("profile.feedback")}
          navs={[{ title: t("profile.account"), link: "/profile" }]}
        />
        <FeedbackContainer>
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
              <Card className="content_card">
                <FormTitle word={t("feedback.title")} />
                <div className="desc">{t("feedback.sub_text")}</div>
                <form className="form" onSubmit={onSubmit}>
                  {/* <div className="items">
                    <div className="item">
                      <Input
                        label={t("feedback.name")}
                        is_error={errors?.name}
                        is_icon={false}
                        value={pdata?.name}
                        name="name"
                        type="text"
                        onChange={(e) => {
                          setPdata({
                            ...pdata,
                            [e.target.name]: e.target.value,
                          });
                          setErrors({
                            ...errors,
                            common: "",
                            [e.target.name]: false,
                          });
                        }}
                      />
                    </div>
                    <div className="item">
                      <Input
                        label={t("feedback.phone")}
                        type={"number"}
                        is_icon={false}
                        is_error={errors?.phone}
                        value={pdata?.phone}
                        name="phone"
                        mask="+998(nn) nnn-nn-nn"
                        onChange={(e) => {
                          setPdata({
                            ...pdata,
                            [e.target.name]: e.target.value,
                          });
                          setErrors({
                            ...errors,
                            common: "",
                            [e.target.name]: false,
                          });
                        }}
                      />
                    </div>
                    <div className="item">
                      <Input
                        label={t("feedback.email")}
                        is_error={errors?.email}
                        is_icon={false}
                        value={pdata?.email}
                        name="email"
                        onChange={(e) => {
                          setPdata({
                            ...pdata,
                            [e.target.name]: e.target.value,
                          });
                          setErrors({
                            ...errors,
                            common: "",
                            [e.target.name]: false,
                          });
                        }}
                      />
                    </div>
                  </div> */}
                  <div className="items">
                    <div className="item">
                      <Input
                        label={t("feedback.body")}
                        is_icon={false}
                        value={pdata?.body}
                        is_error={errors?.body}
                        name="body"
                        type="textarea"
                        onChange={(e) => {
                          setPdata({
                            ...pdata,
                            [e.target.name]: e.target.value,
                          });
                          setErrors({
                            ...errors,
                            common: "",
                            [e.target.name]: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="itams">
                    <div className="item">
                      <Stars
                        value={pdata?.rate}
                        onChange={(v) => {
                          setPdata({
                            ...pdata,
                            rate: v,
                          });
                          setErrors({
                            ...errors,
                            common: "",
                            rate: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                  {/* <div>
                    {errors?.common && (
                      <div style={{ color: "red" }}>{errors?.common}</div>
                    )}
                  </div> */}

                  <ErrorShow
                    show_error={errors?.common}
                    errorText={errors?.common}
                  />
                  <div className="btns">
                    <Btn>{t("feedback.btn")}</Btn>
                  </div>
                </form>
              </Card>
              {listLoading ? (
                <Loading is_loading={listLoading} />
              ) : (
                <>
                  {list?.data?.length && (
                    <TableComp>
                      <table>
                        <thead>
                          <tr>
                            <td>{t("feedback.name")}</td>
                            <td>{t("feedback.rate")}</td>
                            <td>{t("feedback.phone")}</td>
                            <td>{t("feedback.email")}</td>
                            <td>{t("feedback.date")}</td>
                            <td>{t("feedback.body")}</td>
                          </tr>
                        </thead>
                        <tbody>
                          {list?.data?.map((item, index) => (
                            <tr key={index}>
                              <td>{item?.name}</td>
                              <td className="nowrap">
                                <Stars
                                  value={item?.rate}
                                  onChange={(v) => {}}
                                />
                              </td>
                              <td className="nowrap">{item?.phone}</td>
                              <td className="nowrap">{item?.email}</td>
                              <td>
                                <Moment format="DD.MM.YYYY">
                                  {item?.created_at}
                                </Moment>
                              </td>
                              <td>{item?.body}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableComp>
                  )}
                </>
              )}
            </div>
          </div>
        </FeedbackContainer>
      </Layout>
    </>
  );
};

export default Feedback;

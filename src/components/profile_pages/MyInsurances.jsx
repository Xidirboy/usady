import React, { useEffect, useState } from "react";
import { MyInsurancesContainer } from "../../styleComponents/components/profile_pages_style/MyInsurancesStyle";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Bar from "../../sections/profileSections/Bar";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import Moment from "react-moment";
import ShowStatus from "../../sections/profileSections/ShowStatus";
import Card from "../../sections/formSections/Card";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import CheckUser from "../../sections/layout/CheckUser";
const arrowIcon = (
  <svg
    width="16"
    height="9"
    viewBox="0 0 16 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7L7 8L9 8L9 7L7 7Z"
      fill="black"
    />
  </svg>
);
const icon = (
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
);
const MyInsurances = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [openBar, setOpenBar] = useState(false);
  const [pdata, setPdata] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [openBlock, setOpenBlock] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getMyInsurance();
    getNotification();
  }, []);
  const getMyInsurance = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .get(`api/v1/auth/my/polis`)
      .then((r) => {
        setPdata(r?.data?.data ?? {});
      })
      .catch((e) => {})
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  const getNotification = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .get(`api/v1/notification/list`)
      .then((r) => {
        setNotifications(r?.data?.data ?? []);
      })
      .catch((e) => {})
      .finally(() => {});
  };
  const limitShow = (d) => {
    const s = new Date(d);
    const n = new Date();
    const f = Math.floor((s - n) / (1000 * 60 * 60 * 24));
    return f;
  };
  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("profile.my_insurances")}
          navs={[{ title: t("profile.account"), link: "/profile" }]}
        />
        <MyInsurancesContainer>
          <div className="top_title">
            <button className="bar_btn" onClick={() => setOpenBar(true)}>
              {icon}
            </button>
            <TitelBlack word={t("profile.title")} />
          </div>
          <div className="p_main">
            <Bar openBar={openBar} setOpenBar={setOpenBar} />
            <div className="content">
              <div className="notifications">
                {notifications?.map((item, index) => (
                  <div className="notification" key={index}>
                    <div className="n_title">{t("my_polis.n_title")}</div>
                    <div className="n_row">
                      <div className="w-60">
                        <div className="n_text">
                          {t("my_polis.type_insurance")}:{" "}
                          {item?.type_insurance === 1
                            ? t("my_polis.travel")
                            : item?.type_insurance === 2
                            ? t("my_polis.gaz_balon")
                            : t("my_polis.osogo")}
                        </div>
                        <div className="n_text">
                          {t("my_polis.n_date")}:{" "}
                          <Moment format="DD.MM.YYYY">{item?.date}</Moment>
                        </div>
                        <div className="n_text">
                          {t("my_polis.n_limit")}: {limitShow(item?.date)}{" "}
                          {t("my_polis.day")}
                        </div>
                      </div>
                      <div className="w-40">
                        <Link
                          to={
                            item?.type_insurance === 1
                              ? `/insurance/travel-re-create/${item?.id}`
                              : item?.type_insurance === 2
                              ? `/insurance/gaz-balon-re-create/${item?.id}`
                              : `/insurance/osogo-re-create/${item?.id}`
                          }
                        >
                          <Btn className="n_btn">{t("my_polis.n_btn")}</Btn>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="btns" style={{ paddingBottom: 20 }}>
                <Btn onClick={() => setIsOpen(true)}>{t("my_polis.new")}</Btn>
                <Link to="/profile/my-insurances/old">
                  <BtnWhite onClick={() => setIsOpen(true)}>
                    {t("old_polis.btn")}
                  </BtnWhite>
                </Link>
              </div>
              {get(pdata, "osogo", [])?.length ||
              get(pdata, "travel", [])?.length ||
              get(pdata, "gaz_balon", [])?.length ? (
                <>
                  <div className="items">
                    {get(pdata, "osogo", [])?.map((item, index) => (
                      <div className="item" key={"osogo" + index}>
                        <div
                          className="i_head"
                          onClick={() => {
                            setOpenBlock(
                              openBlock === `osogo${item?.id}`
                                ? 0
                                : `osogo${item?.id}`
                            );
                          }}
                        >
                          <div
                            className={
                              openBlock === `osogo${item?.id}`
                                ? "name active_name"
                                : "name"
                            }
                          >
                            {t("my_polis.osogo")}
                          </div>
                          <div className="right">
                            <Link
                              to={item?.file}
                              className="download"
                              target="blank"
                            >
                              {t("my_polis.export_pdf")}
                            </Link>
                            <span
                              className={
                                openBlock === `osogo${item?.id}`
                                  ? "arrow openArrow"
                                  : "arrow"
                              }
                            >
                              {arrowIcon}
                            </span>
                          </div>
                        </div>
                        <div
                          className={
                            openBlock === `osogo${item?.id}`
                              ? "i_body i_open_body"
                              : "i_body"
                          }
                        >
                          <div className="row">
                            <div className="col">
                              <div>{t("my_polis.polis_type")}</div>
                              <div>{t("my_polis.anketa_id")}</div>
                              <div>{t("my_polis.contract_begin")}</div>
                            </div>
                            <div className="col_v">
                              <div>{t("my_polis.osogo")}</div>
                              <div>{item?.anketa_id ?? "____"}</div>
                              <div>
                                <Moment format="DD-MM-YYYY">
                                  {item?.contract_begin}
                                </Moment>
                              </div>
                              {/* <div>24.01.2024</div> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div>{t("my_polis.status")}</div>
                              <div>{t("my_polis.polis_number")}</div>
                              <div>{t("my_polis.polis_price")}</div>
                              <div style={{ paddingTop: 10 }}>
                                <Link
                                  to={`/insurance/osogo-re-create/${item?.id}${
                                    item?.status === 2
                                      ? `?id=${item?.anketa_id}`
                                      : ""
                                  }`}
                                >
                                  <Btn className="n_btn">
                                    {t("re_create.re_create")}
                                  </Btn>
                                </Link>
                              </div>
                              {/* <div>Покрытие:</div> */}
                            </div>
                            <div className="col_v">
                              <div>
                                <ShowStatus status={item?.status} />
                              </div>
                              <div>
                                {item?.polis_data?.polis_sery ?? "____"}{" "}
                                {item?.polis_data?.polis_number ?? "____"}
                              </div>
                              <div>
                                {item?.price ?? "____"} {t("my_polis.sum")}
                              </div>
                              {/* <div>10 000 000р.</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {get(pdata, "travel", [])?.map((item, index) => (
                      <div className="item" key={"travel" + index}>
                        <div
                          className="i_head"
                          onClick={() => {
                            setOpenBlock(
                              openBlock === `travel${item?.id}`
                                ? 0
                                : `travel${item?.id}`
                            );
                          }}
                        >
                          <div
                            className={
                              openBlock === `travel${item?.id}`
                                ? "name active_name"
                                : "name"
                            }
                          >
                            {t("my_polis.travel")}
                          </div>
                          <div className="right">
                            <Link
                              to={item?.file}
                              className="download"
                              target="blank"
                            >
                              {t("my_polis.export_pdf")}
                            </Link>
                            <span
                              className={
                                openBlock === `travel${item?.id}`
                                  ? "arrow openArrow"
                                  : "arrow"
                              }
                            >
                              {arrowIcon}
                            </span>
                          </div>
                        </div>
                        <div
                          className={
                            openBlock === `travel${item?.id}`
                              ? "i_body i_open_body"
                              : "i_body"
                          }
                        >
                          <div className="row">
                            <div className="col">
                              <div>{t("my_polis.polis_type")}</div>
                              <div>{t("my_polis.anketa_id")}</div>
                              <div>{t("my_polis.contract_begin")}</div>
                              {/* <div>Дата окончания:</div> */}
                            </div>
                            <div className="col_v">
                              <div>{t("my_polis.travel")}</div>
                              <div>{item?.anketa_id ?? "____"}</div>
                              <div>
                                <Moment format="DD-MM-YYYY">
                                  {item?.contract_begin}
                                </Moment>
                              </div>
                              {/* <div>24.01.2024</div> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div>{t("my_polis.status")}</div>
                              <div>{t("my_polis.polis_number")}</div>
                              <div>{t("my_polis.polis_price")}</div>
                              {/* <div>Покрытие:</div> */}
                              <div style={{ paddingTop: 10 }}>
                                <Link
                                  to={`/insurance/travel-re-create/${item?.id}${
                                    item?.status === 2
                                      ? `?id=${item?.anketa_id}`
                                      : ""
                                  }`}
                                >
                                  <Btn className="n_btn">
                                    {t("re_create.re_create")}
                                  </Btn>
                                </Link>
                              </div>
                            </div>
                            <div className="col_v">
                              <div>
                                <ShowStatus status={item?.status} />
                              </div>
                              <div>
                                {item?.polis_data?.polis_sery ?? "____"}{" "}
                                {item?.polis_data?.polis_number ?? "____"}
                              </div>
                              <div>
                                {item?.premium_uzs ?? "____"}{" "}
                                {t("my_polis.sum")}
                              </div>
                              {/* <div>10 000 000р.</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {get(pdata, "gaz_balon", [])?.map((item, index) => (
                      <div className="item" key={"gaz_balon" + index}>
                        <div
                          className="i_head"
                          onClick={() => {
                            setOpenBlock(
                              openBlock === `gaz_balon${item?.id}`
                                ? 0
                                : `gaz_balon${item?.id}`
                            );
                          }}
                        >
                          <div
                            className={
                              openBlock === `gaz_balon${item?.id}`
                                ? "name active_name"
                                : "name"
                            }
                          >
                            {t("my_polis.gaz_balon")}
                          </div>
                          <div className="right">
                            <Link
                              to={item?.file}
                              className="download"
                              target="blank"
                            >
                              {t("my_polis.export_pdf")}
                            </Link>
                            <span
                              className={
                                openBlock === `gaz_balon${item?.id}`
                                  ? "arrow openArrow"
                                  : "arrow"
                              }
                            >
                              {arrowIcon}
                            </span>
                          </div>
                        </div>
                        <div
                          className={
                            openBlock === `gaz_balon${item?.id}`
                              ? "i_body i_open_body"
                              : "i_body"
                          }
                        >
                          <div className="row">
                            <div className="col">
                              <div>{t("my_polis.polis_type")}</div>
                              <div>{t("my_polis.anketa_id")}</div>
                              <div>{t("my_polis.contract_begin")}</div>
                              {/* <div>Дата окончания:</div> */}
                            </div>
                            <div className="col_v">
                              <div>{t("my_polis.gaz_balon")}</div>
                              <div>{item?.anketa_id ?? "____"}</div>
                              <div>
                                <Moment format="DD-MM-YYYY">
                                  {item?.contract_begin}
                                </Moment>
                              </div>
                              {/* <div>24.01.2024</div> */}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div>{t("my_polis.status")}</div>
                              <div>{t("my_polis.polis_number")}</div>
                              <div>{t("my_polis.polis_price")}</div>
                              {/* <div>Покрытие:</div> */}
                              <div style={{ paddingTop: 10 }}>
                                <Link
                                  to={`/insurance/gaz-balon-re-create/${
                                    item?.id
                                  }${
                                    item?.status === 2
                                      ? `?id=${item?.anketa_id}`
                                      : ""
                                  }`}
                                >
                                  <Btn className="n_btn">
                                    {t("re_create.re_create")}
                                  </Btn>
                                </Link>
                              </div>
                            </div>
                            <div className="col_v">
                              <div>
                                <ShowStatus status={item?.status} />
                              </div>
                              <div>
                                {item?.polis_data?.polis_sery ?? "____"}{" "}
                                {item?.polis_data?.polis_number ?? "____"}
                              </div>
                              <div>
                                {item?.premium_uzs ?? "____"}{" "}
                                {t("my_polis.sum")}
                              </div>
                              {/* <div>10 000 000р.</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Card className="no_data">
                  <div className="text">{t("my_polis.no_active")}</div>
                  <div>
                    <Btn>{t("my_polis.new2")}</Btn>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </MyInsurancesContainer>
      </Layout>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={"xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent style={{ maxWidth: "95%", width: 550, borderRadius: 20 }}>
          <ModalHeader>
            <div
              style={{ textAlign: "center", fontSize: 28, color: "#00237e" }}
            >
              {t("my_polis.new")}
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <div style={{ paddingBottom: 20, textAlign: "center" }}>
                <Link to="/insurance/osogo">
                  <Btn>{t("my_polis.osogo")}</Btn>
                </Link>
              </div>
              <div style={{ paddingBottom: 20, textAlign: "center" }}>
                <Link to="/insurance/travel">
                  <Btn>{t("my_polis.travel")}</Btn>
                </Link>
              </div>
              {/* <div style={{ textAlign: "center" }}>
                <Link to="/insurance/gaz-balon">
                  <Btn>{t("my_polis.gaz_balon")}</Btn>
                </Link>
              </div> */}
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyInsurances;

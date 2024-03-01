import React, { useEffect, useState } from "react";
import { NotificationContainer } from "../../styleComponents/components/profile_pages_style/NotificationStyle";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Bar from "../../sections/profileSections/Bar";
import { useTranslation } from "react-i18next";
import Card from "../../sections/formSections/Card";
import Input from "../../sections/formSections/Input";
import { Btn } from "../../styleComponents/GlobalStyle";
import { useDispatch } from "react-redux";
import Axios from "../../utils/httpClient";
import Moment from "react-moment";
import TableComp from "../../sections/formSections/TableComp";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Loading from "../../sections/utilsSections/Loading";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import FormTitle from "../../sections/formSections/FormTitle";
import { forEach } from "lodash";
import ErrorShow from "../../sections/formSections/ErrorShow";
import CheckUser from "../../sections/layout/CheckUser";

const Notification = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [pdata, setPdata] = useState({});
  const [data, setData] = useState({});
  const [openBar, setOpenBar] = useState(false);
  const [isOpen, setIsOpen] = useState({});
  const [errors, setErrors] = useState({});
  const [list, setList] = useState({});
  const [listLoading, setListLoading] = useState(true);
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    setListLoading(true);
    Axios()
      .get("api/v1/notification/list")
      .then((r) => {
        setList(r?.data);
      })
      .catch((e) => {})
      .finally(() => {
        setListLoading(false);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!pdata?.type_insurance) {
      tt = false;
      err = { ...err, type_insurance: true };
    }
    if (!pdata?.email) {
      tt = false;
      err = { ...err, email: true };
    }
    if (!pdata?.date) {
      tt = false;
      err = { ...err, date: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/notification/create", pdata)
        .then((r) => {
          if (r?.data?.data?.id) {
            setPdata({});
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

  const onSubmitUpdate = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!isOpen?.type_insurance) {
      tt = false;
      err = { ...err, type_insurance: true };
    }
    if (!isOpen?.email) {
      tt = false;
      err = { ...err, email: true };
    }
    if (!isOpen?.date) {
      tt = false;
      err = { ...err, date: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/notification/update", isOpen)
        .then((r) => {
          if (r?.data?.data?.id) {
            setIsOpen({});
            const d = list?.data?.map((item) => {
              if (item?.id === r?.data?.data?.id) {
                return r?.data?.data ?? {};
              } else {
                return item;
              }
            });
            setList({ ...list, data: d });
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
  const deleteNotification = (id) => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .post("api/v1/notification/delete", { id: id })
      .then((r) => {
        if (r?.data?.status === 1) {
          let d = [];
          forEach(list?.data, (item) => {
            if (item?.id !== id) {
              d.push(item);
            }
          });
          setList({ ...list, data: d });
        }
      })
      .catch((e) => {})
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("profile.notification")}
          navs={[{ title: t("profile.account"), link: "/profile" }]}
        />
        <NotificationContainer>
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
                <div className="title">{t("notification.title")}</div>
                <div className="desc">{t("notification.desc")}</div>
                <form className="form" onSubmit={onSubmit}>
                  <div className="items">
                    <div className="item">
                      <Input
                        label={t("notification.type")}
                        is_error={errors?.type_insurance}
                        is_icon={false}
                        value={pdata?.type_insurance}
                        name="type_insurance"
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
                        options={[
                          { value: 1, label: t("notification.osogo") },
                          { value: 2, label: t("notification.kasgo") },
                          { value: 3, label: t("notification.gazbalon") },
                          { value: 4, label: t("notification.travel") },
                        ]}
                      />
                    </div>
                    <div className="item">
                      <Input
                        label={t("notification.date")}
                        type="date"
                        is_icon={false}
                        value={pdata?.date}
                        is_error={errors?.date}
                        name="date"
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
                        label={t("notification.email")}
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
                    <Btn>{t("notification.btn")}</Btn>
                  </div>
                </form>
              </Card>
              {listLoading ? (
                <Loading is_loading={listLoading} />
              ) : (
                <>
                  {list?.data?.length ? (
                    <TableComp>
                      <table>
                        <thead>
                          <tr>
                            <td>{t("notification.type")}</td>
                            <td>{t("notification.email")}</td>
                            <td>{t("notification.date")}</td>
                            <td></td>
                          </tr>
                        </thead>
                        <tbody>
                          {list?.data?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {+item?.type_insurance === 1
                                  ? t("notification.osogo")
                                  : +item?.type_insurance === 2
                                  ? t("notification.kasgo")
                                  : +item?.type_insurance === 3
                                  ? t("notification.gazbalon")
                                  : +item?.type_insurance === 4
                                  ? t("notification.travel")
                                  : item?.type_insurance}
                              </td>
                              <td className="nowrap">{item?.email}</td>
                              <td>
                                <Moment format="DD.MM.YYYY">
                                  {item?.date}
                                </Moment>
                              </td>
                              <td>
                                <div className="event_icons">
                                  <span
                                    onClick={() => setIsOpen(item)}
                                    className="edit"
                                  >
                                    <AiOutlineEdit />
                                  </span>
                                  <span
                                    className="delete"
                                    onClick={() => deleteNotification(item?.id)}
                                  >
                                    <AiOutlineDelete />
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TableComp>
                  ) : null}
                </>
              )}
            </div>
          </div>
        </NotificationContainer>
      </Layout>
      <Modal
        isOpen={isOpen?.id}
        onClose={() => setIsOpen({})}
        size={"xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent style={{ maxWidth: "95%", width: 650, borderRadius: 20 }}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormTitle word={t("notification.update")} className="title" />
            <form className="form" onSubmit={onSubmitUpdate}>
              <Input
                label={t("notification.type")}
                is_error={errors?.type_insurance}
                is_icon={false}
                value={isOpen?.type_insurance}
                name="type_insurance"
                onChange={(e) => {
                  setIsOpen({
                    ...isOpen,
                    [e.target.name]: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    common: "",
                    [e.target.name]: false,
                  });
                }}
                options={[
                  { value: 1, label: t("notification.osogo") },
                  { value: 2, label: t("notification.kasgo") },
                  { value: 3, label: t("notification.gazbalon") },
                  { value: 4, label: t("notification.travel") },
                ]}
              />
              <Input
                label={t("notification.date")}
                type="date"
                is_icon={false}
                value={isOpen?.date}
                is_error={errors?.date}
                name="date"
                onChange={(e) => {
                  setIsOpen({
                    ...isOpen,
                    [e.target.name]: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    common: "",
                    [e.target.name]: false,
                  });
                }}
              />
              <Input
                label={t("notification.email")}
                is_error={errors?.email}
                is_icon={false}
                value={isOpen?.email}
                name="email"
                onChange={(e) => {
                  setIsOpen({
                    ...isOpen,
                    [e.target.name]: e.target.value,
                  });
                  setErrors({
                    ...errors,
                    common: "",
                    [e.target.name]: false,
                  });
                }}
              />
              {/* <div className="error_text">{errors?.common}</div> */}
              <ErrorShow
                show_error={errors?.common}
                errorText={errors?.common}
              />
              <div className="btns" style={{ marginTop: 10 }}>
                <Btn>{t("profile.save")}</Btn>
              </div>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notification;

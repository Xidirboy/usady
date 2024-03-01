import React, { useEffect, useState } from "react";
import { AppealsContainer } from "../../styleComponents/components/profile_pages_style/AppealsStyle";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Bar from "../../sections/profileSections/Bar";
import { useTranslation } from "react-i18next";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import FormTitle from "../../sections/formSections/FormTitle";
import Input from "../../sections/formSections/Input";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import Loading from "../../sections/utilsSections/Loading";
import ErrorShow from "../../sections/formSections/ErrorShow";
import CheckUser from "../../sections/layout/CheckUser";

const Appeals = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openBar, setOpenBar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const [list, setList] = useState({});
  const [listLoading, setListLoading] = useState(true);
  const [openBlock, setOpenBlock] = useState(-1);
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
  const setLoading = (l = false) => {
    dispatch({ type: "SET_LOADING", payload: l });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let tt = true,
      err = {};
    if (!data?.body) {
      tt = false;
      err = { ...err, body: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/complains/create", data)
        .then((r) => {
          if (r?.data?.data?.id) {
            setData({});
            setList({ ...list, data: [r?.data?.data, ...(list?.data ?? [])] });
            setIsOpen(false);
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
          setLoading(false);
        });
    } else {
      setErrors(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    setListLoading(true);
    Axios()
      .get("api/v1/complains/list")
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
          active={t("profile.appeals")}
          navs={[{ title: t("profile.account"), link: "/profile" }]}
        />
        <AppealsContainer>
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
              {listLoading ? (
                <Loading is_loading={listLoading} />
              ) : (
                <>
                  <div className="btns">
                    <Btn onClick={() => setIsOpen(true)}>
                      {t("appeals.new")}
                    </Btn>
                    {/* <BtnWhite>Продлить страховку</BtnWhite> */}
                  </div>
                  <div className="items">
                    {list?.data?.map((item, index) => (
                      <div className="item" key={index}>
                        <div
                          className="i_head"
                          onClick={() => {
                            setOpenBlock(openBlock === item?.id ? 0 : item?.id);
                          }}
                        >
                          <div
                            className={
                              openBlock === item?.id
                                ? "name active_name"
                                : "name"
                            }
                          >
                            {t("appeals.number")} {index + 1}
                          </div>
                          <div className="right">
                            <span className="status">
                              {item?.status === 1
                                ? t("appeals.processed")
                                : item?.status === 2
                                ? t("appeals.answered")
                                : t("appeals.waiting")}
                            </span>
                            <span
                              className={
                                openBlock === item?.id
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
                            openBlock === item?.id
                              ? "i_body i_open_body"
                              : "i_body"
                          }
                        >
                          <div className="appeal">
                            <b>{t("appeals.appeal")}</b> {item?.body}
                          </div>
                          {item?.answer && (
                            <div className="answer">
                              <b>{t("appeals.answer")}</b> {item?.answer}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </AppealsContainer>
      </Layout>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size={"xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent style={{ maxWidth: "95%", width: 650, borderRadius: 20 }}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormTitle word={t("appeals.add")} className="title" />
            <form className="form" onSubmit={onSubmit}>
              <Input
                label={t("appeals.body")}
                is_disabled={false}
                is_icon={false}
                value={data?.body}
                is_error={errors?.body}
                name="body"
                type="textarea"
                onChange={(e) => {
                  setData({
                    ...data,
                    [e.target.name]: e?.target?.value ?? "",
                  });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: false,
                  });
                }}
              />
              {/* <div className="error_text">{errors?.common}</div> */}
              <ErrorShow
                show_error={errors?.common}
                errorText={errors?.common}
              />
              <div className="btns">
                <Btn>{t("appeals.btn")}</Btn>
              </div>
            </form>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Appeals;

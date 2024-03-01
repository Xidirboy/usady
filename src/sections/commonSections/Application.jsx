import React, { useState } from "react";
import TitelGreen from "../utilsSections/TitelGreen";
import Text from "../utilsSections/Text";
import { Btn } from "../../styleComponents/GlobalStyle";
import { Link } from "react-router-dom";
import { ApplicationContainer } from "../../styleComponents/sections/commonStyle/ApplicationStyle";
import ReactInputMask from "react-input-mask";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Application = ({ data = {} }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toast = useToast();
  const [app, setApp] = useState({});
  const [error, setError] = useState({});
  const postApp = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!app?.name) {
      tt = false;
      err = { ...err, name: true };
    }
    if (app?.phone?.replace("_", "")?.length !== 18) {
      tt = false;
      err = { ...err, phone: true };
    }
    if (tt) {
      Axios()
        .post(`api/v1/feedback-site/create`, {
          ...app,
          url: window?.location?.href ?? "",
        })
        .then((r) => {
          setApp({});
          setError({});
          toast({
            position: "top-right",
            title: `${t("feedback_section.msg_title")}`,
            description: `${t("feedback_section.msg_description")}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((r) => {})
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
      setError(err);
    }
  };
  return (
    <>
      <ApplicationContainer>
        <div className="card">
          <div className="section1">
            {data?.top_title && (
              <div
                className="top_text"
                dangerouslySetInnerHTML={{ __html: data?.top_title }}
              />
            )}
            <TitelGreen word={data?.title ?? ""} />
            <Text className="text" word={data?.desc ?? ""} />

            <div className="app_target">
              <form onSubmit={postApp}>
                <div className="form_row">
                  <label
                    className={
                      error?.name ? "input_target error" : "input_target"
                    }
                  >
                    <span className="label">{t("feedback_section.name")}</span>
                    <div>
                      <input
                        type="text"
                        className="f_input"
                        value={app?.name}
                        name="name"
                        onChange={(e) => {
                          setApp({ ...app, name: e.target.value });
                          setError({ ...error, name: false });
                        }}
                      />
                    </div>
                  </label>
                </div>
                <div className="form_row">
                  <label
                    className={
                      error?.phone ? "input_target error" : "input_target"
                    }
                  >
                    <span className="label">{t("feedback_section.phone")}</span>
                    <div>
                      <ReactInputMask
                        mask={"+998(nn) nnn-nn-nn"}
                        placeholder={""}
                        name={"phone"}
                        value={app?.phone}
                        onChange={(e) => {
                          setApp({ ...app, phone: e.target.value });
                          setError({ ...error, phone: false });
                        }}
                        alwaysShowMask={false}
                        className="f_input"
                        formatChars={{
                          n: "[0-9]",
                          a: "[A-Za-z]",
                          "*": "[A-Za-z0-9]",
                        }}
                      />
                    </div>
                  </label>
                  <Btn type="submit" className="send">
                    {t("feedback_section.send")}
                  </Btn>
                </div>
              </form>
            </div>
            <div className="btns">
              {data?.buttons
                ?.filter((o) => o.status === 1)
                ?.map((btn, index) => (
                  <Link to={btn?.link} key={index}>
                    <Btn
                      className="btn"
                      style={{
                        background: btn?.background_color,
                        color: btn?.color,
                        borderColor: btn?.color,
                      }}
                      dangerouslySetInnerHTML={{ __html: btn?.title }}
                    />
                  </Link>
                ))}
            </div>
          </div>
          <div className="section2">
            <img src={data?.image ?? ""} alt={data?.title ?? ""} />
          </div>
        </div>
      </ApplicationContainer>
    </>
  );
};

export default Application;

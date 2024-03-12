import React, { useState } from "react";
import InputUi from "../../formSections/InputUi";
import { Btn } from "../../../styleComponents/GlobalStyle";
import { lockIcon, phoneIcon, userIcon } from "../../../assets/authIcons";
import { AuthStyle } from "./AuthStyle";
import PinInputUi from "../../formSections/PinInputUi";
import Axios from "../../../utils/httpClient";
import { useDispatch } from "react-redux";
import { removeToken, setToken } from "../../../utils/tokenStorge";
const AcceptSms = ({ setAction }) => {
  const dispatch = useDispatch();
  const [sdata, setSdata] = useState({});
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!sdata?.password) {
      tt = false;
      err = { ...err, password: true };
    }
    if (!sdata?.password_confirm) {
      tt = false;
      err = { ...err, password_confirm: true };
    } else {
      if (sdata?.password_confirm !== sdata?.password) {
        tt = false;
        err = { ...err, password_confirm: true, password: true };
      }
    }
    if (tt) {
      Axios()
        .post(`api/v1/auth/set-password`, sdata)
        .then((r) => {
          // removeToken();
          setAction(1);
          dispatch({ type: "SET_USER", payload: r?.data?.user ?? {} });
          dispatch({ type: "SET_AUTH_MODAL", payload: false });
        })
        .catch((e) => {})
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      setErrors({ ...errors, ...err });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const onCheckSmsCode = (sms_code) => {
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (tt) {
      Axios()
        .post(`api/v1/auth/accept`, {
          name: sessionStorage.getItem("name"),
          sms_code: sms_code,
        })
        .then((r) => {
          setStep(2);
          setToken(r?.data?.access_token);
          dispatch({ type: "SET_USER", payload: r?.data?.user ?? {} });
        })
        .catch((e) => {})
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      setErrors({ ...errors, ...err });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  return (
    <AuthStyle>
      <form onSubmit={onSubmit}>
        <PinInputUi
          is_disabled={step > 1}
          value={sdata?.sms_code}
          onChange={(e) => {
            console.log(e);
            setSdata({ ...sdata, sms_code: e });
            if (e?.length === 4) {
              onCheckSmsCode(e);
            }
          }}
        />
        {step > 1 ? (
          <div className="set_password">
            <InputUi
              label="Введите новый пароль"
              placeholder="Пароль"
              type="password"
              icon={lockIcon}
              name="password"
              value={sdata?.password}
              is_error={errors?.password}
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e?.target?.name]: e?.target?.value,
                  common: "",
                });
                setErrors({
                  ...errors,
                  [e?.target?.name]: false,
                  common: "",
                });
              }}
            />
            <InputUi
              label="Повторите пароль"
              placeholder="Пароль"
              type="password"
              icon={lockIcon}
              name="password_confirm"
              value={sdata?.password_confirm}
              is_error={errors?.password_confirm}
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e?.target?.name]: e?.target?.value,
                  common: "",
                });
                setErrors({
                  ...errors,
                  [e?.target?.name]: false,
                  common: "",
                });
              }}
            />
            <Btn>Отправка</Btn>
          </div>
        ) : null}
      </form>
      {step === 1 ? (
        <div className="auth_bottom_section">
          <div className="info_text">
            +{sessionStorage.getItem("name")}
            <button className="auth_btn" onClick={() => setAction(2)}>
              Поменять номер
            </button>
            <br />
            Не получили СМС ?
            <br />
            Отправить новый код через <button className="auth_btn">
              52
            </button>{" "}
            секунды.
          </div>
        </div>
      ) : null}
    </AuthStyle>
  );
};

export default AcceptSms;

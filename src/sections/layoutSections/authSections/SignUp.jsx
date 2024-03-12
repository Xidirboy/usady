import React, { useState } from "react";
import InputUi from "../../formSections/InputUi";
import { Btn } from "../../../styleComponents/GlobalStyle";
import { lockIcon, phoneIcon, userIcon } from "../../../assets/authIcons";
import { AuthStyle } from "./AuthStyle";
import Axios from "../../../utils/httpClient";
import { useDispatch } from "react-redux";
const SignUp = ({ setAction }) => {
  const dispatch = useDispatch();
  const [sdata, setSdata] = useState({});
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!sdata?.name) {
      tt = false;
      err = { ...err, name: true };
    }
    if (tt) {
      Axios()
        .post(`api/v1/auth/register`, { name: sdata?.name })
        .then((r) => {})
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
        {/* <InputUi
          label="ФИО"
          placeholder="ФИО"
          icon={userIcon}
          name="full_name"
          value={sdata?.full_name}
          is_error={errors?.full_name}
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
        /> */}
        <InputUi
          label="Введите номер телефона"
          placeholder="+998 -- --- -- --"
          mask="+998 nn nnn nn nn"
          icon={phoneIcon}
          name="name"
          value={sdata?.name}
          is_error={errors?.name}
          onChange={(e) => {
            setSdata({
              ...sdata,
              [e?.target?.name]: e?.target?.value
                ?.replaceAll("+", "")
                ?.replaceAll(" ", ""),
              common: "",
            });
            setErrors({
              ...errors,
              [e?.target?.name]: false,
              common: "",
            });
          }}
        />
        {/* <InputUi
          label="Придумайте пароль"
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
        /> */}
        <Btn>Регистирация </Btn>
      </form>
      <div className="auth_bottom_section">
        <div className="info_text">
          Есть аккаунт ?
          <button className="auth_btn" onClick={() => setAction(1)}>
            Войти
          </button>
        </div>
      </div>
    </AuthStyle>
  );
};

export default SignUp;

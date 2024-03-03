import React, { useState } from "react";
import InputUi from "../../formSections/InputUi";
import { Btn } from "../../../styleComponents/GlobalStyle";
import { lockIcon, phoneIcon, userIcon } from "../../../assets/authIcons";
import { AuthStyle } from "./AuthStyle";
const SignIn = ({ setAction }) => {
  const [sdata, setSdata] = useState({});
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <AuthStyle>
      <form onSubmit={onSubmit}>
        <InputUi
          label="Введите номер телефона"
          placeholder="+998 -- --- -- --"
          mask="+998 nn nnn nn nn"
          icon={phoneIcon}
          name="phone"
          value={sdata?.phone}
          is_error={errors?.phone}
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
          label="Введите пароль"
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
        <Btn>Войти</Btn>
      </form>
      <div className="auth_bottom_section">
        <div className="info_text">
          Нет аккаунта ?
          <button className="auth_btn" onClick={() => setAction(2)}>
            Зарегистрироваться
          </button>
        </div>
      </div>
    </AuthStyle>
  );
};

export default SignIn;

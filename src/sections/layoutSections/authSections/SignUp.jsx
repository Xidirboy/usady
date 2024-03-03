import React, { useState } from "react"; 
import InputUi from "../../formSections/InputUi";
import { Btn } from "../../../styleComponents/GlobalStyle";
import { lockIcon, phoneIcon, userIcon } from "../../../assets/authIcons";
import { AuthStyle } from "./AuthStyle";
const SignUp = () => {
  const [sdata, setSdata] = useState({});
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <AuthStyle>
      <form onSubmit={onSubmit}>
        <InputUi
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
        />
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
        />
        <Btn>Регистирация </Btn>
      </form>
    </AuthStyle>
  );
};

export default SignUp;

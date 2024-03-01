import React from "react"; 
import Input from "../formSections/Input";
import { useState } from "react";
import FormTitle from "../formSections/FormTitle";
import { Btn } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setToken } from "../../utils/tokenStorge";
import { useDispatch } from "react-redux";
import ErrorShow from "../formSections/ErrorShow";
import { AuthStyle } from "../../styleComponents/sections/AuthStyle";
 
const SignIn = ({ setIsOpen, setLoading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pdata, setPdata] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let tt = true,
      err = {};
    if (!pdata?.name) {
      tt = false;
      err = { ...err, name: true };
    }
    if (!pdata?.password) {
      tt = false;
      err = { ...err, password: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/auth/login", pdata)
        .then((r) => {
          if (r?.data?.access_token) {
            setToken(r?.data?.access_token);
            dispatch({ type: "SET_USER", payload: r?.data?.user ?? {} });
            navigate("/profile");
            setIsOpen(0);
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
  return (
    <AuthStyle>
      <FormTitle word={t("auth.sign_in")} className="title" />
      <form className="form" onSubmit={onSubmit}>
        <Input
          label={t("auth.phone")}
          is_disabled={false}
          is_icon={false}
          value={pdata?.name}
          is_error={errors?.name}
          name="name"
          mask="+998(nn) nnn-nn-nn"
          onChange={(e) => {
            const p = e?.target?.value ?? "";
            const v =
              p.substring(1, 4) +
              p.substring(5, 7) +
              p.substring(9, 12) +
              p.substring(13, 15) +
              p.substring(16, 18);
            setPdata({ ...pdata, [e.target.name]: v });
            setErrors({ ...errors, [e.target.name]: false, common: false });
          }}
        />
        <Input
          label={t("auth.password")}
          type={"password"}
          is_disabled={false}
          is_icon={false}
          is_error={errors?.password}
          value={pdata?.password}
          name="password"
          onChange={(e) => {
            setPdata({ ...pdata, [e.target.name]: e.target.value });
            setErrors({ ...errors, [e.target.name]: false, common: false });
          }}
        />
        {/* <div className="error_text">{errors?.common}</div> */}
        <ErrorShow show_error={errors?.common} errorText={errors?.common} />
        <div
          className="event forget"
          onClick={() => setIsOpen(3)}
          dangerouslySetInnerHTML={{ __html: t("auth.forget") }}
        />
        <div className="btns">
          <Btn>{t("auth.login")}</Btn>
        </div>
      </form>
      <div
        className="event"
        onClick={() => setIsOpen(2)}
        dangerouslySetInnerHTML={{
          __html: `<span class='tsup'>${t("auth.signup_t")}</span> ${t(
            "auth.register"
          )}`,
        }}
      />
    </AuthStyle>
  );
};

export default SignIn;

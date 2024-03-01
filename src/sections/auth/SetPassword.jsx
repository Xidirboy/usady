import React from "react";
import Input from "../formSections/Input";
import { useState } from "react";
import FormTitle from "../formSections/FormTitle";
import { Btn } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorShow from "../formSections/ErrorShow";
import { AuthStyle } from "../../styleComponents/sections/AuthStyle";

const SetPassword = ({ setIsOpen, setLoading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [pdata, setPdata] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let tt = true,
      err = {};
    if (!pdata?.password) {
      tt = false;
      err = { ...err, password: true };
    }
    if (!pdata?.password_confirm) {
      tt = false;
      err = { ...err, password_confirm: true };
    }
    if (
      pdata?.password?.length < 8 ||
      (pdata?.password?.length >= 8 &&
        pdata?.password !== pdata?.password_confirm)
    ) {
      tt = false;
      err = { ...err, common: t("auth.err_password") };
    }
    if (tt) {
      const token = sessionStorage.getItem("access_token");
      Axios(token)
        .post("api/v1/auth/set-password", pdata)
        .then((r) => {
          setIsOpen(1);
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
      <FormTitle word={t("auth.set_password")} className="title" />
      <form className="form" onSubmit={onSubmit}>
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
        <Input
          label={t("auth.r_password")}
          type={"password"}
          is_disabled={false}
          is_icon={false}
          is_error={errors?.password_confirm}
          value={pdata?.password_confirm}
          name="password_confirm"
          onChange={(e) => {
            setPdata({ ...pdata, [e.target.name]: e.target.value });
            setErrors({ ...errors, [e.target.name]: false, common: false });
          }}
        />
        <ErrorShow show_error={errors?.common} errorText={errors?.common} />
        <div className="btns">
          <Btn>{t("auth.submit")}</Btn>
        </div>
      </form>
      <div
        className="event"
        onClick={() => setIsOpen(1)}
        dangerouslySetInnerHTML={{ __html: t("auth.sign_in") }}
      />
    </AuthStyle>
  );
};

export default SetPassword;

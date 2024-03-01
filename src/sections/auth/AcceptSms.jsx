import React, { useEffect } from "react";
import Input from "../formSections/Input";
import { useState } from "react";
import FormTitle from "../formSections/FormTitle";
import { Btn } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorShow from "../formSections/ErrorShow";
import { AuthStyle } from "../../styleComponents/sections/AuthStyle";

const AcceptSms = ({ setIsOpen, setLoading }) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const [pdata, setPdata] = useState({});
  const [errors, setErrors] = useState({});
  const [resetSms, setResetSms] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let tt = true,
      err = {};
    if (!pdata?.sms_code) {
      tt = false;
      err = { ...err, sms_code: true };
    }
    if (tt) {
      const phone = sessionStorage.getItem("phone");
      Axios()
        .post("api/v1/auth/accept", { ...pdata, name: phone })
        .then((r) => {
          if (r?.data?.access_token) {
            sessionStorage.setItem("access_token", r?.data?.access_token);
            setIsOpen(5);
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
    var tt = 120;
    const timer = setInterval(() => {
      tt -= 1;
      const timer_target = window.document.getElementById("timer_target");
      if (timer_target) {
        timer_target.innerHTML = `${parseInt(tt / 60)}:${tt % 60}`;
      }
      if (tt === 0) {
        clearInterval(timer);
        setResetSms(true);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [resetSms]);
  const reSendSms = () => {
    setLoading(true);
    Axios()
      .post("api/v1/auth/register", { name: sessionStorage.getItem("phone") })
      .then((r) => {
        if (r?.data?.status === 1) {
          setResetSms(false);
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
  };
  return (
    <AuthStyle>
      <FormTitle word={t("auth.accept_sms")} className="title" />
      <form className="form" onSubmit={onSubmit}>
        <Input
          label={t("auth.sms_code")}
          is_disabled={false}
          is_icon={false}
          value={pdata?.sms_code}
          is_error={errors?.sms_code}
          name="sms_code"
          mask="nnnn"
          onChange={(e) => {
            const p = e?.target?.value ?? "";
            setPdata({ ...pdata, [e.target.name]: p });
            setErrors({ ...errors, [e.target.name]: false, common: false });
          }}
        />
        <ErrorShow show_error={errors?.common} errorText={errors?.common} />
        {resetSms ? (
          <div className="event" onClick={() => reSendSms()}>
            {t("auth.re_send_sms")}
          </div>
        ) : (
          <div id="timer_target" className="event">
            2:0
          </div>
        )}
        <div className="btns">
          <Btn>{t("auth.submit")}</Btn>
        </div>
      </form>
      <div
        className="event"
        onClick={() => setIsOpen(1)}
        dangerouslySetInnerHTML={{ __html: t("auth.sign_in") }}
      />
      {/* <div
        className="event"
        onClick={() => setIsOpen(2)}
        dangerouslySetInnerHTML={{ __html: t("auth.register") }}
      />
      <div
        className="event"
        onClick={() => setIsOpen(3)}
        dangerouslySetInnerHTML={{ __html: t("auth.forget") }}
      /> */}
    </AuthStyle>
  );
};

export default AcceptSms;

import { useEffect, useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import Axios from "../../utils/httpClient";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ErrorShow from "../formSections/ErrorShow";
import { getToken, setToken } from "../../utils/tokenStorge";
const Step5Sytle = styled.div`
  & .s5_target {
    min-height: 500px;
  }
  & .resend_sms {
    padding-bottom: 10px;
    color: rgb(24, 24, 24);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 18.2px;
    letter-spacing: 0.9px;
    display: flex;
    & .event {
      margin-left: 10px;
      color: #00aa58;
      cursor: pointer;
    }
  }
`;
const Step_5 = ({ step, setStep, insuranceData, setInsuranceData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [resetSms, setResetSms] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSendSms, setIsSendSms] = useState(false);
  useEffect(() => {
    setInsuranceData({
      ...insuranceData,
      step2: {
        ...(insuranceData?.step2 ?? {}),
        owner_phone: "",
        sms_code: "",
      },
    });
  }, []);
  useEffect(() => {
    var tt = 120;
    const timer = setInterval(() => {
      tt -= 1;
      const timer_target = window.document.getElementById("timer_target_owner");
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
  const onSubmitCode = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!insuranceData?.step2?.sms_code) {
      tt = false;
      err = { ...err, sms_code: true };
    }
    if (tt) {
      const phone = insuranceData?.step2?.owner_phone ?? "";
      Axios()
        .post("api/v1/auth/accept", {
          sms_code: insuranceData?.step2?.sms_code,
          name: phone,
        })
        .then((r) => {
          if (r?.data?.access_token) {
            if (getToken()) {
              setStep(6);
            } else {
              setToken(r?.data?.access_token);
              setStep(6);
            }
            // sessionStorage.setItem("access_token", r?.data?.access_token);
            // setIsOpen(5);
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
    }
  };
  const onSubmitPhone = (p) => {
    dispatch({ type: "SET_LOADING", payload: true });
    Axios()
      .post("api/v1/auth/send-sms", { name: p })
      .then((r) => {
        if (r?.data?.status === 1) {
          setIsSendSms(true);
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
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
  return (
    <Step5Sytle>
      <Forma
        title={t("_osogo_s5.title")}
        className="s5_target"
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        <div className="sub_title">{t("_osogo_s5.subtitle")}</div>
        <div className="row">
          <div className="select_target">
            <Input
              label={t("_osogo_s5.phone")}
              is_icon={false}
              value={insuranceData?.step2?.owner_phone ?? ""}
              is_error={errors?.owner_phone}
              name="owner_phone"
              mask="+998(nn) nnn-nn-nn"
              is_disabled={isSendSms}
              onChange={(e) => {
                const p = e?.target?.value ?? "";
                const v = (
                  p.substring(1, 4) +
                  p.substring(5, 7) +
                  p.substring(9, 12) +
                  p.substring(13, 15) +
                  p.substring(16, 18)
                ).replace("_", "");
                setInsuranceData({
                  ...insuranceData,
                  step2: {
                    ...(insuranceData?.step2 ?? {}),
                    [e.target.name]: v,
                  },
                });
                if (v?.length === 12) {
                  onSubmitPhone(v);
                }
                setErrors({
                  ...errors,
                  [e.target.name]: false,
                  common: false,
                });
              }}
            />
          </div>
        </div>
        <ErrorShow show_error={errors?.common} errorText={errors?.common} />
        {isSendSms ? (
          <form onSubmit={onSubmitCode}>
            <div className="row">
              <div className="select_target">
                <Input
                  label={t("_osogo_s5.code")}
                  placeholder="____"
                  is_icon={false}
                  value={insuranceData?.step2?.sms_code ?? ""}
                  is_error={errors?.sms_code}
                  // is_disabled={stage > 1}
                  name="sms_code"
                  mask="nnnn"
                  onChange={(e) => {
                    setInsuranceData({
                      ...insuranceData,
                      step2: {
                        ...(insuranceData?.step2 ?? {}),
                        [e.target.name]: e.target.value,
                      },
                    });
                    setErrors({
                      ...errors,
                      [e.target.name]: false,
                      common: "",
                    });
                  }}
                />
              </div>
              <div className="resend_sms">
                {resetSms ? (
                  <div
                    style={{ marginLeft: 0 }}
                    className="event"
                    onClick={() =>
                      onSubmitPhone(insuranceData?.step2?.owner_phone ?? "")
                    }
                  >
                    {t("auth.re_send_sms")}
                  </div>
                ) : (
                  <>
                    {t("_osogo_s5.waiting")}
                    <div id="timer_target_owner" className="event">
                      2:0
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="btns">
              <Btn type="submit" style={{ marginRight: 20 }}>
                {t("_osogo_s5.btn1")}
              </Btn>
              <BtnWhite
                type="button"
                onClick={() => {
                  setIsSendSms(false);
                  setResetSms(true);
                  setInsuranceData({
                    ...insuranceData,
                    step2: {
                      ...(insuranceData?.step2 ?? {}),
                      sms_code: "",
                      owner_phone: "",
                    },
                  });
                }}
              >
                {t("_osogo_s5.btn2")}
              </BtnWhite>
            </div>
          </form>
        ) : null}
      </Forma>
    </Step5Sytle>
  );
};

export default Step_5;

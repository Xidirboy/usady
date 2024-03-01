import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import Input from "../formSections/Input";
import { Btn, BtnWhite } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
import ErrorShow from "../formSections/ErrorShow";

const Insurant = ({ insuranceData, setInsuranceData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sdata, setSdata] = useState({});
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState(1);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!sdata?.passportSeries) {
      tt = false;
      err = { ...err, passportSeries: true };
    }
    if (!sdata?.passportNumber) {
      tt = false;
      err = { ...err, passportNumber: true };
    }
    if (!sdata?.birthDate) {
      tt = false;
      err = { ...err, birthDate: true };
    }
    if (!sdata?.phone) {
      tt = false;
      err = { ...err, phone: true };
    }
    if (!sdata?.inn) {
      tt = false;
      err = { ...err, inn: true };
    }
    if (!sdata?.address) {
      tt = false;
      err = { ...err, address: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/gazbalon/provider/passport-birth-date", {
          birthDate: dateFormat(sdata?.birthDate),
          passportSeries: sdata?.passportSeries,
          passportNumber: sdata?.passportNumber,
        })
        .then((r) => {
          if (r?.data?.data?.PINFL) {
            setInsuranceData({
              ...insuranceData,
              insurant: sdata,
              insurant_result: r?.data?.data ?? {},
            });
            setStage(2);
            setErrors({
              ...errors,
              common: "",
            });
          } else {
            setErrors({
              ...errors,
              common: r?.data?.data?.ERROR_MESSAGE ?? t("auth.system_err"),
            });
          }
        })
        .catch((e) => {
          setErrors({
            ...errors,
            common:
              e?.response?.data?.data?.ERROR_MESSAGE ?? t("auth.system_err"),
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
  const dateFormat = (d = "") => {
    const dl = d.split("-");
    return `${dl[2]}.${dl[1]}.${dl[0]}`;
  };
  return (
    <>
      <div className="sub_title">{t("gaz_balon_step2.insurant")}</div>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="doc_number">
            <label>{t("gaz_balon_step2.passport")}</label>
            <div className="inputs">
              <div className="seria">
                <Input
                  placeholder="AB"
                  value={sdata?.passportSeries}
                  is_icon={false}
                  is_error={errors?.passportSeries}
                  name="passportSeries"
                  mask="aa"
                  is_disabled={stage > 1}
                  onChange={(e) => {
                    setSdata({
                      ...sdata,
                      [e.target.name]: e.target?.value?.toUpperCase(),
                    });
                    setErrors({
                      ...errors,
                      [e.target.name]: false,
                      common: "",
                    });
                  }}
                />
              </div>
              <div className="number">
                <Input
                  placeholder="1234567"
                  value={sdata?.passportNumber}
                  is_icon={false}
                  is_error={errors?.passportNumber}
                  is_disabled={stage > 1}
                  name="passportNumber"
                  mask="nnnnnnn"
                  onChange={(e) => {
                    setSdata({
                      ...sdata,
                      [e.target.name]: e.target?.value,
                    });
                    setErrors({
                      ...errors,
                      [e.target.name]: false,
                      common: "",
                    });
                  }}
                />
              </div>
            </div>
          </div>
          {stage > 1 ? (
            <div>
              <Input
                label={t("gaz_balon_step2.full_name")}
                value={`${insuranceData?.insurant_result?.LAST_NAME} ${insuranceData?.insurant_result?.FIRST_NAME} ${insuranceData?.insurant_result?.MIDDLE_NAME}`}
                is_icon={false}
                is_disabled={true}
              />
            </div>
          ) : null}
          <div className="col_2">
            <div>
              <Input
                label={t("gaz_balon_step2.birthdate")}
                type="date"
                value={sdata?.birthDate}
                is_icon={false}
                is_error={errors?.birthDate}
                is_disabled={stage > 1}
                name="birthDate"
                onChange={(e) => {
                  setSdata({
                    ...sdata,
                    [e.target.name]: e.target?.value,
                  });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
              />
            </div>
            <div>
              <Input
                label={t("gaz_balon_step2.phone")}
                is_disabled={stage > 1}
                is_icon={false}
                value={sdata?.phone}
                is_error={errors?.phone}
                name="phone"
                mask="+998(nn) nnn-nn-nn"
                onChange={(e) => {
                  const p = e?.target?.value ?? "";
                  const v =
                    p.substring(1, 4) +
                    p.substring(5, 7) +
                    p.substring(9, 12) +
                    p.substring(13, 15) +
                    p.substring(16, 18);
                  setSdata({ ...sdata, [e.target.name]: v });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: false,
                  });
                }}
              />
            </div>
            <div>
              <Input
                label={t("gaz_balon_step2.inn")}
                mask="nnnnnnn"
                value={sdata?.inn}
                is_icon={false}
                is_error={errors?.inn}
                is_disabled={stage > 1}
                name="inn"
                onChange={(e) => {
                  setSdata({
                    ...sdata,
                    [e.target.name]: e.target?.value,
                  });
                  setErrors({
                    ...errors,
                    [e.target.name]: false,
                    common: "",
                  });
                }}
              />
            </div>
            {stage > 1 ? (
              <div>
                <Input
                  label={t("gaz_balon_step2.pinfl")}
                  value={insuranceData?.insurant_result?.PINFL}
                  is_icon={false}
                  is_disabled={true}
                />
              </div>
            ) : null}
          </div>
          <div>
            <Input
              label={t("gaz_balon_step2.address")}
              value={sdata?.address}
              is_icon={false}
              is_error={errors?.address}
              is_disabled={stage > 1}
              name="address"
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e.target.name]: e.target?.value,
                });
                setErrors({
                  ...errors,
                  [e.target.name]: false,
                  common: "",
                });
              }}
            />
          </div>
        </div>
        {stage === 1 ? (
          <div className="btns">
            <Btn type="submit">{t("gaz_balon_step2.btn1")}</Btn>
          </div>
        ) : (
          <div className="btns"> 
            <BtnWhite
              type="button"
              style={{ margin: "0 10px 0 0" }}
              onClick={() => {
                setInsuranceData({
                  ...insuranceData,
                  insurant: {},
                  insurant_result: {},
                });
                setStage(1);
              }}
            >
              {t("gaz_balon_step2.btn2")}
            </BtnWhite>
          </div>
        )}
      </form>
      {/* {errors?.common ? (
        <div
          style={{ color: "red", padding: "0 0 20px 0" }}
          dangerouslySetInnerHTML={{ __html: errors?.common ?? "" }}
        />
      ) : null} */}
      <ErrorShow show_error={errors?.common} errorText={errors?.common} />
    </>
  );
};

export default Insurant;

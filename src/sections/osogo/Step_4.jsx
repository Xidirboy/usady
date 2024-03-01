import { filter, get } from "lodash";
import Input from "../formSections/Input";
import { BtnWhite, Btn } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import Forma from "../formSections/Forma";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useState } from "react";
import ErrorShow from "../formSections/ErrorShow";
const Step4Style = styled.div`
  & .s4_target {
    min-height: 500px;
  }
  & .btn_add_target {
    padding: 10px 0 30px 0;
    & hr {
      margin-bottom: 20px;
    }
  }
  & .driver_hr {
    margin-top: 20px;
  }
  & .driver_add {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
    & .sub_title {
      text-align: center;
      padding: 20px 0;
    }
    & .btn_target {
      padding: 10px 0;
      width: 100%;
      text-align: center;
      & button {
        width: 100%;
        max-width: 330px;
      }
    }
  }
  & .info_dirver {
    border-radius: 16px;
    background: #00aa5833;
    padding: 30px;
    display: flex;
    max-width: 760px;
    margin: 30px auto;
    border: 1px solid #cfdbe0fd;
    & .info_icon {
      padding-right: 10px;
    }
  }
`;
const Step_4 = ({
  relatives,
  residents,
  drivers,
  setDrivers,
  insuranceData,
  setInsuranceData,
  limit = -1,
  setStep,
  step,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [stepErrors, setStepErrors] = useState({});
  const deleteDriver = (i, owner_isdriver) => {
    const l = filter(drivers, (o, index) => i !== index);
    setInsuranceData({
      ...insuranceData,
      drivers: l,
      owner_isdriver: owner_isdriver === 1 ? 0 : insuranceData?.owner_isdriver,
    });
    setStepErrors({ ...stepErrors, driver_data: false });
  };
  const onChangeItem = (name, value, indexItem) => {
    let l = [];
    drivers.forEach((item, index) => {
      if (index === indexItem) {
        l.push({
          ...item,
          [name]: value,
          errors: { ...(item?.errors ?? {}), [name]: false, common: "" },
        });
      } else {
        l.push(item);
      }
    });
    setDrivers(l);
  };
  const checkDriver = (e, item, indexItem) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!item?.resident) {
      tt = false;
      err = { ...err, resident: true };
    }
    if (!item?.relative) {
      tt = false;
      err = { ...err, relative: true };
    }
    if (!item?.paspsery) {
      tt = false;
      err = { ...err, paspsery: true };
    }
    if (!item?.paspnumber) {
      tt = false;
      err = { ...err, paspnumber: true };
    }
    if (!item?.pinfl) {
      tt = false;
      err = { ...err, pinfl: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/osogo/driver-summary", {
          passport_number: item.paspnumber,
          passport_series: item.paspsery,
          pinfl: item.pinfl,
        })
        .then((r) => {
          let l = [];
          let is_add_driver = false;
          drivers.forEach((item, index) => {
            if (index === indexItem) {
              if (get(r, "data.data.BIRTH_DATE")) {
                l.push({
                  ...item,
                  result: r?.data?.data ?? {},
                });
              } else {
                is_add_driver = true;
                l.push({
                  ...item,
                  errors: {
                    ...item?.errors,
                    common: t("_osogo_s4.common_err"),
                  },
                });
              }
            } else {
              l.push(item);
            }
          });
          setDrivers(l);
          setStepErrors({ ...stepErrors, driver_data: false });
        })
        .catch((e) => {})
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      let l = [];
      drivers.forEach((item, index) => {
        if (index === indexItem) {
          l.push({
            ...item,
            errors: err,
          });
        } else {
          l.push(item);
        }
      });
      setDrivers(l);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const changeOwnerIsDriver = () => {
    if (insuranceData?.owner_isdriver === 1) {
      let dl = drivers;
      dl.shift();
      setInsuranceData({
        ...insuranceData,
        drivers: dl,
        owner_isdriver: 0,
      });
    } else {
      let l = drivers;
      l.unshift({
        owner_isdriver: 1,
        result: insuranceData?.step2_owner ?? {},
        resident: get(residents, "0.id"),
        relative: get(relatives, "0.id"),
        paspsery: insuranceData?.step2?.owner_pasp_sery ?? null,
        paspnumber: insuranceData?.step2?.owner_pasp_num ?? null,
        pinfl: insuranceData?.step2_result?.PINFL ?? null,
      });
      setInsuranceData({
        ...insuranceData,
        drivers: l,
        owner_isdriver: 1,
      });
    }
  };
  const nextStep = () => {
    if (drivers && drivers?.length) {
      let tt = true;
      drivers.forEach((o) => {
        if (!get(o, "result.LICENSE_SERIA", false)) {
          tt = false;
        }
      });
      if (tt) {
        setStep(5);
      } else {
        setStepErrors({ ...stepErrors, driver_data: true });
      }
    } else {
      setStepErrors({ ...stepErrors, driver_list: true });
    }
  };
  return (
    <Step4Style>
      <Forma
        title={t("_osogo_s4.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}
      >
        <div className="s4_target">
          {/* <div className="checkbox_single">
            <label>
              <input
                type="checkbox"
                name="applicant_isowner"
                checked={insuranceData?.step2?.applicant_isowner}
                onChange={(e) => {
                  setInsuranceData({
                    ...insuranceData,
                    step2: {
                      ...(insuranceData?.step2 ?? {}),
                      applicant_isowner: insuranceData?.step2?.applicant_isowner
                        ? 0
                        : 1,
                    },
                  });
                }}
              />
              {t("_osogo_s4.is_owner")}
            </label>
          </div> */}
          <div className="row">
            <div className="checkbox_single">
              <label>
                <input
                  type="checkbox"
                  name="applicant_isowner"
                  checked={get(drivers, "0.owner_isdriver", 0)}
                  onChange={(e) => {
                    changeOwnerIsDriver();
                  }}
                />
                {t("_osogo_s4.is_driver")}
              </label>
            </div>
          </div>
          {drivers?.map((item, index) => (
            <div key={index}>
              {item?.result?.LAST_NAME_LATIN ? (
                <>
                  <div className="sub_title driver_title">
                    <span>
                      {`${index + 1}. ${item?.result?.LAST_NAME_LATIN} ${
                        item?.result?.FIRST_NAME_LATIN
                      } ${item?.result?.MIDDLE_NAME_LATIN}`}
                    </span>
                    <span
                      className="delete"
                      onClick={() => deleteDriver(index, item?.owner_isdriver)}
                    >
                      {t("_osogo_s4.delete")}
                    </span>
                  </div>
                  <hr className="driver_hr" />
                </>
              ) : (
                <>
                  <div className="sub_title driver_title">
                    <span>
                      {t("_osogo_s4.relative")}: {index + 1}
                    </span>
                    <span
                      className="delete"
                      onClick={() => deleteDriver(index, item?.owner_isdriver)}
                    >
                      {t("_osogo_s4.delete")}
                    </span>
                  </div>
                  <div className="row">
                    <form onSubmit={(e) => checkDriver(e, item, index)}>
                      {/* {!insuranceData?.owner_isdriver ||
                      item?.owner_isdriver ? (
                        <div className="checkbox_single">
                          <label>
                            <input
                              type="checkbox"
                              name="applicant_isowner"
                              checked={item?.owner_isdriver}
                              onChange={(e) => {
                                changeOwnerIsDriver(
                                  index,
                                  item?.owner_isdriver ? 0 : 1
                                );
                              }}
                            />
                            {t("_osogo_s4.is_driver")}
                          </label>
                        </div>
                      ) : null} */}
                      <div className="col_2">
                        <div>
                          <Input
                            label={t("_osogo_s4.relative_l")}
                            is_icon={false}
                            name="relative"
                            value={item?.relative}
                            is_disabled={item?.result?.LAST_NAME_LATIN}
                            is_error={item?.errors?.relative}
                            onChange={(e) =>
                              onChangeItem(e.target.name, e.target.value, index)
                            }
                            options={relatives
                              ?.filter((o) => o.id !== 0)
                              ?.map((item) => {
                                return { label: item?.name, value: item?.id };
                              })}
                          />
                        </div>
                        <div>
                          <Input
                            mask="nnnnnnnnnnnnnn"
                            placeholder="11223344556677"
                            label={t("_osogo_s4.pinfl")}
                            is_icon={false}
                            is_disabled={item?.result?.LAST_NAME_LATIN}
                            name="pinfl"
                            value={item?.pinfl}
                            is_error={item?.errors?.pinfl}
                            onChange={(e) =>
                              onChangeItem(e.target.name, e.target.value, index)
                            }
                          />
                        </div>
                      </div>
                      <div className="doc_number">
                        <label>{t("_osogo_s4.passport")}</label>
                        <div className="inputs">
                          <div className="seria">
                            <Input
                              mask="aa"
                              placeholder="AB"
                              is_icon={false}
                              name="paspsery"
                              value={item?.paspsery}
                              is_error={item?.errors?.paspsery}
                              is_disabled={item?.result?.LAST_NAME_LATIN}
                              onChange={(e) =>
                                onChangeItem(
                                  e.target.name,
                                  e?.target?.value?.toUpperCase(),
                                  index
                                )
                              }
                            />
                          </div>
                          <div className="number">
                            <Input
                              mask="nnnnnnn"
                              placeholder="1234567"
                              is_icon={false}
                              name="paspnumber"
                              is_disabled={item?.result?.LAST_NAME_LATIN}
                              value={item?.paspnumber}
                              is_error={item?.errors?.paspnumber}
                              onChange={(e) =>
                                onChangeItem(
                                  e.target.name,
                                  e.target.value,
                                  index
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="date_error_check">
                        <ErrorShow
                          show_error={item?.errors?.common}
                          errorText={item?.errors?.common}
                        />
                      </div>
                      <div className="btn_add_target">
                        <hr />
                        <BtnWhite>{t("_osogo_s4.add")}</BtnWhite>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="driver_add">
            {limit === -1 || limit > drivers.length ? (
              <>
                <div
                  className="sub_title"
                  dangerouslySetInnerHTML={{
                    __html: t("_osogo_s4.add_text"),
                  }}
                />

                <div className="btn_target">
                  <BtnWhite
                    onClick={() => {
                      setDrivers([
                        ...drivers,
                        { resident: get(residents, "0.id", null) },
                      ]);
                      setStepErrors({ ...stepErrors, driver_list: false });
                    }}
                  >
                    {t("_osogo_s4.add_driver")}
                  </BtnWhite>
                </div>
              </>
            ) : null}
            {stepErrors?.driver_list ? (
              <div className="date_error_check">
                <ErrorShow
                  show_error={stepErrors?.driver_list}
                  errorText={t("_osogo_s4.driver_list_err")}
                />
              </div>
            ) : null}
            {stepErrors?.driver_data ? (
              <div className="date_error_check">
                <ErrorShow
                  show_error={stepErrors?.driver_data}
                  errorText={t("_osogo_s4.driver_data_err")}
                />
              </div>
            ) : null}
            {drivers?.length ? (
              <div className="btn_target">
                <Btn onClick={nextStep}>{t("_osogo_s4.btn")}</Btn>
              </div>
            ) : null}
            <div className="info_dirver">
              <div className="info_icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1221 16.5H12.0893V11H11.1221V16.5ZM11.6057 9.577C11.7746 9.577 11.9158 9.518 12.0293 9.4C12.1434 9.282 12.2005 9.136 12.2005 8.962C12.2005 8.78733 12.1434 8.641 12.0293 8.523C11.9158 8.405 11.7746 8.346 11.6057 8.346C11.4368 8.346 11.2955 8.405 11.1821 8.523C11.0679 8.641 11.0109 8.78733 11.0109 8.962C11.0109 9.136 11.0679 9.282 11.1821 9.4C11.2955 9.518 11.4368 9.577 11.6057 9.577ZM11.6086 21C10.4055 21 9.27389 20.764 8.2139 20.292C7.15455 19.8193 6.23286 19.178 5.44883 18.368C4.6648 17.5587 4.04421 16.6067 3.58707 15.512C3.12994 14.4173 2.90137 13.2477 2.90137 12.003C2.90137 10.759 3.12961 9.589 3.58611 8.493C4.04324 7.39767 4.66351 6.44467 5.44689 5.634C6.22964 4.82333 7.15036 4.18167 8.20906 3.709C9.26776 3.23633 10.399 3 11.6028 3C12.8059 3 13.9375 3.236 14.9975 3.708C16.0568 4.18067 16.9785 4.822 17.7625 5.632C18.5466 6.44133 19.1671 7.39333 19.6243 8.488C20.0814 9.58267 20.31 10.7523 20.31 11.997C20.31 13.241 20.0817 14.411 19.6252 15.507C19.1681 16.6023 18.5478 17.5553 17.7645 18.366C16.9817 19.1767 16.061 19.8183 15.0023 20.291C13.9436 20.7637 12.8124 21 11.6086 21ZM11.6057 20C13.7656 20 15.5952 19.225 17.0942 17.675C18.5933 16.125 19.3428 14.2333 19.3428 12C19.3428 9.76667 18.5933 7.875 17.0942 6.325C15.5952 4.775 13.7656 4 11.6057 4C9.44572 4 7.6162 4.775 6.11713 6.325C4.61805 7.875 3.86851 9.76667 3.86851 12C3.86851 14.2333 4.61805 16.125 6.11713 17.675C7.6162 19.225 9.44572 20 11.6057 20Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div>{t("_osogo_s4.info_text")}</div>
            </div>
          </div>
        </div>
      </Forma>
    </Step4Style>
  );
};

export default Step_4;

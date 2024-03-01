import React, { useEffect, useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Loading from "../../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import { TravelContainer } from "../../styleComponents/components/TravelStyle";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Forma from "../../sections/formSections/Forma";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import CheckUser from "../../sections/layout/CheckUser";
import StepSlider from "../../sections/travel/StepSlider2";
import Step_1 from "../../sections/travel/Step_1";
import Step_2 from "../../sections/travel/Step_2";
import Step_3 from "../../sections/travel/Step_3";
import Step_4 from "../../sections/travel/Step_4";
import Step_5 from "../../sections/travel/Step_5";
import Step_6 from "../../sections/travel/Step_6";
import Step_7 from "../../sections/travel/Step_7";
import Step_8 from "../../sections/travel/Step_8";

const Travel = () => {
  const test_data = {};
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [insuranceData, setInsuranceData] = useState(test_data);
  const [multiDays, setMultiDays] = useState([]);
  const [abroadGroup, setAbroadGroup] = useState([]);
  const [abroadCountry, setAbroadCountry] = useState([]);
  const [abroadType, setAbroadType] = useState([]);
  const [abroadActivity, setAbroadActivity] = useState([]);
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    getMultiDays();
    getAbroadGroup();
    getAbroadCountry();
    getAbroadType();
    getAbroadActivity();
  }, []);
  const getMultiDays = () => {
    Axios()
      .get("api/v1/travel/multi-days")
      .then((r) => {
        let l = [];
        get(r, "data.data", []).forEach((o) => {
          l.push({ id: o?.inson_id?.toString(), name: o?.name ?? "" });
        });
        setMultiDays(l);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getAbroadGroup = () => {
    Axios()
      .get("api/v1/travel/abroad-group")
      .then((r) => {
        let l = [];
        get(r, "data.data", []).forEach((o) => {
          l.push({ id: o?.inson_id?.toString(), name: o?.name ?? "" });
        });
        setAbroadGroup(l);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getAbroadCountry = () => {
    Axios()
      .get("api/v1/travel/abroad-country")
      .then((r) => {
        let l = [];
        get(r, "data.data", []).forEach((o) => {
          l.push({ id: o?.inson_id?.toString(), name: o?.name ?? "" });
        });
        setAbroadCountry(l);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getAbroadType = () => {
    Axios()
      .get("api/v1/travel/abroad-type")
      .then((r) => {
        let l = [];
        get(r, "data.data", []).forEach((o) => {
          l.push({ id: o?.inson_id?.toString(), name: o?.name ?? "" });
        });
        setAbroadType(l);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getAbroadActivity = () => {
    Axios()
      .get("api/v1/travel/abroad-activity")
      .then((r) => {
        let l = [];
        get(r, "data.data", []).forEach((o) => {
          l.push({ id: o?.inson_id?.toString(), name: o?.name ?? "" });
        });
        setAbroadActivity(r?.data?.data ?? []);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const getAbroadProgram = (data) => {
    Axios()
      .post("api/v1/travel/abroad-program", data)
      .then((r) => {
        setPrograms(r?.data?.data ?? []);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const insuranceCreate = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    // console.log("insuranceData ::", insuranceData);
    let d = {
        date_reg: getToday(),
        start_date: dateFormat(get(insuranceData, "step1.start_date", "")),
        end_date: dateFormat(get(insuranceData, "step1.end_date", "")),
        days: 365,
        type_id: get(insuranceData, "step1.type_id", ""),
        multi_id: get(insuranceData, "step1.multi_id", "0"),
        program_id: get(insuranceData, "step1.program_id", ""),
        activity_id: get(insuranceData, "step1.activity_id", ""),
        group_id: get(insuranceData, "step1.group_id", ""),
        countries: get(insuranceData, "step1.countrys", []).map(
          (item) => item?.value
        ),
        applicant: {
          fizyur: 0,
          date_birth: dateFormat(get(insuranceData, "step2.birthDate", "")),
          pass_sery: get(insuranceData, "step2.passportSeries", ""),
          pass_num: get(insuranceData, "step2.passportNumber", ""),
          pinfl: get(insuranceData, "step2_result.PINFL", ""),
          last_name: get(
            insuranceData,
            "step2_result.NVL(LAST_NAME_ENG,LAST_NAME)",
            ""
          ),
          first_name: get(
            insuranceData,
            "step2_result.NVL(FIRST_NAME_ENG,FIRST_NAME)",
            ""
          ),
          inn: "",
          org_name: "",
          address: get(insuranceData, "step2.address", ""),
          phone: get(insuranceData, "step2.phone", ""),
        },
        insured: [],
      },
      err = "",
      tt = true;
    if (insuranceData?.insureds?.length > 0) {
      let insureds_list = [],
        d_list = [];
      insuranceData.insureds.forEach((item, index) => {
        let dt = true,
          err = {};
        if (!item?.passportSeries) {
          dt = false;
          tt = false;
          err = { ...err, passportSeries: true };
        }
        if (!item?.passportNumber) {
          dt = false;
          tt = false;
          err = { ...err, passportNumber: true };
        }
        if (!item?.birthDate) {
          dt = false;
          tt = false;
          err = { ...err, birthDate: true };
        }
        if (!item?.result?.PINFL) {
          dt = false;
          tt = false;
          err = { ...err, common: t("_travel.insureds_err") };
        }
        if (dt) {
          insureds_list.push({
            pinfl: item?.result?.PINFL ?? "",
            last_name: get(item, "result.NVL(LAST_NAME_ENG,LAST_NAME)", ""),
            first_name: get(item, "result.NVL(FIRST_NAME_ENG,FIRST_NAME)", ""),
            pass_sery: item?.passportSeries ?? "",
            pass_num: item?.passportNumber ?? "",
            date_birth: dateFormat(item?.birthDate ?? ""),
          });
        } else {
          d_list.push({ ...item, errors: err });
        }
      });
      if (tt) {
        d = { ...d, insured: insureds_list };
        Axios()
          .post("api/v1/travel/create", d)
          .then((res) => {
            const r = { data: res?.data ?? {} };
            const ii_data = r?.data?.data?.data ?? {};
            const ii_response = JSON.parse(r?.data?.data?.response ?? "{}");
            setInsuranceData({
              ...insuranceData,
              insuranceObj: {
                ...(r?.data?.data ?? {}),
                data: ii_data,
                response: ii_response,
              },
              anketa_id: r?.data?.data?.anketa_id,
            });
            setStep(8);
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          })
          .catch((e) => {})
          .finally(() => {
            dispatch({ type: "SET_LOADING", payload: false });
          });
      } else {
        setInsuranceData({ ...insuranceData, insureds: d_list });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } else {
      err = t("_travel.insureds_err");
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const dateFormat = (d = "") => {
    const dl = d.split("-");
    return `${dl[2]}.${dl[1]}.${dl[0]}`;
  };
  const getToday = () => {
    const today = new Date();
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedDate = today
      .toLocaleDateString("en-GB", options)
      .replaceAll("/", ".");
    return formattedDate;
  };
  return (
    <>
      <CheckUser is_requaried={false} />
      <Layout>
        <Navigator
          active={t("_travel.title")}
          //   navs={[{ title: t("news.title"), link: "/news" }]}
        />
        {loading ? (
          <Loading is_loading={loading} />
        ) : (
          <>
            <TravelContainer>
              <div className="title_target">
                <TitelBlack word={t("_travel.title")} className="title" />
              </div>
              <StepSlider
                data={{
                  step: step,
                  items: [
                    // { title: t("_travel.s1") },
                    // { title: t("_travel.s2") },
                    // { title: t("_travel.s3") },
                    // { title: t("_travel.s4") },
                    // { title: t("_travel.s5") },
                    // { title: t("_travel.s6") },
                    // { title: t("_travel.s7") },
                    // { title: t("_travel.s8") },
                    { title: `${t("_travel.step")} 1` },
                    { title: `${t("_travel.step")} 2` },
                    { title: `${t("_travel.step")} 3` },
                    { title: `${t("_travel.step")} 4` },
                    { title: `${t("_travel.step")} 5` },
                    { title: `${t("_travel.step")} 6` },
                    { title: `${t("_travel.step")} 7` },
                    { title: `${t("_travel.step")} 8` },
                  ],
                }}
              />
              {step === 7 ? (
                <Step_7
                  step={step}
                  data={insuranceData?.insuranceObj ?? {}}
                  setStep={setStep}
                  insuranceData={insuranceData}
                  setInsuranceData={setInsuranceData}
                  programs={programs}
                  abroadActivity={abroadActivity}
                  abroadGroup={abroadGroup}
                  abroadType={abroadType}
                  multiDays={multiDays}
                  abroadCountry={abroadCountry}
                  insuranceCreate={insuranceCreate}
                />
              ) : step === 8 ? (
                <Step_8
                  step={step}
                  setStep={setStep}
                  insuranceData={insuranceData}
                  setInsuranceData={setInsuranceData}
                />
              ) : (
                <div className="content">
                  <div className="form_target">
                    {step === 1 ? (
                      <Step_1
                        step={step}
                        setStep={setStep}
                        sdata={insuranceData?.step1 ?? {}}
                        setSdata={(o) =>
                          setInsuranceData({ ...insuranceData, step1: o })
                        }
                        abroadActivity={abroadActivity}
                        abroadGroup={abroadGroup}
                        abroadType={abroadType}
                        multiDays={multiDays}
                        abroadCountry={abroadCountry}
                        getAbroadProgram={getAbroadProgram}
                      />
                    ) : step === 2 ? (
                      <Step_2
                        step={step}
                        setStep={setStep}
                        sdata={get(insuranceData, "insureds", [{}])}
                        setSdata={(o) =>
                          setInsuranceData({ ...insuranceData, insureds: o })
                        }
                      />
                    ) : step === 3 ? (
                      <Step_3
                        step={step}
                        setStep={setStep}
                        sdata={get(insuranceData, "step1", {})}
                        setSdata={(o) =>
                          setInsuranceData({ ...insuranceData, step1: o })
                        }
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                        programs={programs}
                      />
                    ) : step === 4 ? (
                      <Step_4
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                      />
                    ) : step === 5 ? (
                      <Step_5
                        step={step}
                        setStep={setStep}
                        sdata={get(insuranceData, "step2", {})}
                        setSdata={(o) =>
                          setInsuranceData({ ...insuranceData, step2: o })
                        }
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                      />
                    ) : step === 6 ? (
                      <Step_6
                        step={step}
                        setStep={setStep}
                        insureds={get(insuranceData, "insureds", [{}])}
                        setInsureds={(o) =>
                          setInsuranceData({ ...insuranceData, insureds: o })
                        }
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                      />
                    ) : null}
                  </div>
                  {insuranceData?.show_result ? (
                    <div className="result">
                      <Forma
                        title={t("_travel.result")}
                        className="result_forma"
                      >
                        {insuranceData?.step1_result?.COST_USD ? (
                          <div className="info">
                            <div className="i_title">
                              {t("_travel.r_text1")}
                            </div>
                            <div className="i_value">
                              {insuranceData?.step1_result?.COST_USD}{" "}
                              {t("_travel_s3.EUR")}
                            </div>
                          </div>
                        ) : null}
                        <div className="info">
                          <div className="i_title">{t("_travel.r_text2")}</div>
                          <div className="i_value">{t("_travel.r_value2")}</div>
                        </div>
                        <div className="info">
                          <div className="i_title">{t("_travel.r_text3")}</div>
                          <div className="i_value">{t("_travel.r_value3")}</div>
                        </div>
                        <div className="info">
                          <div className="i_title">{t("_travel.r_text4")}</div>
                          <div className="i_value">{t("_travel.r_value4")}</div>
                        </div>
                      </Forma>
                    </div>
                  ) : null}
                </div>
              )}
            </TravelContainer>
          </>
        )}
      </Layout>
    </>
  );
};

export default Travel;

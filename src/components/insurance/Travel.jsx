import React, { useEffect, useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Loading from "../../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import { OsogoContainer } from "../../styleComponents/components/OsogoStyle";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import StepSlider from "../../sections/osogo/StepSlider";
import Forma from "../../sections/formSections/Forma";
import Step1 from "../../sections/travel/Step1";
import Axios from "../../utils/httpClient";
import Step2 from "../../sections/travel/Step2";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import Step3 from "../../sections/travel/Step3";
import Step4 from "../../sections/travel/Step4";
import CheckUser from "../../sections/layout/CheckUser";

const Travel = () => {
  const test_data = {
    status: 1,
    data: {
      data: '{"date_reg":"20.10.2023","start_date":"20.10.2023","end_date":"20.10.2024","days":365,"type_id":1,"multi_id":1,"program_id":1,"activity_id":1,"group_id":1,"countries":[1,2],"applicant":{"fizyur":0,"date_birth":"29.01.1993","pass_sery":"AD","pass_num":"1234567","pinfl":"32901930590153","last_name":"INSURER SURNAME","first_name":"INSURER NAME","inn":null,"org_name":null,"address":"TEST ADDRESS","phone":"998971234567"},"insured":[{"pinfl":"32901930590153","last_name":"TRAVELLER 1 SURNAME","first_name":"TRAVELLER 1","pass_sery":"BB","pass_num":"1010101","date_birth":"01.01.1970"},{"pinfl":"32901930590153","last_name":"TRAVELLER 2 SURNAME","first_name":"TRAVELLER 2","pass_sery":"CC","pass_num":"000001","date_birth":"01.01.1970"}]}',
      status: 2,
      user_id: 0,
      response:
        '{"result":0,"anketa_id":489435,"premium_usd":"93,75","premium_uzs":"1147000","uuid":"cd521f11-96ec-8468-bd70-9ae36054ed60"}',
      anketa_id: 489435,
      uuid: "cd521f11-96ec-8468-bd70-9ae36054ed60",
      premium_uzs: "1147000",
      premium_usd: "93,75",
      updated_at: "2023-11-13T16:17:47.000000Z",
      created_at: "2023-11-13T16:17:47.000000Z",
      id: 19,
    },
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [insuranceData, setInsuranceData] = useState({});
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
        setMultiDays(r?.data?.data ?? []);
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
        setAbroadGroup(r?.data?.data ?? []);
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
        setAbroadCountry(r?.data?.data ?? []);
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
        setAbroadType(r?.data?.data ?? []);
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
        start_date: dateFormat(get(insuranceData, "step2.start_date", "")),
        end_date: dateFormat(get(insuranceData, "step2.end_date", "")),
        days: 365,
        type_id: get(insuranceData, "step1.type_id", ""),
        multi_id: get(insuranceData, "step1.multi_id", ""),
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
          err = { ...err, common: t("osogo.insureds_err") };
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
            const ii_data = JSON.parse(r?.data?.data?.data ?? "{}");
            const ii_response = JSON.parse(r?.data?.data?.response ?? "{}");
            setInsuranceData({
              ...insuranceData,
              insuranceObj: {
                ...(r?.data?.data ?? {}),
                data: ii_data,
                response: ii_response,
              },
            });
            setStep(3);
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
      err = t("osogo.insureds_err");
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const dateFormat = (d = "") => {
    const dl = d.split("-");
    return `${dl[2]}.${dl[1]}.${dl[0]}`;
  };
  const getToday = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();
    return `${currentDate}.${currentMonth}.${currentYear}`;
  };
  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("osogo.navigation")}
          //   navs={[{ title: t("news.title"), link: "/news" }]}
        />
        {loading ? (
          <Loading is_loading={loading} />
        ) : (
          <>
            <OsogoContainer>
              <div className="title_target">
                <TitelBlack word={t("osogo.polis")} className="title" />
              </div>
              <StepSlider
                data={{
                  step: step,
                  items: [
                    { title: t("osogo.step1") },
                    { title: t("osogo.step2") },
                    { title: t("osogo.step3") },
                    { title: t("osogo.step4") },
                  ],
                }}
              />
              {step === 3 ? (
                <Step3
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
                />
              ) : step === 4 ? (
                <Step4
                  data={insuranceData?.step3_result ?? {}}
                  setStep={setStep}
                  insuranceData={insuranceData}
                  setInsuranceData={setInsuranceData}
                />
              ) : (
                <div className="content">
                  <div className="form_target">
                    {step === 1 ? (
                      <Step1
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                        setStep={setStep}
                        programs={programs}
                        abroadActivity={abroadActivity}
                        abroadGroup={abroadGroup}
                        abroadType={abroadType}
                        multiDays={multiDays}
                        abroadCountry={abroadCountry}
                        getAbroadProgram={getAbroadProgram}
                      />
                    ) : (
                      <Step2
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                        setStep={setStep}
                        insuranceCreate={insuranceCreate}
                      />
                    )}
                  </div>
                  <div className="result">
                    <Forma
                      title={t("gaz_balon_result.title")}
                      className="result_forma"
                    >
                      {insuranceData?.step1_result?.COST_USD ? (
                        <div className="info">
                          <div className="i_title">
                            {t("gaz_balon_result.text1")}
                          </div>
                          <div className="i_value">
                            {/* {insuranceData?.step1_result?.COST_USD}{" "}
                            {t("osogo.sum")} */}
                            {t("gaz_balon_result.value1")}
                          </div>
                        </div>
                      ) : null}
                      <div className="info">
                        <div className="i_title">
                          {t("gaz_balon_result.text2")}
                        </div>
                        <div className="i_value">
                          {t("gaz_balon_result.value2")}
                        </div>
                      </div>
                      <div className="info">
                        <div className="i_title">
                          {t("gaz_balon_result.text3")}
                        </div>
                        <div className="i_value">
                          {t("gaz_balon_result.value3")}
                        </div>
                      </div>
                      <div className="info">
                        <div className="i_title">
                          {t("gaz_balon_result.text4")}
                        </div>
                        <div className="i_value">
                          {t("gaz_balon_result.value4")}
                        </div>
                      </div>
                    </Forma>
                  </div>
                </div>
              )}
            </OsogoContainer>
          </>
        )}
      </Layout>
    </>
  );
};

export default Travel;

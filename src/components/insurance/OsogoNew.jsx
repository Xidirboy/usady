import React, { useEffect, useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Loading from "../../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import { OsogoContainer } from "../../styleComponents/components/OsogoStyle";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import StepSlider2 from "../../sections/osogo/StepSlider2";
import Forma from "../../sections/formSections/Forma";
import Step1 from "../../sections/osogo/Step_1";
import Step2 from "../../sections/osogo/Step_2";
import Step_3 from "../../sections/osogo/Step_3";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import CheckUser from "../../sections/layout/CheckUser";
import Step_4 from "../../sections/osogo/Step_4";
import { get } from "lodash";
import Step_5 from "../../sections/osogo/Step_5";
import Step_6 from "../../sections/osogo/Step_6";
import Step_7 from "../../sections/osogo/Step_7";

const Osogo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [insuranceData, setInsuranceData] = useState({
    step1: {
      discount: 0,
      driver_limit: 10,
      period: 2,
    },
    drivers: [],
  });
  // const [insuranceData, setInsuranceData] = useState(test_data);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [useTerritoryRegions, setUseTerritoryRegions] = useState([]);
  const [relatives, setRelatives] = useState([]);
  const [residents, setResidents] = useState([]);
  useEffect(() => {
    // getVehicleTypes();
    // getUseTerritoryRegions();
    // getDiscount();
    getResidents();
    getRelatives();
  }, []);
  const getVehicleTypes = () => {
    Axios()
      .get("api/v1/osogo/vehicle-types")
      .then((r) => {
        setVehicleTypes(r?.data?.data ?? []);
      })
      .catch((e) => {})
      .finally(() => {});
  };
  const getUseTerritoryRegions = () => {
    Axios()
      .get("api/v1/osogo/use-territory-regions")
      .then((r) => {
        setUseTerritoryRegions(r?.data?.data ?? []);
      })
      .catch((e) => {})
      .finally(() => {});
  };
  const getDiscount = () => {
    Axios()
      .get("api/v1/osogo/discounts")
      .then((r) => {
        setDiscounts(r?.data?.data ?? []);
      })
      .catch((e) => {})
      .finally(() => {});
  };
  const getResidents = () => {
    Axios()
      .get("api/v1/osogo/residents")
      .then((r) => {
        let l = [];
        get(r, "data.data", []).forEach((o) => {
          l.push({ id: o?.inson_id, name: o?.name ?? "" });
        });
        setResidents(l);
      })
      .catch((e) => {})
      .finally(() => {});
  };
  const getRelatives = () => {
    Axios()
      .get("api/v1/osogo/relatives")
      .then((r) => {
        let l = [];
        get(r, "data.data", []).forEach((o) => {
          l.push({ id: o?.inson_id, name: o?.name ?? "" });
        });
        setRelatives(l);
      })
      .catch((e) => {})
      .finally(() => {});
  };
  function formatDate(dateStr) {
    const dateParts = dateStr.split("-");
    const formattedDate =
      dateParts[2] + "." + dateParts[1] + "." + dateParts[0];
    return formattedDate;
  }
  const insuranceCreate = () => {
    dispatch({ type: "SET_LOADING", payload: true });
    let d = {
        appl_fizyur: null,
        appl_pinfl: null,
        appl_birthdate: null,
        appl_pasp_sery: null,
        appl_pasp_num: null,
        appl_surname: null,
        appl_name: null,
        appl_patronym: null,
        appl_oblast: null,
        appl_rayon: null,
        appl_inn: null,
        appl_orgname: null,
        renumber: insuranceData?.step2?.gov_number ?? null,
        texpsery: insuranceData?.step2?.tech_passport_seria ?? null,
        texpnumber: insuranceData?.step2?.tech_passport_number ?? null,
        marka: insuranceData?.step2_result?.MARKA_ID ?? null,
        model: insuranceData?.step2_result?.MODEL_ID ?? null,
        vmodel: insuranceData?.step2_result?.MODEL_NAME ?? null,
        type: insuranceData?.step2_result?.VEHICLE_TYPE_ID ?? null,
        texpdate: insuranceData?.step2_result?.TECH_PASSPORT_ISSUE_DATE ?? null,
        year: insuranceData?.step2_result?.ISSUE_YEAR ?? null,
        kuzov: insuranceData?.step2_result?.BODY_NUMBER ?? null,
        dvigatel: insuranceData?.step2_result?.ENGINE_NUMBER ?? null,
        use_territory: insuranceData?.step2_result?.USE_TERRITORY ?? null,
        owner_fy: insuranceData?.step2_result?.FY ?? null,
        owner_pinfl: insuranceData?.step2_result?.PINFL ?? null,
        owner_birthdate: insuranceData?.step2_owner?.BIRTH_DATE ?? null,
        owner_pasp_sery: insuranceData?.step2?.owner_pasp_sery ?? null,
        owner_pasp_num: insuranceData?.step2?.owner_pasp_num ?? null,
        owner_surname: insuranceData?.step2_result?.LAST_NAME ?? null,
        owner_name: insuranceData?.step2_result?.FIRST_NAME ?? null,
        owner_patronym: insuranceData?.step2_result?.MIDDLE_NAME ?? null,
        owner_oblast: insuranceData?.step2_owner?.OBLAST ?? null,
        owner_rayon: insuranceData?.step2_owner?.RAYON ?? null,
        owner_inn: insuranceData?.step2_result?.INN ?? null,
        owner_orgname: insuranceData?.step2_result?.ORGNAME ?? null,
        owner_phone: insuranceData?.step2?.owner_phone ?? null,
        has_benefit: 1,
        applicant_isowner: 1,
        // applicant_isowner: insuranceData?.step2?.applicant_isowner ?? 0,
        // applicant_isowner: insuranceData?.step2_result?.applicant_isowner ?? 0,
        owner_isdriver: insuranceData?.owner_isdriver,
        driver_limit: insuranceData?.step1?.driver_limit ?? null,
        contract_begin: formatDate(insuranceData?.step1?.date_from ?? ""),
        is_renewal: 0,
        old_polis: null,
        prem: insuranceData?.step1_result?.prem ?? null,
        opl_type: insuranceData?.step1?.period ?? null,
        dog_num: null,
        dog_date: null,
      },
      err = "",
      tt = true;
    if (insuranceData?.drivers?.length > 0) {
      let drivers_list = [];
      insuranceData.drivers.forEach((item) => {
        drivers_list.push({
          datebirth: item?.result?.BIRTH_DATE ?? null,
          paspsery: item?.paspsery,
          paspnumber: item?.paspnumber,
          pinfl: item?.pinfl,
          surname: item?.result?.LAST_NAME_LATIN ?? null,
          name: item?.result?.FIRST_NAME_LATIN ?? null,
          patronym: item?.result?.MIDDLE_NAME_LATIN ?? null,
          licsery: item?.result?.LICENSE_SERIA ?? null,
          licnumber: item?.result?.LICENSE_NUMBER ?? null,
          licdate: item?.result?.ISSUE_DATE ?? null,
          relative: item?.relative,
          resident: item?.resident ?? 0,
        });
      });
      d = { ...d, drivers: drivers_list };
      Axios()
        .post("api/v1/osogo/create", d)
        .then((r) => {
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
          setStep(7);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        })
        .catch((e) => {
          // setErrors({
          //   ...errors,
          //   common: e?.response?.data?.message ?? t("auth.system_err"),
          // });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      err = t("osogo.drivers_err");
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  return (
    <>
      <CheckUser is_requaried={false} />
      <Layout>
        <Navigator
          active={t("_osogo.title")}
          //   navs={[{ title: t("news.title"), link: "/news" }]}
        />
        {loading ? (
          <Loading is_loading={loading} />
        ) : (
          <>
            <OsogoContainer>
              <div className="title_target">
                <TitelBlack word={t("_osogo.title")} className="title" />
              </div>
              <StepSlider2
                data={{
                  step: step,
                  items: [
                    // { title: t("_osogo.s1") },
                    // { title: t("_osogo.s2") },
                    // { title: t("_osogo.s3") },
                    // { title: t("_osogo.s4") },
                    // { title: t("_osogo.s5") },
                    // { title: t("_osogo.s6") },
                    // { title: t("_osogo.s7") },

                    { title: `${t("_osogo.step")} 1` },
                    { title: `${t("_osogo.step")} 2` },
                    { title: `${t("_osogo.step")} 3` },
                    { title: `${t("_osogo.step")} 4` },
                    { title: `${t("_osogo.step")} 5` },
                    { title: `${t("_osogo.step")} 6` },
                    { title: `${t("_osogo.step")} 7` },
                  ],
                }}
              />
              {step === 6 ? (
                <Step_6
                  step={step}
                  setStep={setStep}
                  insuranceData={insuranceData}
                  // insuranceData={test_data}
                  insuranceCreate={insuranceCreate}
                  setInsuranceData={setInsuranceData}
                />
              ) : step === 7 ? (
                <Step_7
                  step={step}
                  setStep={setStep}
                  insuranceData={insuranceData}
                  setInsuranceData={setInsuranceData}
                />
              ) : (
                <div className="content">
                  <div className="form_target">
                    {step === 1 ? (
                      <Step1
                        sdata={insuranceData?.step2 ?? {}}
                        setSdata={(o) =>
                          setInsuranceData({ ...insuranceData, step2: o })
                        }
                        setLoading={setLoading}
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                      />
                    ) : step === 2 ? (
                      <Step2
                        sdata={insuranceData?.step2 ?? {}}
                        setSdata={(o) =>
                          setInsuranceData({ ...insuranceData, step2: o })
                        }
                        setLoading={setLoading}
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                      />
                    ) : step === 3 ? (
                      <Step_3
                        sdata={insuranceData?.step1 ?? {}}
                        setSdata={(o) =>
                          setInsuranceData({ ...insuranceData, step1: o })
                        }
                        setLoading={setLoading}
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                        useTerritoryRegions={useTerritoryRegions}
                        discounts={discounts}
                        vehicleTypes={vehicleTypes}
                      />
                    ) : step === 4 ? (
                      <Step_4
                        step={step}
                        setStep={setStep}
                        drivers={get(insuranceData, "drivers", [])}
                        setDrivers={(l) =>
                          setInsuranceData({ ...insuranceData, drivers: l })
                        }
                        residents={residents}
                        relatives={relatives}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                        limit={
                          insuranceData?.step1?.driver_limit === 4 ? 5 : -1
                        }
                      />
                    ) : step === 5 ? (
                      <Step_5
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                      />
                    ) : null}
                  </div>
                  {step > 3 ? (
                    <div className="result">
                      <Forma
                        title={t("_osogo.result")}
                        className="result_forma"
                      >
                        {insuranceData?.step1_result?.prem ? (
                          <div className="info">
                            <div className="i_title">{t("_osogo.r_text1")}</div>
                            <div className="i_value">
                              {insuranceData?.step1_result?.prem}{" "}
                              {t("_osogo.sum")}
                            </div>
                          </div>
                        ) : null}
                        <div className="info">
                          <div className="i_title">{t("_osogo.r_text2")}</div>
                          <div className="i_value">{t("_osogo.r_value2")}</div>
                        </div>
                        <div className="info">
                          <div className="i_title">{t("_osogo.r_text3")}</div>
                          <div className="i_value">{t("_osogo.r_value3")}</div>
                        </div>
                        <div className="info">
                          <div className="i_title">{t("_osogo.r_text4")}</div>
                          <div className="i_value">{t("_osogo.r_value4")}</div>
                        </div>
                      </Forma>
                    </div>
                  ) : null}
                </div>
              )}
            </OsogoContainer>
          </>
        )}
      </Layout>
    </>
  );
};

export default Osogo;

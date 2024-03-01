import React, { useEffect, useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Loading from "../../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import { OsogoContainer } from "../../styleComponents/components/OsogoStyle";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import StepSlider from "../../sections/osogo/StepSlider";
import Forma from "../../sections/formSections/Forma";
import Step1 from "../../sections/osogo/Step1";
import Step2 from "../../sections/osogo/Step2";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import Step3 from "../../sections/osogo/Step3";
import Step4 from "../../sections/osogo/Step4";
import CheckUser from "../../sections/layout/CheckUser";

const Osogo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [insuranceData, setInsuranceData] = useState({ drivers: [{}] });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [useTerritoryRegions, setUseTerritoryRegions] = useState([]);
  const [relatives, setRelatives] = useState([]);
  const [residents, setResidents] = useState([]);
  useEffect(() => {
    getVehicleTypes();
    getUseTerritoryRegions();
    getDiscount();
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
        setResidents(r?.data?.data ?? []);
      })
      .catch((e) => {})
      .finally(() => {});
  };
  const getRelatives = () => {
    Axios()
      .get("api/v1/osogo/relatives")
      .then((r) => {
        setRelatives(r?.data?.data ?? []);
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
        applicant_isowner: insuranceData?.step2?.applicant_isowner ?? 0,
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
      let drivers_list = [],
        d_list = [];
      insuranceData.drivers.forEach((item, index) => {
        let dt = true,
          err = {};
        if (!item?.resident) {
          dt = false;
          tt = false;
          err = { ...err, resident: true };
        }
        if (!item?.relative) {
          dt = false;
          tt = false;
          err = { ...err, relative: true };
        }
        if (!item?.paspsery) {
          dt = false;
          tt = false;
          err = { ...err, paspsery: true };
        }
        if (!item?.paspnumber) {
          dt = false;
          tt = false;
          err = { ...err, paspnumber: true };
        }
        if (!item?.pinfl) {
          dt = false;
          tt = false;
          err = { ...err, pinfl: true };
        }
        if (!item?.result?.BIRTH_DATE) {
          dt = false;
          tt = false;
          err = { ...err, common: t("osogo.drivers_err") };
        }
        if (dt) {
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
            resident: item?.resident,
          });
        } else {
          d_list.push({ ...item, errors: err });
        }
      });
      if (tt) {
        d = { ...d, drivers: drivers_list };
        Axios()
          .post("api/v1/osogo/create", d)
          .then((r) => {
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
        setInsuranceData({ ...insuranceData, drivers: d_list });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } else {
      err = t("osogo.drivers_err");
      dispatch({ type: "SET_LOADING", payload: false });
    }
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
                        setLoading={setLoading}
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                        useTerritoryRegions={useTerritoryRegions}
                        discounts={discounts}
                        vehicleTypes={vehicleTypes}
                      />
                    ) : step === 2 ? (
                      <Step2
                        setLoading={setLoading}
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                        useTerritoryRegions={useTerritoryRegions}
                        vehicleTypes={vehicleTypes}
                        residents={residents}
                        relatives={relatives}
                        insuranceCreate={insuranceCreate}
                      />
                    ) : null}
                  </div>
                  <div className="result">
                    <Forma title={t("osogo.result")} className="result_forma">
                      {insuranceData?.step1_result?.prem ? (
                        <div className="info">
                          <div className="i_title">{t("osogo.r_text1")}</div>
                          <div className="i_value">
                            {insuranceData?.step1_result?.prem} {t("osogo.sum")}
                          </div>
                        </div>
                      ) : null}
                      <div className="info">
                        <div className="i_title">{t("osogo.r_text2")}</div>
                        <div className="i_value">
                          40 000 000.00 {t("osogo.sum")}
                        </div>
                      </div>
                      <div className="info">
                        <div className="i_title">{t("osogo.r_text3")}</div>
                        <div className="i_value">65 %</div>
                      </div>
                      <div className="info">
                        <div className="i_title">{t("osogo.r_text4")}</div>
                        <div className="i_value">35 %</div>
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

export default Osogo;

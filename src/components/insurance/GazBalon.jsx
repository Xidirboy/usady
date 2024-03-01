import React, { useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Loading from "../../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import { OsogoContainer } from "../../styleComponents/components/OsogoStyle";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import StepSlider from "../../sections/osogo/StepSlider";
import Forma from "../../sections/formSections/Forma";
import Step1 from "../../sections/gazbalon/Step1";
import Step2 from "../../sections/gazbalon/Step2";
import Step3 from "../../sections/gazbalon/Step3";
import Step4 from "../../sections/gazbalon/Step4";
import CheckUser from "../../sections/layout/CheckUser";

const GazBalon = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [insuranceData, setInsuranceData] = useState({});
  const [step, setStep] = useState(1);
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
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                      />
                    ) : step === 2 ? (
                      <Step2
                        step={step}
                        setStep={setStep}
                        insuranceData={insuranceData}
                        setInsuranceData={setInsuranceData}
                      />
                    ) : null}
                  </div>
                  <div className="result">
                    <Forma
                      title={t("gaz_balon_result.title")}
                      className="result_forma"
                    >
                      <div className="info">
                        <div className="i_title">
                          {t("gaz_balon_result.text1")}
                        </div>
                        <div className="i_value">
                          {t("gaz_balon_result.value1")}
                        </div>
                      </div>
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

export default GazBalon;

import React, { useEffect, useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Loading from "../../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import { OsogoContainer } from "../../styleComponents/components/OsogoStyle";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Axios from "../../utils/httpClient";
// import { useDispatch } from "react-redux";
import Step4 from "../../sections/osogo/Step4";
import CheckUser from "../../sections/layout/CheckUser";
import { useParams } from "react-router-dom";
import { get } from "lodash";
import ReCreateStep1 from "../../sections/osogo/ReCreateStep1";
import Step_7 from "../../sections/osogo/Step_7";

const OsogoReCreate = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(3);
  const [errors, setErrors] = useState("");
  const [insuranceData, setInsuranceData] = useState({ drivers: [{}] });
  useEffect(() => {
    // reCreatePolis();
    getPolis();
  }, []);
  const getPolis = () => {
    setLoading(true);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    Axios()
      .get(`api/v1/auth/my/anketa?id=${params?.anketa_id}&type=0`)
      .then((r) => {
        setInsuranceData({
          ...insuranceData,
          step3_result: get(r, "data.data.polis", {}),
        });
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
  const reCreatePolis = () => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    Axios()
      .post(`/api/v1/osogo/re-create`, { id: params?.anketa_id })
      .then((r) => {
        if (r?.data?.status === 1) {
          setInsuranceData({
            ...insuranceData,
            // step3_result: r?.data?.data ?? {},
            anketa_id: r?.data?.data?.anketa_id ?? 0,
          });
          setStep(4);
        } else {
          setErrors(r?.data?.message ?? t("auth.system_err"));
        }
      })
      .catch((e) => {
        setErrors(e?.response?.data?.message ?? t("auth.system_err"));
      })
      .finally(() => {
        setLoading(false);
      });
  }; 

  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("_osogo.title")}
          //   navs={[{ title: t("news.title"), link: "/news" }]}
        />
        {loading ? (
          <Loading is_loading={loading} />
        ) : (
          <OsogoContainer>
            {errors ? (
              <div className="error_card">
                <div className="error_img">
                  <img src="/images/404.png" alt="Inson 404" />
                </div>
                <div>{errors}</div>
              </div>
            ) : (
              <>
                <div className="title_target">
                  <TitelBlack word={t("_osogo.title")} className="title" />
                </div>
                {step === 3 ? (
                  <ReCreateStep1
                    data={insuranceData?.step3_result}
                    reCreatePolis={reCreatePolis}
                  />
                ) : step === 4 ? (
                  <Step_7
                    setStep={setStep}
                    insuranceData={insuranceData}
                    setInsuranceData={setInsuranceData}
                  />
                ) : null}
              </>
            )}
          </OsogoContainer>
        )}
      </Layout>
    </>
  );
};

export default OsogoReCreate;

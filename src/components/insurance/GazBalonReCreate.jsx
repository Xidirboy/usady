import React, { useEffect, useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Loading from "../../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import { OsogoContainer } from "../../styleComponents/components/OsogoStyle";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Step4 from "../../sections/gazbalon/Step4";
import CheckUser from "../../sections/layout/CheckUser";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { get } from "lodash";
import Axios from "../../utils/httpClient";
import ReCreateStep1 from "../../sections/gazbalon/ReCreateStep1";

const GazBalonReCreate = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  const params = useParams();
  const [redata, setReData] = useState({});
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(3);
  const [insuranceData, setInsuranceData] = useState({});
  useEffect(() => {
    // getPolis();
    reCreatePolis();
  }, []);
  const getPolis = () => {
    setLoading(true);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    Axios()
      .get(`api/v1/auth/my/anketa?id=${params?.anketa_id}&type=2`)
      .then((r) => {
        setReData(get(r, "data.data.polis", {}));
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
      .post(`/api/v1/gazbalon/re-create`, { id: params?.anketa_id })
      .then((r) => {
        if (r?.data?.status === 1) {
          setInsuranceData({
            ...insuranceData,
            step3_result: r?.data?.data ?? {},
          });
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
          active={t("osogo.navigation")}
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
                <div> {errors}</div>
              </div>
            ) : (
              <>
                <div className="title_target">
                  <TitelBlack word={t("osogo.polis")} className="title" />
                </div>
                {step === 3 ? (
                  <ReCreateStep1
                    data={insuranceData?.step3_result}
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
                ) : null}
              </>
            )}
          </OsogoContainer>
        )}
      </Layout>
    </>
  );
};

export default GazBalonReCreate;

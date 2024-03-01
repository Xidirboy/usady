import React, { useEffect, useState } from "react";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import Loading from "../../sections/utilsSections/Loading";
import { useTranslation } from "react-i18next";
import { OsogoContainer } from "../../styleComponents/components/OsogoStyle";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import Step4 from "../../sections/travel/Step4";
import CheckUser from "../../sections/layout/CheckUser";
import { useParams } from "react-router-dom";
import ReCreateStep1 from "../../sections/travel/ReCreateStep1";
import Step_8 from "../../sections/travel/Step_8";

const TravelReCreate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(3);
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
    getPolis();
    // reCreatePolis();
  }, []);
  const reCreatePolis = () => {
    setLoading(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    Axios()
      .post(`/api/v1/travel/re-create`, { id: params?.anketa_id })
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

  const getPolis = () => {
    setLoading(true);
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    Axios()
      .get(`api/v1/auth/my/anketa?id=${params?.anketa_id}&type=1`)
      .then((r) => {
        setInsuranceData({
          ...insuranceData,
          step3_result: get(r, "data.data.polis", {}),
        });
        getAbroadProgram({
          countries: get(r, "data.data.polis.data.countries", []),
        });
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  };
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

  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("_travel.title")}
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
                  <TitelBlack word={t("_travel.title")} className="title" />
                </div>
                {step === 3 ? (
                  <ReCreateStep1
                    reCreatePolis={reCreatePolis}
                    data={insuranceData?.step3_result ?? {}}
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
                  <Step_8
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

export default TravelReCreate;

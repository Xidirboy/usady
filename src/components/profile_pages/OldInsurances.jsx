import { useEffect, useState } from "react";
import { MyInsurancesContainer } from "../../styleComponents/components/profile_pages_style/MyInsurancesStyle";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Bar from "../../sections/profileSections/Bar";
import { useTranslation } from "react-i18next";
import { Btn } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import Moment from "react-moment";
import Card from "../../sections/formSections/Card";
import CheckUser from "../../sections/layout/CheckUser";
import Input from "../../sections/formSections/Input";
import ErrorShow from "../../sections/formSections/ErrorShow";
const arrowIcon = (
  <svg
    width="16"
    height="9"
    viewBox="0 0 16 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.29289 8.70711C7.68342 9.09763 8.31658 9.09763 8.70711 8.70711L15.0711 2.34315C15.4616 1.95262 15.4616 1.31946 15.0711 0.928932C14.6805 0.538408 14.0474 0.538408 13.6569 0.928932L8 6.58579L2.34315 0.928932C1.95262 0.538408 1.31946 0.538408 0.928932 0.928932C0.538408 1.31946 0.538408 1.95262 0.928932 2.34315L7.29289 8.70711ZM7 7L7 8L9 8L9 7L7 7Z"
      fill="black"
    />
  </svg>
);
const icon = (
  <svg
    width="25"
    height="19"
    viewBox="0 0 25 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.5">
      <path
        d="M0 1.9C0 0.850659 0.839466 0 1.875 0H23.125C24.1605 0 25 0.850659 25 1.9C25 2.94934 24.1605 3.8 23.125 3.8H1.875C0.839466 3.8 0 2.94934 0 1.9Z"
        fill="#556C82"
      ></path>
      <path
        d="M0 9.5C0 8.45066 0.839466 7.6 1.875 7.6H23.125C24.1605 7.6 25 8.45066 25 9.5C25 10.5493 24.1605 11.4 23.125 11.4H1.875C0.839466 11.4 0 10.5493 0 9.5Z"
        fill="#556C82"
      ></path>
      <path
        d="M0 17.1C0 16.0507 0.839466 15.2 1.875 15.2H23.125C24.1605 15.2 25 16.0507 25 17.1C25 18.1493 24.1605 19 23.125 19H1.875C0.839466 19 0 18.1493 0 17.1Z"
        fill="#556C82"
      ></path>
    </g>
  </svg>
);
const OldInsurances = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [openBar, setOpenBar] = useState(false);
  const [pdata, setPdata] = useState([]);
  const [data, setData] = useState({});
  const [errors, setErros] = useState({});
  const [openBlock, setOpenBlock] = useState(`_0`);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);
  const getMyInsurance = (e) => {
    e.preventDefault();
    if (data?.pinfl?.length === 14) {
      dispatch({ type: "SET_LOADING", payload: true });
      Axios()
        .get(`api/v1/auth/my/old-polis?pinfl=${data?.pinfl}`)
        .then((r) => {
          if (get(r, "data.old_polis.policies", [])?.length) {
            setPdata(get(r, "data.old_polis.policies", []));
          } else {
            setErros({ ...errors, common: t("old_polis.err2") });
          }
        })
        .catch((e) => {
          setErros({ ...errors, common: t("old_polis.err1") });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      setErros({ ...errors, pinfl: true });
    }
  };
  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator
          active={t("old_polis.title")}
          navs={[
            { title: t("profile.account"), link: "/profile" },
            {
              title: t("profile.my_insurances"),
              link: "/profile/my-insurances",
            },
          ]}
        />
        <MyInsurancesContainer>
          <div className="top_title">
            <button className="bar_btn" onClick={() => setOpenBar(true)}>
              {icon}
            </button>
            <TitelBlack word={t("profile.title")} />
          </div>
          <div className="p_main">
            <Bar openBar={openBar} setOpenBar={setOpenBar} />
            <div className="content">
              {/* <div className="btns" style={{ paddingBottom: 20 }}>
                <Btn onClick={() => setIsOpen(true)}>{t("my_polis.new")}</Btn>
              </div> */}
              {pdata?.length ? (
                <>
                  <div className="items">
                    {pdata?.map((item, index) => (
                      <div className="item" key={"osogo" + index}>
                        <div
                          className="i_head"
                          onClick={() => {
                            setOpenBlock(
                              openBlock === `_${index}` ? 0 : `_${index}`
                            );
                          }}
                        >
                          <div
                            className={
                              openBlock === `_${index}`
                                ? "name active_name"
                                : "name"
                            }
                          >
                            {i18n?.language === "uz"
                              ? item?.insurance_name_uz
                              : item?.insurance_name_ru}
                          </div>
                          <div className="right">
                            <span
                              className={
                                openBlock === `_${index}`
                                  ? "arrow openArrow"
                                  : "arrow"
                              }
                            >
                              {arrowIcon}
                            </span>
                          </div>
                        </div>
                        <div
                          className={
                            openBlock === `_${index}`
                              ? "i_body i_open_body"
                              : "i_body"
                          }
                        >
                          <div className="row">
                            <div className="col">
                              <div>{t("my_polis.anketa_id")}</div>
                              <div>{t("my_polis.contract_begin")}</div>
                              <div>{t("my_polis.end_date")}</div>
                            </div>
                            <div className="col_v">
                              <div>{item?.policy_id ?? "____"}</div>
                              <div>
                                <Moment format="DD-MM-YYYY">
                                  {item?.start_date}
                                </Moment>
                              </div>
                              <div>
                                <Moment format="DD-MM-YYYY">
                                  {item?.end_date}
                                </Moment>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div>{t("my_polis.polis_number")}</div>
                              <div>{t("my_polis.polis_price")}</div>
                            </div>
                            <div className="col_v">
                              <div>
                                {item?.policy_seria ?? "____"}{" "}
                                {item?.policy_number ?? "____"}
                              </div>
                              <div>
                                {get(
                                  item,
                                  "policy_payments.0.payment_amount",
                                  "____"
                                )}{" "}
                                {t("my_polis.sum")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <Card className="no_data">
                  <div className="text">{t("old_polis.history")}</div>
                  <form onSubmit={getMyInsurance}>
                    <div className="pnfl_target">
                      <Input
                        mask="nnnnnnnnnnnnnn"
                        placeholder=""
                        label={t("old_polis.pinfl")}
                        is_icon={false}
                        name="pinfl"
                        value={data?.pinfl}
                        is_error={errors?.pinfl}
                        onChange={(e) => {
                          setData({
                            ...data,
                            [e.target.name]: e.target.value?.replace("_", ""),
                          });
                          setErros({
                            ...errors,
                            [e.target.name]: false,
                            common: "",
                          });
                        }}
                      />
                    </div>
                    <div>
                      <Btn>{t("old_polis.view")}</Btn>
                      {errors?.common ? (
                        <div className="common_err">
                          <ErrorShow
                            errorText={errors?.common}
                            show_error={errors?.common}
                          />
                        </div>
                      ) : null}
                    </div>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </MyInsurancesContainer>
      </Layout>
    </>
  );
};

export default OldInsurances;

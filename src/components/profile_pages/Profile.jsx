import React, { useEffect, useState } from "react";
import { ProfileContainer } from "../../styleComponents/components/profile_pages_style/ProfileStyle";
import Layout from "../../sections/layout/Layout";
import Navigator from "../../sections/commonSections/Navigator";
import TitelBlack from "../../sections/utilsSections/TitelBlack";
import Bar from "../../sections/profileSections/Bar";
import { useTranslation } from "react-i18next";
import Card from "../../sections/formSections/Card";
import Input from "../../sections/formSections/Input";
import FormTitle from "../../sections/formSections/FormTitle";
import { Btn } from "../../styleComponents/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/httpClient";
import CheckUser from "../../sections/layout/CheckUser";

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const [openBar, setOpenBar] = useState(false);
  const [pdata, setPdata] = useState({});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setPdata(user);
  }, [user]);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!pdata?.first_name) {
      tt = false;
      err = { ...err, first_name: true };
    }
    if (!pdata?.last_name) {
      tt = false;
      err = { ...err, last_name: true };
    }
    if (!pdata?.middle_name) {
      tt = false;
      err = { ...err, middle_name: true };
    }
    if (!pdata?.birthday) {
      tt = false;
      err = { ...err, birthday: true };
    }
    if (!pdata?.doc_type) {
      tt = false;
      err = { ...err, doc_type: true };
    }
    if (pdata?.doc_number_serial?.length !== 9) {
      tt = false;
      err = { ...err, doc_number_serial: true };
    }
    if (!pdata?.doc_given) {
      tt = false;
      err = { ...err, doc_given: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/auth/profile", pdata)
        .then((r) => {
          if (r?.data?.user?.id) {
            dispatch({ type: "SET_USER", payload: r?.data?.user ?? {} });
            const firstError = document.querySelector(".content");
            if (firstError) {
              firstError.scrollIntoView({
                behavior: "smooth",
              });
            }
          } else {
            setErrors({
              ...errors,
              common: r?.data?.message ?? t("auth.system_err"),
            });
          }
        })
        .catch((e) => {
          setErrors({
            ...errors,
            common: e?.response?.data?.message ?? t("auth.system_err"),
          });
        })
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      setErrors(err);
      dispatch({ type: "SET_LOADING", payload: false });
      const firstError = document.querySelector(".is_error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };
  return (
    <>
      <CheckUser is_requaried={true} />
      <Layout>
        <Navigator active={t("profile.account")} />
        <ProfileContainer>
          <div className="top_title">
            <button className="bar_btn" onClick={() => setOpenBar(true)}>
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
            </button>
            <TitelBlack
              word={`${t("profile.title")} ${user?.first_name ?? ""} ${
                user?.last_name ?? ""
              }`}
            />
          </div>
          <div className="p_main">
            <Bar openBar={openBar} setOpenBar={setOpenBar} />
            <div className="content">
              <form onSubmit={onSubmit}>
                <Card>
                  <FormTitle word={t("profile.form_title")} />
                  {/* <Input
                  label="E-mail"
                  is_disabled={true}
                  is_icon={false}
                  is_icon_comp={pdata?.email}
                  value={pdata?.email}
                  name="email"
                  onChange={(e) => {
                    setPdata({ ...pdata, [e.target.name]: e.target.value });
                  }}
                /> */}
                  <Input
                    label={t("profile.phone")}
                    type={"number"}
                    is_disabled={true}
                    is_icon={false}
                    value={pdata?.name}
                    name="name"
                    mask="+998(nn) nnn-nn-nn"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  {/* <Input
                  label="Индификационный код"
                  type="number"
                  is_error={true}
                  is_icon_comp={pdata?.sms_code}
                  value={pdata?.sms_code}
                  name="sms_code"
                  onChange={(e) => {
                    setPdata({ ...pdata, [e.target.name]: e.target.value });
                  }}
                /> */}
                  <Input
                    label={t("profile.first_name")}
                    is_error={errors?.first_name}
                    is_icon_comp={pdata?.first_name}
                    value={pdata?.first_name}
                    name="first_name"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  <Input
                    label={t("profile.last_name")}
                    is_icon_comp={pdata?.last_name}
                    value={pdata?.last_name}
                    is_error={errors?.last_name}
                    name="last_name"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  <Input
                    label={t("profile.middle_name")}
                    is_icon_comp={pdata?.middle_name}
                    value={pdata?.middle_name}
                    is_error={errors?.middle_name}
                    name="middle_name"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  <Input
                    label={t("profile.birthday")}
                    type="date"
                    is_icon_comp={pdata?.birthday}
                    value={pdata?.birthday}
                    is_error={errors?.birthday}
                    name="birthday"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                </Card>
                <Card>
                  <FormTitle word={t("profile.form_title2")} />
                  <Input
                    label={t("profile.doc_type")}
                    placeholder={t("profile.doc_type_placeholder")}
                    is_icon_comp={pdata?.doc_type}
                    value={pdata?.doc_type}
                    is_error={errors?.doc_type}
                    name="doc_type"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                    options={[
                      { value: 1, label: t("profile.passport") },
                      { value: 2, label: t("profile.id_card") },
                    ]}
                  />
                  <Input
                    label={t("profile.doc_number_serial")}
                    is_icon_comp={pdata?.doc_number_serial}
                    value={pdata?.doc_number_serial}
                    is_error={errors?.doc_number_serial}
                    name="doc_number_serial"
                    mask="aa-nnnnnnn"
                    placeholder="AA-1234567"
                    onChange={(e) => {
                      setPdata({
                        ...pdata,
                        [e.target.name]: e.target.value
                          ?.toUpperCase()
                          .replace("-", "")
                          .replace("_", ""),
                      });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  <Input
                    label={t("profile.doc_given")}
                    type="date"
                    is_icon_comp={pdata?.doc_given}
                    value={pdata?.doc_given}
                    is_error={errors?.doc_given}
                    name="doc_given"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  {/* <Input
                    label={t("profile.danny")}
                    is_icon_comp={pdata?.danny}
                    value={pdata?.danny}
                    is_error={errors?.danny}
                    name="danny"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  <Input
                    label={t("profile.last_name_l")}
                    is_icon_comp={pdata?.last_name_l}
                    value={pdata?.last_name_l}
                    is_error={errors?.last_name_l}
                    name="last_name_l"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                  <Input
                    label={t("profile.first_name_l")}
                    is_icon_comp={pdata?.first_name_l}
                    value={pdata?.first_name_l}
                    is_error={errors?.first_name_l}
                    name="first_name_l"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  /> */}
                  <Input
                    label={t("profile.foreign_serial")}
                    is_icon_comp={pdata?.foreign_doc_number_serial}
                    value={pdata?.foreign_doc_number_serial}
                    is_error={errors?.foreign_doc_number_serial}
                    name="foreign_doc_number_serial"
                    onChange={(e) => {
                      setPdata({ ...pdata, [e.target.name]: e.target.value });
                      setErrors({
                        ...errors,
                        [e.target.name]: false,
                        common: "",
                      });
                    }}
                  />
                </Card>
                <div className="btns">
                  <Btn type="submit">{t("profile.save")}</Btn>
                </div>
              </form>
            </div>
          </div>
        </ProfileContainer>
      </Layout>
    </>
  );
};

export default Profile;

import { filter, get } from "lodash";
import Input from "../formSections/Input";
import { BtnWhite } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import ErrorShow from "../formSections/ErrorShow";

const Insureds = ({
  insureds,
  setInsureds,
  insuranceData,
  setInsuranceData,
  limit = -1,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const deleteInsured = (i, owner_isinsured) => {
    const l = filter(insureds, (o, index) => i !== index);
    setInsuranceData({
      ...insuranceData,
      insureds: l,
      owner_isinsured: owner_isinsured,
    });
  };
  const onChangeItem = (name, value, indexItem) => {
    let l = [];
    insureds.forEach((item, index) => {
      if (index === indexItem) {
        l.push({
          ...item,
          [name]: value,
          errors: { ...(item?.errors ?? {}), [name]: false, common: "" },
        });
      } else {
        l.push(item);
      }
    });
    setInsureds(l);
  };
  const checkInsured = (e, item, indexItem) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!item?.passportSeries) {
      tt = false;
      err = { ...err, passportSeries: true };
    }
    if (!item?.passportNumber) {
      tt = false;
      err = { ...err, passportNumber: true };
    }
    if (!item?.birthDate) {
      tt = false;
      err = { ...err, birthDate: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/travel/provider/passport-birth-date", {
          passportNumber: item.passportNumber,
          passportSeries: item.passportSeries,
          birthDate: dateFormat(item?.birthDate ?? ""),
        })
        .then((r) => {
          let l = [];
          insureds.forEach((item, index) => {
            if (index === indexItem) {
              if (get(r, "data.data.PINFL")) {
                l.push({
                  ...item,
                  result: r?.data?.data ?? {},
                });
              } else {
                l.push({
                  ...item,
                  errors: {
                    ...item?.errors,
                    common: "User not fount",
                  },
                });
              }
            } else {
              l.push(item);
            }
          });
          setInsureds(l);
        })
        .catch((e) => {})
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      let l = [];
      insureds.forEach((item, index) => {
        if (index === indexItem) {
          l.push({
            ...item,
            errors: err,
          });
        } else {
          l.push(item);
        }
      });
      setInsureds(l);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const changeOwnerIsInsured = (indexItem, owner_isinsured = 0) => {
    if (owner_isinsured === 1) {
      let l = [];
      insureds.forEach((item, index) => {
        if (index === indexItem) {
          l.push({
            ...item,
            owner_isinsured: owner_isinsured,
            result: insuranceData?.step2_owner ?? {},
            passportSeries: insuranceData?.step2?.owner_pasp_sery ?? null,
            passportNumber: insuranceData?.step2?.owner_pasp_num ?? null,
            birthDate: insuranceData?.step2_result?.PINFL ?? null,
          });
        } else {
          l.push(item);
        }
      });
      setInsuranceData({
        ...insuranceData,
        insureds: l,
        owner_isinsured: owner_isinsured,
      });
    } else {
      let l = [];
      insureds.forEach((item, index) => {
        if (index === indexItem) {
          l.push({
            ...item,
            owner_isinsured: owner_isinsured,
            result: "",
            passportSeries: "",
            passportNumber: "",
            birthDate: "",
          });
        } else {
          l.push(item);
        }
      });
      setInsuranceData({
        ...insuranceData,
        insureds: l,
        owner_isinsured: owner_isinsured,
      });
    }
  };

  const dateFormat = (d = "") => {
    const dl = d.split("-");
    return `${dl[2]}.${dl[1]}.${dl[0]}`;
  };
  return (
    <>
      <div className="sub_title">Insureds</div>
      {insureds.map((item, index) => (
        <div key={index}>
          <div className="sub_title insured_title">
            <span>Insured: {index + 1}</span>
            <span
              className="delete"
              onClick={() =>
                deleteInsured(index, item?.owner_isinsured ? 0 : 1)
              }
            >
              Удалить
            </span>
          </div>
          <div className="row">
            <form onSubmit={(e) => checkInsured(e, item, index)}>
              {/* {!insuranceData?.owner_isinsured || item?.owner_isinsured ? (
                <div className="checkbox_single">
                  <label>
                    <input
                      type="checkbox"
                      name="applicant_isowner"
                      checked={item?.owner_isinsured}
                      onChange={(e) => {
                        changeOwnerIsInsured(
                          index,
                          item?.owner_isinsured ? 0 : 1
                        );
                      }}
                    />
                    Ariza to'ldiruvchi sug'urtalanuvchimi?
                  </label>
                </div>
              ) : null} */}
              <div className="doc_number">
                <label>{t("travel_step2.passport")}</label>
                <div className="inputs">
                  <div className="seria">
                    <Input
                      mask="aa"
                      placeholder="AB"
                      is_icon={false}
                      name="passportSeries"
                      value={item?.passportSeries}
                      is_error={item?.errors?.passportSeries}
                      is_disabled={item?.result?.PINFL}
                      onChange={(e) =>
                        onChangeItem(
                          e.target.name,
                          e?.target?.value?.toUpperCase(),
                          index
                        )
                      }
                    />
                  </div>
                  <div className="number">
                    <Input
                      mask="nnnnnnn"
                      placeholder="1234567"
                      is_icon={false}
                      name="passportNumber"
                      is_disabled={item?.result?.PINFL}
                      value={item?.passportNumber}
                      is_error={item?.errors?.passportNumber}
                      onChange={(e) =>
                        onChangeItem(e.target.name, e.target.value, index)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col_2 col_btn_target">
                <div>
                  <Input
                    label={t("travel_step2.birthDate")}
                    type="date"
                    is_icon={false}
                    value={item?.birthDate}
                    is_error={item?.errors?.birthDate}
                    is_disabled={item?.result?.PINFL}
                    name="birthDate"
                    onChange={(e) => {
                      onChangeItem(e.target.name, e.target.value, index);
                    }}
                  />
                </div>
                {item?.result?.PINFL ? null : (
                  <div>
                    <BtnWhite className="check_insured_btn">Поиск</BtnWhite>
                  </div>
                )}
              </div>
              {item?.result?.PINFL ? (
                <div>
                  <Input
                    label={"ФИО"}
                    is_icon={false}
                    is_disabled={true}
                    value={`${get(
                      item,
                      "result.NVL(LAST_NAME_ENG,LAST_NAME)",
                      ""
                    )} ${get(
                      item,
                      "result.NVL(FIRST_NAME_ENG,FIRST_NAME)",
                      ""
                    )}`}
                  />
                </div>
              ) : null}
              {/* {item?.errors?.common ? (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {item?.errors?.common}
                </div>
              ) : null} */}
              <ErrorShow
                show_error={item?.errors?.common}
                errorText={item?.errors?.common}
              />
            </form>
          </div>
        </div>
      ))}
      <div className="add_insured">
        {limit === -1 || limit > insureds.length ? (
          <span
            onClick={() => {
              setInsureds([...insureds, {}]);
            }}
          >
            Add Insured
          </span>
        ) : null}
      </div>
    </>
  );
};

export default Insureds;

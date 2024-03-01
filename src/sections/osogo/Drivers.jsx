import { filter, get } from "lodash";
import Input from "../formSections/Input";
import { BtnWhite } from "../../styleComponents/GlobalStyle";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import ErrorShow from "../formSections/ErrorShow";

const Drivers = ({
  relatives,
  residents,
  drivers,
  setDrivers,
  insuranceData,
  setInsuranceData,
  limit = -1,
}) => {
  const dispatch = useDispatch();
  const deleteDriver = (i, owner_isdriver) => {
    const l = filter(drivers, (o, index) => i !== index);
    setInsuranceData({
      ...insuranceData,
      drivers: l,
      owner_isdriver: owner_isdriver,
    });
  };
  const onChangeItem = (name, value, indexItem) => {
    let l = [];
    drivers.forEach((item, index) => {
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
    setDrivers(l);
  };
  const checkDriver = (e, item, indexItem) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!item?.resident) {
      tt = false;
      err = { ...err, resident: true };
    }
    if (!item?.relative) {
      tt = false;
      err = { ...err, relative: true };
    }
    if (!item?.paspsery) {
      tt = false;
      err = { ...err, paspsery: true };
    }
    if (!item?.paspnumber) {
      tt = false;
      err = { ...err, paspnumber: true };
    }
    if (!item?.pinfl) {
      tt = false;
      err = { ...err, pinfl: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/osogo/driver-summary", {
          passport_number: item.paspnumber,
          passport_series: item.paspsery,
          pinfl: item.pinfl,
        })
        .then((r) => {
          let l = [];
          drivers.forEach((item, index) => {
            if (index === indexItem) {
              if (get(r, "data.data.BIRTH_DATE")) {
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
          setDrivers(l);
        })
        .catch((e) => {})
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      let l = [];
      drivers.forEach((item, index) => {
        if (index === indexItem) {
          l.push({
            ...item,
            errors: err,
          });
        } else {
          l.push(item);
        }
      });
      setDrivers(l);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const changeOwnerIsDriver = (indexItem, owner_isdriver = 0) => {
    if (owner_isdriver === 1) {
      let l = [];
      drivers.forEach((item, index) => {
        if (index === indexItem) {
          l.push({
            ...item,
            owner_isdriver: owner_isdriver,
            result: insuranceData?.step2_owner ?? {},
            resident: get(residents, "0.id"),
            relative: get(relatives, "0.id"),
            paspsery: insuranceData?.step2?.owner_pasp_sery ?? null,
            paspnumber: insuranceData?.step2?.owner_pasp_num ?? null,
            pinfl: insuranceData?.step2_result?.PINFL ?? null,
          });
        } else {
          l.push(item);
        }
      });
      setInsuranceData({
        ...insuranceData,
        drivers: l,
        owner_isdriver: owner_isdriver,
      });
    } else {
      let l = [];
      drivers.forEach((item, index) => {
        if (index === indexItem) {
          l.push({
            ...item,
            owner_isdriver: owner_isdriver,
            result: "",
            resident: "",
            relative: "",
            paspsery: "",
            paspnumber: "",
            pinfl: "",
          });
        } else {
          l.push(item);
        }
      });
      setInsuranceData({
        ...insuranceData,
        drivers: l,
        owner_isdriver: owner_isdriver,
      });
    }
  };
  return (
    <>
      <div className="sub_title">Drivers</div>
      {drivers.map((item, index) => (
        <div key={index}>
          <div className="sub_title driver_title">
            <span>Родственник: {index + 1}</span>
            <span
              className="delete"
              onClick={() => deleteDriver(index, item?.owner_isdriver ? 0 : 1)}
            >
              Удалить
            </span>
          </div>
          <div className="row">
            <form onSubmit={(e) => checkDriver(e, item, index)}>
              {!insuranceData?.owner_isdriver || item?.owner_isdriver ? (
                <div className="checkbox_single">
                  <label>
                    <input
                      type="checkbox"
                      name="applicant_isowner"
                      checked={item?.owner_isdriver}
                      onChange={(e) => {
                        changeOwnerIsDriver(
                          index,
                          item?.owner_isdriver ? 0 : 1
                        );
                      }}
                    />
                    Avtomashina egasi haydovchimi?
                  </label>
                </div>
              ) : null}
              <div className="col_2">
                <div>
                  <Input
                    label={"Гражданство"}
                    is_icon={false}
                    name="resident"
                    value={item?.resident}
                    is_error={item?.errors?.resident}
                    is_disabled={item?.result?.LAST_NAME_LATIN}
                    onChange={(e) =>
                      onChangeItem(e.target.name, e.target.value, index)
                    }
                    options={residents.map((item) => {
                      return item?.id === 1
                        ? { label: item?.name, value: item?.id }
                        : {
                            label: item?.name,
                            value: item?.id,
                            disabled: true,
                          };
                    })}
                  />
                </div>
                <div>
                  <Input
                    label={"Relative"}
                    is_icon={false}
                    name="relative"
                    value={item?.relative}
                    is_disabled={item?.result?.LAST_NAME_LATIN}
                    is_error={item?.errors?.relative}
                    onChange={(e) =>
                      onChangeItem(e.target.name, e.target.value, index)
                    }
                    options={relatives.map((item) => {
                      return { label: item?.name, value: item?.id };
                    })}
                  />
                </div>
              </div>
              <div className="doc_number">
                <label>Серия и номер паспорта</label>
                <div className="inputs">
                  <div className="seria">
                    <Input
                      mask="aa"
                      placeholder="AB"
                      is_icon={false}
                      name="paspsery"
                      value={item?.paspsery}
                      is_error={item?.errors?.paspsery}
                      is_disabled={item?.result?.LAST_NAME_LATIN}
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
                      name="paspnumber"
                      is_disabled={item?.result?.LAST_NAME_LATIN}
                      value={item?.paspnumber}
                      is_error={item?.errors?.paspnumber}
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
                    mask="nnnnnnnnnnnnnn"
                    placeholder="11223344556677"
                    label={"ПИНФЛ"}
                    is_icon={false}
                    is_disabled={item?.result?.LAST_NAME_LATIN}
                    name="pinfl"
                    value={item?.pinfl}
                    is_error={item?.errors?.pinfl}
                    onChange={(e) =>
                      onChangeItem(e.target.name, e.target.value, index)
                    }
                  />
                </div>
                {item?.result?.LAST_NAME_LATIN ? null : (
                  <div>
                    <BtnWhite className="check_driver_btn">Поиск</BtnWhite>
                  </div>
                )}
              </div>
              {item?.result?.LAST_NAME_LATIN ? (
                <div>
                  <Input
                    label={"ФИО"}
                    is_icon={false}
                    is_disabled={true}
                    value={`${item?.result?.LAST_NAME_LATIN} ${item?.result?.FIRST_NAME_LATIN} ${item?.result?.MIDDLE_NAME_LATIN}`}
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
      <div className="add_driver">
        {limit === -1 || limit > drivers.length ? (
          <span
            onClick={() => {
              setDrivers([...drivers, { resident: get(residents, "0.id") }]);
            }}
          >
            Add Driver
          </span>
        ) : null}
      </div>
    </>
  );
};

export default Drivers;

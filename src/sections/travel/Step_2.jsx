import React, { useState } from "react";
import styled from "styled-components";
import Forma from "../formSections/Forma";
import { Btn } from "../../styleComponents/GlobalStyle";
import Input from "../formSections/Input";
import { useTranslation } from "react-i18next";
import SelectComp from "../formSections/SelectComp";
import ErrorShow from "../formSections/ErrorShow";
import { filter, get } from "lodash";
import { AiOutlineDelete } from "react-icons/ai";
const Step_2Sytle = styled.div`
  & .d_flex {
    display: flex;
    gap: 10px;
    & input {
      text-align: center;
      color: #000 !important;
    }
  }
  & .s2_btn {
    margin: 14px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .dalete_item {
    color: red;
    font-size: 20px;
    margin: 13px 20px;
  }
  & .item_row {
    display: flex;
    align-items: flex-start;
  }
`;
const Step_2 = ({ step, setStep, sdata, setSdata }) => {
  const { t } = useTranslation();
  // const [sdata, setSdata] = useState({ day: 1 });
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    let tt = true,
      err = {};
    sdata?.forEach((o, i) => {
      if (!o.birthDate) {
        tt = false;
        err = { ...err, [i]: { birthDate: true } };
      }
    });
    if (tt) {
      setStep(3);
    } else {
      setErrors(err);
    }
  };
  const checkDateNow = (inputValue) => {
    if (inputValue) {
      var nowDate = new Date();
      var inputDate = new Date(inputValue);
      nowDate.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
      return inputDate > nowDate;
    }
    return false;
  };
  const deleteItem = (index) => {
    let l = [];
    sdata.forEach((o, i) => {
      if (index !== i) {
        l.push(o);
      }
    });
    setSdata(l);
  };
  return (
    <Step_2Sytle>
      <Forma title={t("_travel_s2.title")}
        has_back={true}
        onBack={() => setStep(step - 1)}>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="select_target d_flex">
              <Btn
                type="button"
                className="s2_btn"
                onClick={() => {
                  let ls = sdata;
                  if (ls?.length > 1) {
                    ls.pop();
                    setSdata(ls);
                  }
                }}
              >
                -
              </Btn>
              <Input
                label={""}
                type="number"
                is_icon={false}
                value={sdata?.length}
                is_disabled={true}
              />
              <Btn
                className="s2_btn"
                onClick={() => setSdata([...sdata, {}])}
                type="button"
              >
                +
              </Btn>
            </div>
            {sdata?.map((item, index) => (
              <div className="item_row">
                <div className="select_target" key={index}>
                  <Input
                    label={`${t("_travel_s2.date")} ${index + 1}`}
                    type="date"
                    is_icon={false}
                    value={item?.birthDate}
                    is_error={get(errors, `${index}.birthDate`)}
                    name="birthDate"
                    onChange={(e) => {
                      let il = sdata;
                      il[index] = { [e.target.name]: e.target.value };
                      setSdata(il);
                      setErrors({
                        ...errors,
                        [index]: {
                          ...errors,
                          [e.target.name]: false,
                          date_check_now: checkDateNow(e?.target?.value),
                        },
                      });
                    }}
                  />
                  {get(errors, `${index}.date_check_now`) ? (
                    <div className="date_error_check">
                      <ErrorShow
                        show_error={get(errors, `${index}.date_check_now`)}
                        errorText={t("_travel_s2.date_check")}
                      />
                    </div>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="dalete_item"
                  onClick={() => deleteItem(index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
          </div>
          <div className="btns">
            <Btn type="submit">{t("_travel_s2.btn")}</Btn>
          </div>
          {errors?.common ? (
            <div className="date_error_check">
              <ErrorShow
                show_error={errors?.common}
                errorText={errors?.common}
              />
            </div>
          ) : null}
        </form>
      </Forma>
    </Step_2Sytle>
  );
};

export default Step_2;

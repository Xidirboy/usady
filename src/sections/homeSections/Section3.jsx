import React, { useState } from "react";
import styled from "styled-components";
import InputUi from "../formSections/InputUi";
import { userIcon } from "../../assets/authIcons";
import { Btn } from "../../styleComponents/GlobalStyle";
const Section3Style = styled.div`
  background-image: url("/images/home/s31.png");
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  padding: 30px 0;
  & .form_target {
    background-color: #fff;
    max-width: 729px;
    border-radius: 16px;
    padding: 30px 20px;
    box-shadow: 0px 5.4px 5.47px 0px #235dff40;
    border: 1.34px solid #eeeeee;
    margin: auto;
    & .title_s3 {
      font-size: 32px;
      font-weight: 600;
      line-height: 51px;
      letter-spacing: 0.27px;
      text-align: center;
    }
    & .app_form {
      display: flex;
      flex-wrap: wrap;
      & .fi50 {
        width: 50%;
        padding: 0 10px;
      }
      & .fi100 {
        width: 100%;
        padding: 0 10px;
      }
    }
  }
`;
const Section3 = () => {
  const [sdata, setSdata] = useState({});
  const [errors, setErrors] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Section3Style>
      <div className="form_target">
        <div className="title_s3">Подать заявку</div>
        <form className="app_form" onSubmit={onSubmit}>
          <div className="fi50">
            <InputUi
              label="Взрослых"
              placeholder="Взрослых"
              icon={userIcon}
              name="full_name"
              value={sdata?.full_name}
              is_error={errors?.full_name}
              thin_label={true}
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e?.target?.name]: e?.target?.value,
                  common: "",
                });
                setErrors({
                  ...errors,
                  [e?.target?.name]: false,
                  common: "",
                });
              }}
            />
          </div>
          <div className="fi50">
            <InputUi
              label="Детей"
              placeholder="Детей"
              icon={userIcon}
              name="full_name"
              value={sdata?.full_name}
              is_error={errors?.full_name}
              thin_label={true}
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e?.target?.name]: e?.target?.value,
                  common: "",
                });
                setErrors({
                  ...errors,
                  [e?.target?.name]: false,
                  common: "",
                });
              }}
            />
          </div>
          <div className="fi50">
            <InputUi
              label="Дата вылета  и кол-во дней"
              placeholder="ФИО"
              icon={userIcon}
              name="full_name"
              value={sdata?.full_name}
              is_error={errors?.full_name}
              thin_label={true}
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e?.target?.name]: e?.target?.value,
                  common: "",
                });
                setErrors({
                  ...errors,
                  [e?.target?.name]: false,
                  common: "",
                });
              }}
            />
          </div>
          <div className="fi50">
            <InputUi
              label="Класс самолета"
              placeholder="Класс самолета"
              icon={userIcon}
              name="full_name"
              value={sdata?.full_name}
              is_error={errors?.full_name}
              thin_label={true}
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e?.target?.name]: e?.target?.value,
                  common: "",
                });
                setErrors({
                  ...errors,
                  [e?.target?.name]: false,
                  common: "",
                });
              }}
            />
          </div>
          <div className="fi100">
            <InputUi
              label="Напишите ваш бюджет"
              placeholder="до 15 000 000 сум "
              icon={userIcon}
              name="full_name"
              value={sdata?.full_name}
              is_error={errors?.full_name}
              thin_label={true}
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e?.target?.name]: e?.target?.value,
                  common: "",
                });
                setErrors({
                  ...errors,
                  [e?.target?.name]: false,
                  common: "",
                });
              }}
            />
          </div>
          <div className="fi100">
            <InputUi
              type={"textarea"}
              label="Дополнительная информация"
              placeholder="Напишите дополнительную которые нужно учесть. Например:  Отел должен быть рядом с пляжем"
              name="full_name"
              value={sdata?.full_name}
              is_error={errors?.full_name}
              thin_label={true}
              onChange={(e) => {
                setSdata({
                  ...sdata,
                  [e?.target?.name]: e?.target?.value,
                  common: "",
                });
                setErrors({
                  ...errors,
                  [e?.target?.name]: false,
                  common: "",
                });
              }}
            />
          </div>
          <div className="fi100">
            <Btn>Отправить заявку</Btn>
          </div>
        </form>
      </div>
    </Section3Style>
  );
};

export default Section3;

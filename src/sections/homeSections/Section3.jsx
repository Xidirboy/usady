import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputUi from "../formSections/InputUi";
import { userIcon } from "../../assets/authIcons";
import { Btn } from "../../styleComponents/GlobalStyle";
import {
  babyIcon,
  cashIcon,
  dateIcon,
  footIcon,
  fromCIcon,
  hotelIcon,
  toCIcon,
  typeIcon,
  usersIcon,
} from "../../assets/homeS3Icon";
import Axios from "../../utils/httpClient";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
const Section3Style = styled.div`
  background-image: url("/images/home/s31.png");
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  padding: 30px 0;
  @media (max-width: 900px) {
    padding: 0;
    margin-top: 15px;
  }
  & .form_target {
    background-color: #fff;
    max-width: 729px;
    border-radius: 16px;
    padding: 30px 20px;
    box-shadow: 0px 5.4px 5.47px 0px #235dff40;
    border: 1.34px solid #eeeeee;
    margin: auto;
    @media (max-width: 900px) {
      border-radius: 10px;
      padding: 15px 5px;
    }
    & .title_s3 {
      font-size: 32px;
      font-weight: 600;
      line-height: 51px;
      letter-spacing: 0.27px;
      text-align: center;
      color: #1e2344;
      padding-bottom: 30px;
      @media (max-width: 900px) {
        font-size: 21px;
        line-height: 34px;
        letter-spacing: 0.15px;
        padding-bottom: 15px;
      }
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
  const dispatch = useDispatch();
  const toast = useToast();
  const [sdata, setSdata] = useState({});
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState({});
  useEffect(() => {
    getOptions();
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    let tt = true,
      err = {};
    if (!sdata?.from) {
      tt = false;
      err = { ...err, from: true };
    }
    if (!sdata?.to) {
      tt = false;
      err = { ...err, to: true };
    }
    if (!sdata?.people_count) {
      tt = false;
      err = { ...err, people_count: true };
    }
    if (!sdata?.departure_date) {
      tt = false;
      err = { ...err, departure_date: true };
    }
    if (!sdata?.aircraft_class) {
      tt = false;
      err = { ...err, aircraft_class: true };
    }
    if (!sdata?.hotel_rating) {
      tt = false;
      err = { ...err, hotel_rating: true };
    }
    if (!sdata?.type_nutrition) {
      tt = false;
      err = { ...err, type_nutrition: true };
    }
    if (!sdata?.desc) {
      tt = false;
      err = { ...err, desc: true };
    }
    if (!sdata?.price) {
      tt = false;
      err = { ...err, price: true };
    }
    if (tt) {
      Axios()
        .post("api/v1/application/create", {
          ...sdata,
          day: 2,
          children_count: sdata?.children_count ? sdata?.children_count : 0,
        })
        .then((r) => {
          toast({
            title: "Ваша заявка отправлена.",
            description:
              "В ближайшее время вы получите предложения, соответствующие вашему заявлению.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        })
        .catch((e) => {})
        .finally(() => {
          dispatch({ type: "SET_LOADING", payload: false });
        });
    } else {
      setErrors(err);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const getOptions = () => {
    Axios()
      .get("api/v1/application/options")
      .then((r) => {
        setOptions(r?.data?.data ?? {});
      })
      .catch((e) => {})
      .finally(() => {});
  };
  return (
    <Section3Style>
      <div className="form_target">
        <div className="title_s3">Подать заявку</div>
        <form className="app_form" onSubmit={onSubmit}>
          <div className="fi50">
            <InputUi
              type="select"
              label="Откуда"
              placeholder="Откуда"
              icon={fromCIcon}
              name="from"
              value={sdata?.from}
              is_error={errors?.from}
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
              options={options?.countries?.map((o) => ({
                value: o?.id,
                label: o?.name_translate || o?.id,
              }))}
            />
          </div>
          <div className="fi50">
            <InputUi
              type="select"
              label="Куда"
              placeholder="Куда"
              icon={toCIcon}
              name="to"
              value={sdata?.to}
              is_error={errors?.to}
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
              options={options?.countries?.map((o) => ({
                value: o?.id,
                label: o?.name_translate || o?.id,
              }))}
            />
          </div>
          <div className="fi50">
            <InputUi
              label="Взрослых"
              placeholder="Взрослых"
              icon={usersIcon}
              type="number"
              name="people_count"
              value={sdata?.people_count}
              is_error={errors?.people_count}
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
              icon={babyIcon}
              name="children_count"
              value={sdata?.children_count}
              is_error={errors?.children_count}
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
              placeholder="Дата вылета  и кол-во дней"
              icon={dateIcon}
              type="date"
              name="departure_date"
              value={sdata?.departure_date}
              is_error={errors?.departure_date}
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
              type="select"
              label="Класс самолета"
              placeholder="Класс самолета"
              icon={typeIcon}
              name="aircraft_class"
              value={sdata?.aircraft_class}
              is_error={errors?.aircraft_class}
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
              options={options?.aircraft_classes?.map((o) => ({
                value: o?.id,
                label: o?.name_translate || o?.id,
              }))}
            />
          </div>
          <div className="fi50">
            <InputUi
              type="select"
              label="Рейтинг отелей"
              placeholder="Рейтинг отелей"
              icon={hotelIcon}
              name="hotel_rating"
              value={sdata?.hotel_rating}
              is_error={errors?.hotel_rating}
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
              options={options?.hotel_ratings?.map((o) => ({
                value: o?.id,
                label: o?.name || o?.id,
              }))}
            />
          </div>
          <div className="fi50">
            <InputUi
              type="select"
              label="Тип питания"
              placeholder="Тип питания"
              icon={footIcon}
              name="type_nutrition"
              value={sdata?.type_nutrition}
              is_error={errors?.type_nutrition}
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
              options={options?.type_nutrition?.map((o) => ({
                value: o?.id,
                label: o?.name_translate || o?.id,
              }))}
            />
          </div>
          <div className="fi100">
            <InputUi
              label="Напишите ваш бюджет"
              placeholder="до 15 000 000 сум "
              name="price"
              type="number"
              value={sdata?.price}
              is_error={errors?.price}
              icon={cashIcon}
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
              name="desc"
              value={sdata?.desc}
              is_error={errors?.desc}
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

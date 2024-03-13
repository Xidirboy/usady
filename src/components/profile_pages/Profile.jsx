import styled from "styled-components";
import Bar from "../../sections/profileSections/Bar";
import ShowTitle from "../../sections/utilsSections/ShowTitle";
import { Link } from "react-router-dom";
import InputUi from "../../sections/formSections/InputUi";
import { useState } from "react";
import { Btn } from "../../styleComponents/GlobalStyle";
const ProfileStyle = styled.div`
  padding: 30px;
  box-shadow: 0px 22.7px 60.5px 0px #c7ceda40;
  border-radius: 5px;
  & .profile_body {
    max-width: 560px;
    & .title {
      font-size: 27px;
      font-weight: 400;
      line-height: 32px;
      letter-spacing: 0em;
      text-align: left;
      padding-bottom: 10px;
    }
    & .text {
      font-size: 19px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      padding-bottom: 30px;
      & a {
        text-decoration: underline !important;
      }
    }
    & .avatar {
      padding-bottom: 20px;
      & .a_img {
        width: 106px;
        height: 106px;
        border-radius: 50%;
        border: 1px solid #e0e0e0;
      }
    }
    & .btns {
      justify-content: right;
      padding-bottom: 20px;
      & button {
        width: 220px;
      }
    }
  }
`;
const Profile = () => {
  const [sdata, setSdata] = useState({});
  const [errors, setErrors] = useState({});
  return (
    <>
      <ShowTitle title="Личный кабинет"></ShowTitle>
      <Bar>
        <ProfileStyle>
          <div className="profile_body">
            <div className="title">Профиль</div>
            <div className="text">
              Здесь настраивается учетная запись WEEEK. Профиль для рабочего
              пространства меняется <Link to="#">в разделе «Пользователи»</Link>
            </div>
            <form>
              <div className="avatar">
                <img
                  className="a_img"
                  alt="avatar"
                  src="/images/profile/user.svg"
                />
              </div>
              <InputUi
                label="Имя"
                placeholder="Введите имя"
                name="first_name"
                value={sdata?.first_name}
                is_error={errors?.first_name}
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
              <InputUi
                label="Фамилия"
                placeholder="Введите фамилию"
                name="last_name"
                value={sdata?.last_name}
                is_error={errors?.last_name}
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
              <InputUi
                label="Обо мне"
                placeholder="Введите описание"
                type={"textarea"}
                name="about"
                value={sdata?.about}
                is_error={errors?.about}
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
              <InputUi
                label="Электронная почта"
                placeholder="sanjar.it@mail.ru"
                name="email"
                value={sdata?.email}
                is_error={errors?.email}
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
              <div className="dc_flex btns">
                <Btn>Сохранить</Btn>
              </div>
            </form>
          </div>
        </ProfileStyle>
      </Bar>
    </>
  );
};
export default Profile;

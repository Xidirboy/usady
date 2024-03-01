import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const LanSelectStyle = styled.div`
  width: 50px;
  padding: 0 5px;
  align-items: center;
  justify-content: center;
  display: flex;
  & .flag {
    height: 20px;
    width: 30px;
    border-radius: 5px;
  }
  & .lan_select {
    align-items: center;
    justify-content: center;
    display: flex;
    &:hover {
      opacity: 0.5;
    }
    & > .arrow {
      padding: 5px 0 0 5px;
    }
  }
  & .lan_item {
    display: flex;
    align-items: center;
    & span {
      padding-left: 10px;
    }
  }
`;

const LanSelect = () => {
  const { t, i18n } = useTranslation();
  const [selectLan, setSelectLan] = useState(i18n.language || "uz");
  const LanIn = (LanFactor = "uz") => {
    setSelectLan(LanFactor);
    i18n.changeLanguage(LanFactor);
  };
  return (
    <LanSelectStyle>
      <Menu>
        <Tooltip hasArrow label={t("tooltips.lan")}>
          <MenuButton className="lan_btn">
            <div className="lan_select">
              <img
                className="flag"
                src={`/images/lans/${selectLan}.svg`}
                alt={selectLan}
              />
              <span className="arrow">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L5 4.5L9 1"
                    stroke="#353434"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </span>
            </div>
          </MenuButton>
        </Tooltip>
        <MenuList>
          <MenuItem
            className="lan_item"
            onClick={() => {
              LanIn("uz");
            }}
            style={
              selectLan === "uz"
                ? { background: "rgb(0, 170, 88)", color: "#fff" }
                : {}
            }
          >
            <img className="flag" src="/images/lans/uz.svg" alt="uz" />
            <span>{t("lan.uz")}</span>
          </MenuItem>
          <MenuItem
            className="lan_item"
            onClick={() => {
              LanIn("en");
            }}
            style={
              selectLan === "en"
                ? { background: "rgb(0, 170, 88)", color: "#fff" }
                : {}
            }
          >
            <img className="flag" src="/images/lans/en.svg" alt="uz" />
            <span>{t("lan.en")}</span>
          </MenuItem>
          <MenuItem
            className="lan_item"
            onClick={() => {
              LanIn("ru");
            }}
            style={
              selectLan === "ru"
                ? { background: "rgb(0, 170, 88)", color: "#fff" }
                : {}
            }
          >
            <img className="flag" src="/images/lans/ru.svg" alt="uz" />
            <span>{t("lan.ru")}</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </LanSelectStyle>
  );
};

export default LanSelect;

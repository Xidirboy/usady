import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
const SosModalStyle = styled.div`
  & .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 30px;
    letter-spacing: 0.05em;
    text-align: center;
    max-width: 390px;
    margin: auto;
    padding-bottom: 40px;
  }
  & .items {
    & .item_title {
      font-size: 20px;
      font-weight: 700;
      line-height: 18px;
      letter-spacing: 0.05em;
      text-align: left;
      padding-bottom: 20px;
      padding-top: 10px;
    }
    & .phone {
      font-size: 36px;
      font-weight: 500;
      line-height: 40px;
      letter-spacing: 0.05em;
      text-align: left;
      color: #263238;
      padding-bottom: 20px;
      @media screen and (max-width: 900px) {
        font-size: 24px;
        font-weight: 500;
        line-height: 30px;
      }
      & a {
        text-decoration: underline !important;
        color: #103186 !important;
        &:hover {
          color: #00aa58 !important;
        }
      }
    }
    & .networks {
      display: flex;
      gap: 20px;
      & a {
        border-radius: 15px;
        &:hover {
          box-shadow: #103186 0px 0px 5px 1px;
        }
        & img {
          width: 90px;
          height: 90px;
        }
      }
    }
  }
`;
const SosModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sosModal } = useSelector((s) => s);
  const setIsOpen = (l = false) => {
    dispatch({ type: "SET_SOS_MODAL", payload: l });
  };
  return (
    <Modal
      isOpen={sosModal}
      onClose={() => setIsOpen(false)}
      size={"xl"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent style={{ maxWidth: "95%", width: 600, borderRadius: 20 }}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SosModalStyle>
            <div className="title">{t("sos.title")}</div>
            <div className="items">
              <div className="item_title">{t("sos.phone")}</div>
              <div className="phone">
                1.{" "}
                <a href={`tel:${t("sos.number1_value")}`}>{t("sos.number1")}</a>
              </div>
              <div className="phone">
                2.{" "}
                <a href={`tel:${t("sos.number2_value")}`}>{t("sos.number2")}</a>
              </div>
            </div>
            <div className="items">
              <div className="item_title">{t("sos.network")}</div>
              <div className="networks">
                <a href={t("sos.telegram_link")} target="black">
                  <img src="/images/sos_telegram.svg" alt="inson telegram" />
                </a>
                <a href={t("sos.whatsapp_link")} target="black">
                  <img src="/images/sos_whatsapp.svg" alt="inson whatsapp" />
                </a>
              </div>
            </div>
          </SosModalStyle>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SosModal;

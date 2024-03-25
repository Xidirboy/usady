import styled from "styled-components";
import UiModal from "../utilsSections/UiModal";
import { Link } from "react-router-dom";
import { Btn } from "../../styleComponents/GlobalStyle";
import { planIcon } from "../../assets/homeS3Icon";
import { get } from "lodash";
const PaymentModalStyle = styled.div`
  & .app {
    font-size: 26px;
    font-weight: 500;
    line-height: 41.6px;
    text-align: left;
  }
  & .route {
    justify-content: left;
    flex-wrap: wrap;
    padding: 10px 0;
    @media (max-width: 900px) {
      padding: 5px 0;
    }
    & span {
      font-size: 24px;
      font-weight: 500;
      line-height: 34px;
      letter-spacing: -0.52px;
      text-align: left;
      background: #0096ff14;
      padding: 4px 8px;
      border-radius: 10px;
      @media (max-width: 900px) {
        font-size: 20px;
      }
    }
    & .icon {
      padding: 0 10px;
      background: transparent;
      @media (max-width: 900px) {
        padding: 0 5px;
      }
    }
  }
  & .title {
    font-size: 26px;
    font-weight: 600;
    line-height: 41.6px;
    text-align: left;
  }
  & .list {
    padding-left: 30px;
    & ul {
      list-style-type: disc !important;
      font-size: 20px;
      font-weight: 500;
      line-height: 38px;
      text-align: left;
    }
  }
  & .pays {
    & .pay {
      border-radius: 20px;
      padding: 10px 20px;
      box-shadow: 1px 4px 8px;
      margin: 20px 0;
      & img {
        opacity: 0.8;
      }
    }
    & .click {
      & img {
        height: 80px;
        opacity: 1;
      }
    }
  }
`;
const PaymentModal = ({ payObj, setPayObj, item }) => {
  return (
    <>
      <UiModal
        title={"Оплата заявки"}
        isOpen={payObj?.pay_modal}
        setIsOpen={() => {
          setPayObj({ ...payObj, pay_modal: false });
        }}
      >
        <PaymentModalStyle>
          <div className="app">Заявка № {item?.id}</div>
          <div className="ds_flex route">
            <span>{get(item, "from_r.name_translate", "")} sd</span>
            <span className="icon">{planIcon}</span>
            <span>{get(item, "to_r.name_translate", "")} serf</span>
          </div>
          <div className="title">Что вы получите ?</div>
          <div className="list">
            <ul>
              <li>Лучшее предложение от 100+ операторов</li>
              <li>Экономия времени</li>
              <li>Экономия денег</li>
              <li>Бесплатный гайд по вашему направлению</li>
            </ul>
          </div>
          <div className="dc_flex pays">
            <Link
              to={payObj?.click}
              target="blank"
              className="dc_flex pay click"
            >
              <img src="/images/global/click.png" alt="Click" />
            </Link>
          </div>
        </PaymentModalStyle>
      </UiModal>
    </>
  );
};

export default PaymentModal;

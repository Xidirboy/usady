import styled from "styled-components";
import UiModal from "../utilsSections/UiModal";
import { Link } from "react-router-dom";
import { Btn } from "../../styleComponents/GlobalStyle";
const PaymentModalStyle = styled.div`
  & .app {
    font-size: 26px;
    font-weight: 500;
    line-height: 41.6px;
    text-align: left;
  }

  & .desc {
    text-align: center;
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
const PaymentModal = ({ payObj, setPayObj }) => {
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
          <div className="app">Заявка № 1233</div>
          <div className="desc">
            Внесите оплату для подачи заявки на поездку
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

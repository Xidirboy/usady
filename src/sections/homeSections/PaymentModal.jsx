import UiModal from "../utilsSections/UiModal";
const PaymentModal = ({ pay_modal, payModalOpen, payObj = {} }) => {
  return (
    <>
      <UiModal
        title={"Оплата"}
        isOpen={pay_modal}
        setIsOpen={() => {
          payModalOpen(false);
        }}
      >
        <div>Внесите оплату для подачи заявки на поездку</div>
      </UiModal>
    </>
  );
};

export default PaymentModal;

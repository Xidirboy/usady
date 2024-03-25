import styled from "styled-components";
import Header from "./Header";
import Axios from "../../utils/httpClient";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import PaymentModal from "../homeSections/PaymentModal";

const LayoutStyle = styled.div`
  @media (max-width: 900px) {
    padding-bottom: 120px;
  }
`;
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s);
  useEffect(() => {
    if (!user?.id) getUser();
  }, []);
  const getUser = () => {
    Axios()
      .get(`api/v1/auth/me`)
      .then((r) => {
        dispatch({ type: "SET_USER", payload: r?.data?.user ?? {} });
      })
      .catch((e) => {})
      .finally(() => {});
  };
  return (
    <LayoutStyle>
      <Header />
      {children}
    </LayoutStyle>
  );
};

export default Layout;

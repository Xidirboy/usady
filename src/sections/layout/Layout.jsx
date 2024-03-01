import React, { Suspense, lazy } from "react";
import { LayoutContainer } from "../../styleComponents/sections/LayoutStyle";
// import Header from "./Header";
// import Footer from "./Footer";
// import { useState } from "react";
// import AuthModal from "../auth/AuthModal";
import { useDispatch, useSelector } from "react-redux";

const Header = lazy(() => import("./Header"));
const Footer = lazy(() => import("./Footer"));
const AuthModal = lazy(() => import("../auth/AuthModal"));

const Layout = ({ children, headerShow = true }) => {
  // const [authModal, setAuthModal] = useState(false);
  const { authModal } = useSelector((s) => s);
  const dispatch = useDispatch();
  const setAuthModal = (v) => {
    dispatch({ type: "SET_AUTH_MODAL", payload: v });
  };
  return (
    <>
      <Suspense>
        {headerShow && <Header setAuthModal={setAuthModal} />}
      </Suspense>
      <LayoutContainer>
        <div className="main">{children}</div>
      </LayoutContainer>
      <Suspense>
        <div className="animated__section">
          <Footer />
        </div>
      </Suspense>
      <Suspense>
        <AuthModal isOpen={authModal} setIsOpen={setAuthModal} />
      </Suspense>
    </>
  );
};

export default Layout;

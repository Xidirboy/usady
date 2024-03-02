import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import "./i18n";
import AuthModal from "../sections/layoutSections/authSections/AuthModal";
const LoadingMain = lazy(() => import("../sections/utilsSections/LoadingMain"));

const WebProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const { loading } = useSelector((s) => s);
  return (
    <>
      <ChakraProvider>
        {children}
        <Suspense>{loading && <LoadingMain />}</Suspense>
        <AuthModal />
      </ChakraProvider>
    </>
  );
};
export default WebProvider;

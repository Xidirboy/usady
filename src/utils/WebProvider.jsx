import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./i18n";
const LoadingMain = lazy(() => import("../sections/utilsSections/LoadingMain"));

const WebProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const { loading } = useSelector((s) => s);
  return (
    <>
      <div>
        {children}
        <Suspense>{loading && <LoadingMain />}</Suspense>
      </div>
    </>
  );
};
export default WebProvider;

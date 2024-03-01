import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "./httpClient";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
// import LoadingMain from "../sections/utilsSections/LoadingMain";
// import AudioDiktor from "../sections/utilsSections/header/AudioDiktor";
import { ChakraProvider } from "@chakra-ui/react";
import "./i18n";
const LoadingMain = lazy(() => import("../sections/utilsSections/LoadingMain"));
const AudioDiktor = lazy(() =>
  import("../sections/utilsSections/header/AudioDiktor")
);

const WebProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const { loading, footer } = useSelector((s) => s);
  useEffect(() => {
    getMenu();
    if (!footer?.links?.length) getFooter();
  }, [i18n.language]);
  const getMenu = () => {
    dispatch({ type: "SET_MENU_LOADING", payload: true });
    Axios()
      .get(`api/v1/menu/list`)
      .then((r) => {
        dispatch({ type: "SET_MENU", payload: get(r, "data.data", []) });
      })
      .catch((e) => {})
      .finally(() => {
        dispatch({ type: "SET_MENU_LOADING", payload: false });
      });
  };
  const getFooter = () => {
    // dispatch({ type: "SET_MENU_LOADING", payload: true });
    Axios()
      .get(`api/v1/footer`)
      .then((r) => {
        dispatch({ type: "SET_FOOTER", payload: get(r, "data.data", {}) });
      })
      .catch((e) => {})
      .finally(() => {
        // dispatch({ type: "SET_MENU_LOADING", payload: false });
      });
  };
  return (
    <>
      <ChakraProvider>
        {children}
        <Suspense>
          {loading && <LoadingMain />}
          <AudioDiktor />
        </Suspense>
      </ChakraProvider>
    </>
  );
};
export default WebProvider;

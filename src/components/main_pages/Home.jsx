import React from "react";
import { useTranslation } from "react-i18next";

const Home = () => {
  const {t} = useTranslation()
  return (
    <div className="container text-dodgerBlue">
      {t("home.title")}
      <p className="font-thin">Whereas recognition of the inherent dignity</p>
    </div>
  );
};

export default Home;

import React from "react";

const Home = () => {
  const {t} = useTranlation()
  return (
    <div className="container text-dodgerBlue">
      {t("home.title")}
      <p className="font-thin">Whereas recognition of the inherent dignity</p>
    </div>
  );
};

export default Home;

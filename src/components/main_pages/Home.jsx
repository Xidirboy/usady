import React from "react";
import { useTranslation } from "react-i18next";
import Main from "./Main";
import WhyChoose from "./WhyChoose";
import OurCourses from "./OurCourses";
import Helper from "./Helper";
import Speakers from "./Speakers";
import Uzinfocom from "./Uzinfocom";
import Demand from "./Demand";
import Contact from "./Contact";
import OurValues from "./OurValues";
import Ourmission from "./Ourmission";
import Faq from "./Faq";
import Address from "./Address";
import Footer from "./Footer";

const Home = () => {
  const {t} = useTranslation()
  return (
    <div >
      <Main/> 
      <WhyChoose/>
      <OurCourses/>
      <Helper/>
      <Speakers/>
      <Uzinfocom/>
      <Demand/>
      <Contact/>
      <OurValues/>
      <Ourmission/>
      <Faq/>
      <Address/>
      <Footer/>

    </div>
  );
};

export default Home;

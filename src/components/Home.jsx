import HomeSlider from "../sections/commonSections/HomeSlider";
import MobileApp from "../sections/commonSections/MobileApp";
import Partners from "../sections/commonSections/Partners";
import UsefulServices from "../sections/commonSections/UsefulServices";
import Layout from "../sections/layout/Layout";

const Home = () => {
  return (
    <>
      <Layout>
        <HomeSlider />
        <UsefulServices />
        <MobileApp />
        <Partners />
      </Layout>
    </>
  );
};
export default Home;

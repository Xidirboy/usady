import styled from "styled-components";
import ShowTitle from "../sections/utilsSections/ShowTitle";
import Section2 from "../sections/homeSections/Section2";
import Section4 from "../sections/homeSections/Section4";
import Section3 from "../sections/homeSections/Section3";
const HomeStyle = styled.div`
  border-radius: 50px 50px 0 0;
  margin: auto;
  max-width: 1920px;
  background: linear-gradient(
    0deg,
    #0450c2 0%,
    #0a46a7 27.11%,
    #182e63 93.82%,
    #1e2344 109.5%
  );
  @media (max-width: 900px) {
    border-radius: 20px 20px 0 0;
  }
  & .section_1 {
    min-height: 600px;
    align-items: stretch;
    padding-right: 0 !important;
    @media (max-width: 900px) {
      flex-direction: column;
      align-items: center;
      min-height: auto;
      padding-left: 0 !important;
    }
    & .s1 {
      max-width: 700px;
      & .title {
        font-size: 63px;
        font-weight: 600;
        line-height: 87px;
        letter-spacing: 0em;
        text-align: left;
        color: #fff;
        @media (max-width: 900px) {
          padding: 30px 20px;
          font-size: 32px;
          font-weight: 400;
          line-height: 38px;
          text-align: center;
        }
      }
    }
    & .s2 {
      width: 100%;
      background-image: url("/images/home/s1.png");
      background-size: cover;
      background-position: left;
      background-repeat: no-repeat;
      border-radius: 0px 50px 0 0;
      @media (max-width: 900px) {
        height: 430px;
        background-size: contain;
        background-position: center;
        border-radius: 0;
      }
      @media (max-width: 700px) {
        height: 300px;
      }
      @media (max-width: 500px) {
        background-size: cover;
      }
    }
  }
  & .section_2 {
  }
  & .section_3 {
  }
  & .section_4 {
  }
`;
const Home = () => {
  return (
    <HomeStyle>
      <section className="">
        <div className="ds_flex container_main section_1 ">
          <div className="ds_flex s1">
            <div className="title">
              <span>100+</span> Турагентов
              <br /> готовы подобрать лучший тур
            </div>
          </div>
          <div className="s2"></div>
        </div>
        <div className="container_main section_2">
          <Section2 />
        </div>
        <div className="section_3">
          <Section3 />
        </div>
        <div className="container_main section_4">
          <Section4 />
        </div>
      </section>
    </HomeStyle>
  );
};
export default Home;

import styled from "styled-components";

const LicenseContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 50px 30px 50px 30px;
    border-radius: 20px;
    background: #fff;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      padding: 30px 16px 30px 16px;
    }
    @media (max-width: 900px) {
      flex-direction: column;
    }
    & > .section1 {
      width: 55%;
      padding-right: 10px;
      @media (max-width: 900px) {
        width: 100%;
      }
      & > .lines {
        display: flex;
        align-items: center;
        justify-content: left;
        width: 75%;
        margin-bottom: 5px;
        & > .line1 {
          width: 35%;
          height: 3px;
          background-color: #00aa58;
          border-radius: 3px 0 0 3px;
        }
        & > .line2 {
          width: 65%;
          height: 1px;
          background-color: rgb(217, 219, 219);
        }
      }
      & > .items {
        padding-top: 30px;
        height: 480px;
        overflow-y: auto;
        & > .item {
          padding-bottom: 30px;
          & > .year {
            font-size: 32px !important;
            font-weight: 900;
            color: #00237e;
          }
          & > .text {
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
    }
    & > .section2 {
      width: 45%;
      @media (max-width: 900px) {
        width: 100%;
      }
      & .LicenseSwiper {
        height: 500px;
        @media (max-width: 900px) {
          height: 400px;
        }
        & .image_item {
          height: 100%;
          background-color: #f7f7f7;
          border-radius: 20px;
          padding: 10px 10px 20px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          & img {
            max-height: 100%;
            max-width: 100%;
          }
        }
        & .swiper-button-prev,
        .swiper-button-next {
          color: #00aa58;
          opacity: 0.7;
          &:hover {
            opacity: 1;
          }
        }
        & .swiper-button-disabled {
          opacity: 0;
        }
        & .swiper-pagination-bullet-active {
          background-color: #00aa58;
        }
      }
    }
  }
`;
export default LicenseContainer;

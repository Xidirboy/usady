import styled from "styled-components";

export const NewViewContainer = styled.div`
  margin: 25px 0;
  & > .target {
    padding: 0 30px 0 30px;
    @media (max-width: 576px) {
      padding: 0 16px 0 16px;
    }
    & > .title {
      padding: 0 0 20px 0;
    }
    & .img_target {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 20px;
      & > img {
        max-height: 60vh;
        max-width: 100%;
      }
    }
  }
`;

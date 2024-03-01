import styled from "styled-components";

export const OfficeMapContainer = styled.div`
  margin: 25px 0;
  & > .card {
    padding: 30px 30px;
    border-radius: 20px;
    background: #fff;
    @media (max-width: 576px) {
      padding: 30px 16px;
    }
  }
`;

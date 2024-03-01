import React from "react";
import styled from "styled-components";

const TitleStyle = styled.h2`
  margin: 0;
  padding: 0;
  background: transparent;
  & > .word1 {
    color: #181818;
    font-size: 60px;
    font-style: normal;
    font-weight: 900;
    line-height: 65px; /* 108.333% */
    letter-spacing: 3px;
    margin-right: 10px;
    display: inline;
    @media (max-width: 768px) {
      font-size: 32px;
      line-height: 32px; /* 56.875% */
      letter-spacing: 1.28px;
    }
  }
  & > .word2 {
    /* color: #00aa58; */
    color: #00237e;
    font-size: 60px;
    font-style: normal;
    font-weight: 900;
    line-height: 65px;
    letter-spacing: 3px;
    display: inline;
    @media (max-width: 768px) {
      font-size: 32px;
      line-height: 32px; /* 56.875% */
      letter-spacing: 1.28px;
    }
  }
`;

const TitelGreen = ({ word = "", className = "" }) => {
  return (
    <TitleStyle className={className}>
      <span className="word2" dangerouslySetInnerHTML={{ __html: word }} />
    </TitleStyle>
  );
};

export default TitelGreen;

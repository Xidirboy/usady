import styled from "styled-components";
import Header from "./Header";

const LayoutStyle = styled.div``;
const Layout = ({ children }) => {
  return (
    <LayoutStyle>
      <Header />
      {children}
    </LayoutStyle>
  );
};

export default Layout;

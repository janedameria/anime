import Navbar from "./Navbar";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
`;

export default function Layout({ children }) {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
}

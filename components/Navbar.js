import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Container = styled.div`
  padding: 0.5rem 1.1rem;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  width: 100vw;
  background-color: #fafafa;
  z-index: 1;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const Navbar = () => {
  const router = useRouter();
  const onClickNavbar = () => {
    router.push("/");
  };
  return (
    <Container onClick={onClickNavbar}>
      <h1>anime.</h1>
    </Container>
  );
};

export default Navbar;

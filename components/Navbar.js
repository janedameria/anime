import styled from "@emotion/styled";

const Container = styled.div`
  padding: 7px 20px;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
`;

const Navbar = () => {
  return (
    <Container>
      <h1>anime.</h1>
    </Container>
  );
};

export default Navbar;

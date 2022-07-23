import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";

const Container = styled.div`
  padding: 0.5rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  background-color: #fafafa;
  z-index: 1;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;

const MyLink = styled.a`
  &:hover {
    opacity: 0.8;
  }
`;

const Navbar = () => {
  const router = useRouter();
  const onClickNavbar = () => {
    router.push("/");
  };
  return (
    <Container>
      <h1 onClick={onClickNavbar}>anime.</h1>
      <Link href={"/collections"}>
        <MyLink>Collections</MyLink>
      </Link>
    </Container>
  );
};

export default Navbar;

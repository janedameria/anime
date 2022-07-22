import styled from "@emotion/styled";
import Image from "next/dist/client/image";
import { useRouter } from "next/router";

const Container = styled.div`
  /* background-color: ${(props) => props.inputColor || "#fafafa"}; */
  background-color: #fafafa;

  border-radius: 2%;
  display: flex;
  width: 100%;
  /* max-width: 188px; */
  height: 200px;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  &:hover {
    cursor: pointer;
    transform: translateY(-7px);
  }
`;

const MainTitle = styled.p`
  font-weight: bold;
  text-align: center;
  font-size: 0.9em;
  padding: 0 3px;
`;

const Title = styled.p`
  font-size: 0.7em;
  text-align: center;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
`;

const AnimeThumbnail = ({ anime }) => {
  const router = useRouter();
  const redirectToDetailPage = () => {
    router.push(`/anime/${anime.id}`);
  };

  return (
    <Container
      inputColor={anime.coverImage.color}
      onClick={redirectToDetailPage}
    >
      <MainTitle>{anime.title.romaji}</MainTitle>
      <Title>{`(${anime.title.native})`}</Title>
      <ImageContainer>
        <Image
          src={anime.coverImage.extraLarge}
          placeholder="blur"
          blurDataURL={anime.coverImage.medium}
          width={102}
          height={129}
        />
      </ImageContainer>
    </Container>
  );
};

export default AnimeThumbnail;

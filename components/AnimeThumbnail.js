import styled from "@emotion/styled";
import Image from "next/dist/client/image";

const Container = styled.div`
  background-color: ${(props) => props.inputColor || "#fafafa"};
  border-radius: 5%;
  border: 2px solid #3d3e43;
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.p`
  font-weight: bold;
`;

const Title = styled.p`
  font-size: 0.9em;
`;
const ImageContainer = styled.div`
  align-self: end;
  justify-items: flex-end;
`;

const AnimeThumbnail = ({ anime }) => {
  return (
    <Container inputColor={anime.coverImage.color}>
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

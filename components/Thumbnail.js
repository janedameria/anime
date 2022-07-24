import styled from "@emotion/styled";
import Image from "next/dist/client/image";
import { useRouter } from "next/router";

const Container = styled.div`
  background-color: #fafafa;
  border-radius: 2%;
  display: flex;
  width: 11.7rem;
  margin: 1rem 1.5rem;
  height: 15rem;
  flex-direction: column;
  justify-content: space-evenly;
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
  padding: 0 0.2rem;
`;

const Title = styled.p`
  font-size: 0.7em;
  text-align: center;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  padding-bottom: 0.3rem;
`;

const Thumbnail = ({ data, type }) => {
  const router = useRouter();
  const redirectToDetailPage = () => {
    router.push(`/${type}/${data.id}`);
  };

  const renderAnimeTitle = () => {
    if (data.title.romaji.length > 50) {
      return <MainTitle>{data.title.romaji}</MainTitle>;
    }
    return (
      <>
        <MainTitle>{data.title.romaji}</MainTitle>
        <Title>{`(${data.title.native})`}</Title>
      </>
    );
  };
  if (type == "anime")
    return (
      <Container onClick={redirectToDetailPage}>
        {renderAnimeTitle()}
        <ImageContainer>
          <Image
            src={data.coverImage.extraLarge}
            placeholder="blur"
            blurDataURL={data.coverImage.medium}
            width={102}
            height={129}
            alt={`image ${data.title.romaji}`}
          />
        </ImageContainer>
      </Container>
    );

  if (type == "collections") {
    return (
      <Container onClick={redirectToDetailPage}>
        <MainTitle>{data.title}</MainTitle>
        <ImageContainer>
          <Image
            src={
              data.animeList.length > 0
                ? data.animeList[0].coverImage.medium
                : data.cover
            }
            placeholder="blur"
            blurDataURL={data.cover}
            width={102}
            height={129}
          />
        </ImageContainer>
      </Container>
    );
  }

  return <></>;
};

export default Thumbnail;

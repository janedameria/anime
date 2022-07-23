import client from "../../apollo-client";
import { getAnimeListWithPagination, getAnimeById } from "../../services/Anime";
import Head from "next/head";
import styled from "@emotion/styled";
import Image from "next/dist/client/image";
import Checkboxes from "../../components/Checkboxes";

export async function getStaticProps({ params }) {
  const {
    data: { Media },
  } = await client.query(getAnimeById(params.id));
  return {
    props: {
      anime: Media,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const {
    data: { Page },
  } = await client.query(getAnimeListWithPagination(1));
  const paths = Page.media.map((value) => ({
    params: { id: value.id.toString() },
  }));
  return { paths, fallback: "blocking" };
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  align-items: center;
  justify-content: space-around;
  padding: 0 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ImageContainer = styled.div``;

const SubContainer = styled.div`
  max-width: 40rem;
  margin-left: 2rem;
  margin-right: 2rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  background-color: #fafafa;
  padding: 1rem 2rem;

  border-radius: 1%;
`;

const RomajiTitle = styled.h3`
  text-align: center;
`;

const NativeTitle = styled.h4`
  text-align: center;
  margin-bottom: 1rem;
`;

const GenreItem = styled.span`
  background-color: #3d3e43;
  color: #fbfbfb;
  padding: 0.2rem 0.3rem;
  font-size: 0.8rem;
  border-radius: 0.2rem;
  margin: 0 0.2rem;
`;

const Description = styled.p`
  text-align: justify;
`;

const Paragraph = styled.p`
  font-weight: bold;
  line-height: 2rem;
  > * {
    font-weight: normal;
  }
`;

export default function Anime({ anime }) {
  const renderGenres = () => {
    return anime.genres.map((value) => <GenreItem>{value}</GenreItem>);
  };
  return (
    <>
      <Head>
        <title>{`anime. | ${anime.title.romaji}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <ImageContainer>
          <Image
            src={anime.coverImage.extraLarge}
            blurDataURL={anime.coverImage.medium}
            width={200}
            height={280}
          />
        </ImageContainer>

        <SubContainer>
          <RomajiTitle>{anime.title.romaji}</RomajiTitle>
          <NativeTitle>{anime.title.native}</NativeTitle>
          <Description
            dangerouslySetInnerHTML={{ __html: anime.description }}
          ></Description>
          <br />
          <Paragraph>
            Episodes: <span>{anime.episodes}</span>
          </Paragraph>
          <Paragraph>
            {`Genres: `}
            {renderGenres()}
          </Paragraph>

          <Paragraph>Collections: </Paragraph>
          <Checkboxes />
        </SubContainer>
      </Container>
    </>
  );
}

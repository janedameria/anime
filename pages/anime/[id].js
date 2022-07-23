import client from "../../apollo-client";
import { getAnimeListWithPagination, getAnimeById } from "../../services/Anime";
import Head from "next/head";
import Image from "next/dist/client/image";
import Checkboxes from "../../components/Checkboxes";
import {
  Container,
  Description,
  GenreItem,
  NativeTitle,
  ImageContainer,
  RomajiTitle,
  SubContainer,
  Paragraph,
} from "../../styles/AnimeStyles";

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const {
    data: { Media },
  } = await client.query(getAnimeById(params.id));
  return {
    props: {
      anime: Media,
    },
  };
}

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

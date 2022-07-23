import Head from "next/head";
import { parseCookies } from "../../helper/ParseCookies";
import Thumbnail from "../../components/Thumbnail";
import CircleButton from "../../components/CircleButton";
import {
  AnimeListContainer,
  Paragraph,
  ThumbnailContainer,
  Container,
} from "../../styles/CollectionStyle";

export async function getServerSideProps(ctx) {
  const { req, params } = ctx;
  const cookie = parseCookies(req);
  const collections =
    cookie.collections != null ? JSON.parse(cookie.collections) : [];
  const collection = collections.find((value) => value.id == params.id);
  return {
    props: {
      collection,
    },
  };
}
export default function Collection({ collection }) {
  const renderEmptyAnimeList = () => {
    return <Paragraph>No Anime Data</Paragraph>;
  };

  const renderAnimeList = () => {
    return (
      <ThumbnailContainer>
        {/* <Thumbnail data={dummy} type={"anime"} />
            <CircleButton text={"X"} /> */}
      </ThumbnailContainer>
    );
  };
  return (
    <>
      <Head>
        <title>{`anime. | ${collection.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h3>{collection.title}</h3>
        <AnimeListContainer>
          {collection.animeList.size > 0
            ? renderAnimeList()
            : renderEmptyAnimeList()}
        </AnimeListContainer>
      </Container>
    </>
  );
}

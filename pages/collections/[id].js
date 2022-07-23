import Head from "next/head";
import styled from "@emotion/styled/";
import { find, size } from "lodash";
import { parseCookies } from "../../helper/ParseCookies";
import Thumbnail from "../../components/Thumbnail";
import CircleButton from "../../components/CircleButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;
const AnimeListContainer = styled.div`
  display: flex;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  margin-top: 3rem;
  color: #a9a9a9;
`;

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

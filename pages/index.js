import Head from "next/head";
import { getAnimeListWithPagination } from "../services/Anime";
import client from "../apollo-client";
import Thumbnail from "../components/Thumbnail";
import Pagination from "../components/Pagination";
import { Container, AnimeListContainer } from "../styles/HomeStyles";

export async function getServerSideProps(ctx) {
  const page = ctx.query.page ? parseInt(ctx.query.page) : 1;
  const { data } = await client.query(getAnimeListWithPagination(page));

  return {
    props: {
      pageInfo: data.Page.pageInfo,
      media: data.Page.media,
    },
  };
}

export default function Home({ pageInfo, media }) {
  const thumbnailType = "anime";
  return (
    <Container>
      <Head>
        <title>anime.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimeListContainer>
        {media.map((anime) => (
          <Thumbnail key={anime.id} data={anime} type={thumbnailType} />
        ))}
      </AnimeListContainer>
      <Pagination pageInfo={pageInfo} />
    </Container>
  );
}

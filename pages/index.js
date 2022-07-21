import Head from "next/head";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import AnimeThumbnail from "../components/AnimeThumbnail";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import styled from "@emotion/styled";
import Loader from "../components/Loader";

export async function getServerSideProps(ctx) {
  const page = ctx.query.page ? parseInt(ctx.query.page) : 1;
  const { data } = await client.query({
    query: gql`
      query {
        Page(page: ${page}, perPage: 10) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      pageInfo: data.Page.pageInfo,
      media: data.Page.media,
    },
  };
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  padding: 10px 20px;
  flex-wrap: wrap;
`;

export default function Home({ pageInfo, media }) {
  if (media)
    return (
      <div>
        <Head>
          <title>anime.</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <Navbar />
          <Container>
            {media.map((anime) => (
              <AnimeThumbnail key={anime.id} anime={anime} />
            ))}
          </Container>
        </div>
        <Pagination pageInfo={pageInfo} />
      </div>
    );

  return <Loader />;
}

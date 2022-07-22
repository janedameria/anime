import { gql } from "@apollo/client";

export const getAnimeListWithPagination = (page) => {
  return {
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
  };
};

export const getAnimeById = (id) => {
  return {
    query: gql`
      query {
        Media(id: ${id}, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            medium
          }
          description
          episodes
          genres
        }
      }
    `,
  };
};

import client from "../../apollo-client";
import { getAnimeById } from "../../services/Anime";
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
import { useAppContext } from "../../context/state";

export async function getServerSideProps({ params }) {
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
  const { collectionList, updateCollectionList, removeAnimeFromCollection } =
    useAppContext();
  const renderGenres = () => {
    return anime.genres.map((value) => (
      <GenreItem key={value}>{value}</GenreItem>
    ));
  };

  const addAnimeToCollection = (collectionId) => {
    const temp = collectionList.map((value) => {
      if (value.id === collectionId) {
        value.animeList.push({
          id: anime.id,
          title: anime.title,
          coverImage: anime.coverImage,
        });
      }
      return value;
    });
    updateCollectionList(temp);
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
            alt={`image ${anime.title.romaji}`}
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

          {collectionList.length > 0 && (
            <>
              <Paragraph>Add Anime to Collection(s): </Paragraph>
              <Checkboxes
                data={collectionList}
                animeId={anime.id}
                addAnimeToCollection={addAnimeToCollection}
                removeAnimeFromCollection={removeAnimeFromCollection}
              />
            </>
          )}
        </SubContainer>
      </Container>
    </>
  );
}

import { useState } from "react";
import client from "../../apollo-client";
import { getAnimeById } from "../../services/Anime";
import Head from "next/head";
import Image from "next/dist/client/image";
import Checkboxes from "../../components/Checkboxes";
import CircleButton from "../../components/CircleButton";
import { validateCollectionName } from "../../helper/Collections";
import CollectionModal from "../../components/CollectionModal";
import {
  Container,
  Description,
  GenreItem,
  NativeTitle,
  ImageContainer,
  RomajiTitle,
  SubContainer,
  Paragraph,
  CollectionContainer,
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
  const {
    collectionList,
    updateCollectionList,
    removeAnimeFromCollection,
    addNewCollection,
  } = useAppContext();
  const [addCollectionModal, setAddCollectionModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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
  const createNewCollection = (name) => {
    setShowErrorMessage(false);
    if (!validateCollectionName(name, collectionList)) {
      return setShowErrorMessage(true);
    }
    addNewCollection(name);
    setAddCollectionModal(false);
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

          <CollectionContainer>
            <Paragraph>Collection(s): </Paragraph>
            {collectionList.length > 0 ? (
              <Checkboxes
                data={collectionList}
                animeId={anime.id}
                addAnimeToCollection={addAnimeToCollection}
                removeAnimeFromCollection={removeAnimeFromCollection}
              />
            ) : (
              <CircleButton
                text={"+ New Collection"}
                onClick={() => setAddCollectionModal(true)}
              />
            )}
          </CollectionContainer>
        </SubContainer>
        {addCollectionModal && (
          <CollectionModal
            title={"Add New Collection"}
            closeModal={() => setAddCollectionModal(false)}
            onSave={createNewCollection}
            yesButtonText={"Add"}
            showErrorMessage={showErrorMessage}
          />
        )}
      </Container>
    </>
  );
}

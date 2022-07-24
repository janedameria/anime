import { useState, useEffect } from "react";
import Head from "next/head";
import { FiEdit2 } from "react-icons/fi";
import { isEmpty } from "lodash";
import Thumbnail from "../../components/Thumbnail";
import CircleButton from "../../components/CircleButton";
import CollectionModal from "../../components/CollectionModal";
import { validateCollectionName } from "../../helper/Collections";
import { useAppContext } from "../../context/state";
import Loader from "../../components/Loader";
import ConfirmationModal from "../../components/ConfirmationModal";

import {
  AnimeListContainer,
  Paragraph,
  ThumbnailContainer,
  SubContainer,
  Container,
  IconButton,
} from "../../styles/CollectionStyle";

export async function getServerSideProps(ctx) {
  return {
    props: {
      id: ctx.params.id,
    },
  };
}

export default function Collection({ id }) {
  const { collectionList, updateCollectionList, removeAnimeFromCollection } =
    useAppContext();
  const [collection, setCollection] = useState();
  const [isEditCollectionModalShow, setIsEditCollectionModalShow] =
    useState(false);
  const [isConfirmationRemoveModalShow, setIsConfirmationRemoveModalShow] =
    useState(false);
  const [toBeDeletedAnime, setToBeDeletedAnime] = useState({});
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (collectionList) {
      const col = collectionList.find((value) => value.id == id);
      setCollection(col);
    }
  }, [collectionList]);

  const renderEmptyAnimeList = () => {
    return <Paragraph>No Anime Data</Paragraph>;
  };

  const openModal = () => {
    setIsEditCollectionModalShow(true);
  };

  const updateName = (newName) => {
    setShowErrorMessage(false);
    if (!validateCollectionName(newName, collectionList)) {
      return setShowErrorMessage(true);
    }
    const modifiedList = collectionList.map((value) => {
      if (value.id === collection.id) {
        value.title = newName;
      }
      return value;
    });
    updateCollectionList(modifiedList);
    setIsEditCollectionModalShow(false);
  };

  const showConfirmationDeletionModal = (anime) => {
    setToBeDeletedAnime(anime);
    setIsConfirmationRemoveModalShow(true);
  };

  const deleteAnimeFromCollection = () => {
    removeAnimeFromCollection(collection.id, toBeDeletedAnime.id);
    setToBeDeletedAnime({});
    setIsConfirmationRemoveModalShow(false);
  };

  const renderAnimeList = () => {
    return collection.animeList.map((value) => (
      <ThumbnailContainer key={value.id}>
        <Thumbnail key={value.id} data={value} type={"anime"} />
        <CircleButton
          text={"X"}
          key={value.id}
          onClick={() =>
            showConfirmationDeletionModal(value, value.title.romaji)
          }
        />
      </ThumbnailContainer>
    ));
  };
  if (isEmpty(collection)) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>{`anime. | ${collection.title}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SubContainer>
          <h3>{collection.title}</h3>
          <IconButton onClick={openModal}>
            <FiEdit2 />
          </IconButton>
        </SubContainer>
        <AnimeListContainer>
          {collection.animeList.length > 0
            ? renderAnimeList()
            : renderEmptyAnimeList()}
        </AnimeListContainer>
      </Container>
      {isEditCollectionModalShow && (
        <CollectionModal
          title={"Edit Collection Name"}
          closeModal={() => setIsEditCollectionModalShow(false)}
          onSave={updateName}
          initialName={collection.title}
          showErrorMessage={showErrorMessage}
          yesButtonText={"Edit"}
        />
      )}
      {isConfirmationRemoveModalShow && (
        <ConfirmationModal
          title={`Delete ${toBeDeletedAnime.title.romaji} from Collection?`}
          closeModal={() => setIsConfirmationRemoveModalShow(false)}
          onYes={deleteAnimeFromCollection}
        />
      )}
    </>
  );
}

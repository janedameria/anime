import { useState } from "react";
import Head from "next/head";
import Thumbnail from "../../components/Thumbnail";
import CollectionModal from "../../components/CollectionModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import CircleButton from "../../components/CircleButton";
import {
  Container,
  FlexContainer,
  ThumbnailContainer,
} from "../../styles/CollectionsStyles";
import { validateCollectionName } from "../../helper/Collections";
import { useAppContext } from "../../context/state";

export default function Collections({}) {
  const { collectionList, addNewCollection, updateCollectionList } =
    useAppContext();
  const thumbnailType = "collections";
  const [isAddCollectionModalShow, setIsAddCollectionModalShow] =
    useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  useState(false);
  const [isConfirmationRemoveModalShow, setIsConfirmationRemoveModalShow] =
    useState(false);
  const [toBeDeletedCollection, setToBeDeletedCollection] = useState({});
  const closeModal = () => {
    setIsAddCollectionModalShow(false);
  };

  const createNewCollection = (name) => {
    setShowErrorMessage(false);
    if (!validateCollectionName(name, collectionList)) {
      return setShowErrorMessage(true);
    }
    addNewCollection(name);
    setIsAddCollectionModalShow(false);
  };

  const showConfirmationDeletionModal = (collection) => {
    setToBeDeletedCollection(collection);
    setIsConfirmationRemoveModalShow(true);
  };

  const deleteCollection = () => {
    const modifiedCollectionList = collectionList.filter(
      (value) => value.id != toBeDeletedCollection.id
    );
    updateCollectionList(modifiedCollectionList);
    setToBeDeletedCollection({});
    setIsConfirmationRemoveModalShow(false);
  };
  return (
    <Container>
      <Head>
        <title>anime. | collections</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FlexContainer>
        <h2>Collections</h2>
        <CircleButton
          text={"+ New Collections"}
          onClick={() => setIsAddCollectionModalShow(true)}
        />
      </FlexContainer>
      <FlexContainer center>
        {collectionList.length > 0 &&
          collectionList.map((value) => (
            <ThumbnailContainer>
              <Thumbnail data={value} type={thumbnailType} key={value.id} />
              <CircleButton
                text={"X"}
                key={value.id}
                onClick={() => showConfirmationDeletionModal(value)}
              />
            </ThumbnailContainer>
          ))}
      </FlexContainer>
      {isAddCollectionModalShow && (
        <CollectionModal
          title={"Add New Collection"}
          closeModal={closeModal}
          onSave={createNewCollection}
          yesButtonText={"Add"}
          showErrorMessage={showErrorMessage}
        />
      )}

      {isConfirmationRemoveModalShow && (
        <ConfirmationModal
          title={`Delete ${toBeDeletedCollection.title} collection?`}
          closeModal={() => setIsConfirmationRemoveModalShow(false)}
          onYes={deleteCollection}
        />
      )}
    </Container>
  );
}

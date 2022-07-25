import { useState } from "react";
import Head from "next/head";
import Thumbnail from "../../components/Thumbnail";
import { FiEdit2 } from "react-icons/fi";
import CollectionModal from "../../components/CollectionModal";
import ConfirmationModal from "../../components/ConfirmationModal";
import CircleButton from "../../components/CircleButton";
import {
  Container,
  FlexContainer,
  ThumbnailContainer,
  ButtonContainer,
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
  const [toBeEditedCollection, setToBeEditedCollection] = useState({});
  const [isEditCollectionModalShow, setIsEditCollectionModalShow] =
    useState(false);

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

  const showEditCollectionModal = (collection) => {
    setToBeEditedCollection(collection);
    setIsEditCollectionModalShow(true);
  };

  const deleteCollection = () => {
    const modifiedCollectionList = collectionList.filter(
      (value) => value.id != toBeDeletedCollection.id
    );
    updateCollectionList(modifiedCollectionList);
    setToBeDeletedCollection({});
    setIsConfirmationRemoveModalShow(false);
  };

  const updateName = (newName) => {
    setShowErrorMessage(false);
    if (!validateCollectionName(newName, collectionList)) {
      return setShowErrorMessage(true);
    }
    const modifiedList = collectionList.map((value) => {
      if (value.id == toBeEditedCollection.id) {
        value.title = newName;
      }
      return value;
    });
    updateCollectionList(modifiedList);
    setToBeEditedCollection({});
    setIsEditCollectionModalShow(false);
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
            <ThumbnailContainer key={value.id}>
              <Thumbnail data={value} type={thumbnailType} key={value.id} />
              <ButtonContainer>
                <CircleButton
                  color={"RED"}
                  text={"X"}
                  key={`Delete ${value.id}`}
                  onClick={() => showConfirmationDeletionModal(value)}
                />
                <CircleButton
                  text={<FiEdit2 />}
                  key={`Edit ${value.id}`}
                  onClick={() => showEditCollectionModal(value)}
                />
              </ButtonContainer>
            </ThumbnailContainer>
          ))}
      </FlexContainer>
      {isAddCollectionModalShow && (
        <CollectionModal
          title={"Add New Collection"}
          closeModal={() => setIsAddCollectionModalShow(false)}
          onSave={createNewCollection}
          yesButtonText={"Add"}
          showErrorMessage={showErrorMessage}
        />
      )}
      {isEditCollectionModalShow && (
        <CollectionModal
          title={"Edit Collection Name"}
          closeModal={() => setIsEditCollectionModalShow(false)}
          onSave={updateName}
          initialName={toBeEditedCollection.title}
          showErrorMessage={showErrorMessage}
          yesButtonText={"Edit"}
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

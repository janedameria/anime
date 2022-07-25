import { useState } from "react";
import Head from "next/head";
import Thumbnail from "../../components/Thumbnail";
import CollectionModal from "../../components/CollectionModal";
import CircleButton from "../../components/CircleButton";
import { Container, FlexContainer } from "../../styles/CollectionsStyles";
import { validateCollectionName } from "../../helper/Collections";
import { useAppContext } from "../../context/state";

export default function Collections({}) {
  const { collectionList, addNewCollection } = useAppContext();
  const thumbnailType = "collections";
  const [isAddCollectionModalShow, setIsAddCollectionModalShow] =
    useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

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
            <Thumbnail data={value} type={thumbnailType} key={value.id} />
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
    </Container>
  );
}

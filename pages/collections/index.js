import { useState, useEffect } from "react";
import { parseCookies } from "../../helper/ParseCookies";
import Cookie from "js-cookie";
import { uniqueId, size } from "lodash";
import Head from "next/head";
import Thumbnail from "../../components/Thumbnail";
import NewCollectionModal from "../../components/NewCollectionModal";
import CircleButton from "../../components/CircleButton";
import { Container, FlexContainer } from "../../styles/CollectionsStyles";

export async function getServerSideProps({ req }) {
  const cookie = parseCookies(req);
  const collections =
    cookie.collections != null ? JSON.parse(cookie.collections) : [];
  return {
    props: {
      initialCollections: collections,
    },
  };
}

export default function Collections({ initialCollections }) {
  const thumbnailType = "collections";
  const [isAddCollectionModalShow, setIsAddCollectionModalShow] =
    useState(false);
  const [collectionList, setCollectionList] = useState(initialCollections);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    Cookie.set("collections", JSON.stringify(collectionList));
  }, [collectionList, setCollectionList]);

  const closeModal = () => {
    setIsAddCollectionModalShow(false);
  };

  const validateName = (name) => {
    setShowErrorMessage(false);
    if (name.length == 0) {
      return false;
    }
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const containsSpecialChar = specialChars.test(name);
    if (containsSpecialChar) {
      return false;
    }

    const temp = [...collectionList, { title: name }];
    const unique = [...new Set(temp.map((value) => value.title))];
    if (unique.length !== temp.length) {
      return false;
    }
    return true;
  };

  const addNewCollection = (name) => {
    setShowErrorMessage(false);
    if (!validateName(name)) {
      return setShowErrorMessage(true);
    }
    const newCol = {
      id: uniqueId(),
      title: name,
      cover: "/no_cover.png",
      animeList: [],
    };
    setCollectionList([...collectionList, newCol]);
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
        {collectionList &&
          collectionList.map((value) => (
            <Thumbnail data={value} type={thumbnailType} key={value.id} />
          ))}
      </FlexContainer>
      {isAddCollectionModalShow && (
        <NewCollectionModal
          closeModal={closeModal}
          onSave={addNewCollection}
          showErrorMessage={showErrorMessage}
        />
      )}
    </Container>
  );
}

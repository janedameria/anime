import { createContext, useContext, useEffect, useState } from "react";
import uniqid from "uniqid";
import Cookie from "js-cookie";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [collectionList, setCollectionList] = useState([]);

  useEffect(() => {
    const collections = Cookie.get("collections");
    if (collections) {
      setCollectionList(JSON.parse(collections));
    }
  }, []);

  const updateCollectionList = (newList) => {
    setCollectionList(newList);
    Cookie.set("collections", JSON.stringify(newList));
  };
  const addNewCollection = (name) => {
    const newCol = {
      id: uniqid(),
      title: name,
      cover: "/no_cover.png",
      animeList: [],
    };
    updateCollectionList([...collectionList, newCol]);
  };

  const removeAnimeFromCollection = (collectionId, animeId) => {
    const temp = collectionList.map((value) => {
      if (value.id === collectionId) {
        value.animeList = value.animeList.filter(
          (value) => value.id != animeId
        );
      }
      return value;
    });
    updateCollectionList(temp);
  };

  let sharedState = {
    collectionList,
    updateCollectionList,
    removeAnimeFromCollection,
    addNewCollection,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

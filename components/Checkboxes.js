import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { find } from "lodash";

const UL = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 1rem;
`;

const List = styled.li`
  word-wrap: break-word;
  list-style: none;
  width: 33%;
`;

const InputCheckbox = styled.input`
  margin-right: 0.3rem;
`;
const Label = styled.label`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    opacity: 0.9;
  }
`;
const Checkboxes = ({
  data,
  addAnimeToCollection,
  animeId,
  removeAnimeFromCollection,
}) => {
  const router = useRouter();
  const onChangeCheckbox = (e, id) => {
    if (e.target.checked) {
      return addAnimeToCollection(id);
    }

    return removeAnimeFromCollection(id, animeId);
  };

  const valueListInput = (animeList) => {
    const value = find(animeList, (value) => value.id == animeId);
    if (value) {
      return true;
    }
    return false;
  };

  return (
    <UL class="items">
      {data &&
        data.map((value) => (
          <List key={value.id}>
            <InputCheckbox
              type="checkbox"
              key={value.id}
              onChange={(e) => onChangeCheckbox(e, value.id)}
              checked={valueListInput(value.animeList)}
            />
            <Label onClick={() => router.push(`/collections/${value.id}`)}>
              {value.title}
            </Label>
          </List>
        ))}
    </UL>
  );
};

export default Checkboxes;

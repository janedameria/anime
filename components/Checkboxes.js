import styled from "@emotion/styled";

const UL = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 1rem;

  > * {
    word-wrap: break-word;
    list-style: none;
    width: 33%;
  }
`;

const InputCheckbox = styled.input`
  margin-right: 0.3rem;
`;
const Checkboxes = () => {
  return (
    <UL class="items">
      <li>
        <InputCheckbox type="checkbox" />
        Apple
      </li>
    </UL>
  );
};

export default Checkboxes;

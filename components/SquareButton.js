import styled from "@emotion/styled";

const MyButton = styled.button`
  background-color: ${(props) => (props.dark ? "#3d3e43" : "#fbfbfb")};
  color: ${(props) => (props.dark ? "#fbfbfb" : "#3d3e43")};
  padding: 0.5rem 0.8rem;
  border-radius: 0.3rem;
  border: 1px solid #3d3e43;
  margin: 0 0.3rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => (props.dark ? "#fbfbfb" : "#3d3e43")};
    color: ${(props) => (props.dark ? "#3d3e43" : "#fbfbfb")};
    border: 1px solid #3d3e43;
    transition: all 0.2s;
  }
`;
const SquareButton = ({ type, text, onClick }) => {
  if (type == "dark") {
    <MyButton dark onClick={onClick}>
      {text}
    </MyButton>;
  }
  return <MyButton onClick={onClick}>{text}</MyButton>;
};

export default SquareButton;

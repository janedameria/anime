import styled from "@emotion/styled";
const Button = styled.button`
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "#fff")};
  color: ${(props) => (props.color ? props.color : "#3d3e43")};
  border: ${(props) =>
    props.bgcolor ? `1px solid ${props.bgcolor}` : "1px solid #3d3e43"};
  border-radius: 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1;
  padding: 0.6rem 0.7rem;
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);

  &:hover {
    background-color: ${(props) => (props.bgcolor ? "#fff" : "#1e293b")};
    color: ${(props) => (props.bgcolor ? props.bgcolor : "#fff")};
  }
`;
const CircleButton = ({ text, onClick, color }) => {
  if (color == "RED") {
    return (
      <Button onClick={onClick} bgcolor={"#F37878"} color={"#FBFBFB"}>
        {text}
      </Button>
    );
  }

  return <Button onClick={onClick}>{text}</Button>;
};

export default CircleButton;

import styled from "@emotion/styled";
const Button = styled.button`
  background-color: #fff;
  border: 1px solid #3d3e43;
  border-radius: 1.5rem;
  color: #3d3e43;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1;
  padding: 0.6rem 0.7rem;
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);

  &:hover {
    background-color: #1e293b;
    color: #fff;
  }
`;
const CircleButton = ({ text, onClick }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default CircleButton;

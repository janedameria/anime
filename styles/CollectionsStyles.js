import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 3rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.center ? "center" : "space-between")};
  align-items: center;
  flex-wrap: wrap;
`;

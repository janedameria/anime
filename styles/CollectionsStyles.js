import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 3rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.center ? "center" : "space-between")};
  align-items: center;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-around;
`;

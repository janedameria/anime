import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;
export const AnimeListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
`;

export const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Paragraph = styled.p`
  font-size: 1.1rem;
  margin-top: 3rem;
  color: #a9a9a9;
`;
export const SubContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const IconButton = styled.button`
  margin-left: 1rem;
  background-color: inherit;
  line-height: 1.2rem;
  border: none;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

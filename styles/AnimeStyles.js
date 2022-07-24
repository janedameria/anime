import styled from "@emotion/styled";
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  align-items: center;
  justify-content: space-around;
  padding: 0 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const ImageContainer = styled.div`
  padding-bottom: 1rem;
`;

export const SubContainer = styled.div`
  max-width: 40rem;
  margin-left: 2rem;
  margin-right: 2rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  background-color: #fafafa;
  padding: 1rem 2rem;

  border-radius: 1%;
`;

export const RomajiTitle = styled.h3`
  text-align: center;
`;

export const NativeTitle = styled.h4`
  text-align: center;
  margin-bottom: 1rem;
`;

export const GenreItem = styled.span`
  background-color: #3d3e43;
  color: #fbfbfb;
  padding: 0.2rem 0.3rem;
  font-size: 0.8rem;
  border-radius: 0.2rem;
  margin: 0 0.2rem;
`;

export const Description = styled.p`
  text-align: justify;
`;

export const Paragraph = styled.p`
  font-weight: bold;
  line-height: 2rem;
  > * {
    font-weight: normal;
  }
`;

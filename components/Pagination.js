import styled from "@emotion/styled";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button`
  color: ${(props) => (props.active ? "#fbfbfb" : "#3d3e43")};
  background-color: ${(props) => (props.active ? "#3d3e43" : "#fbfbfb")};
  border: 1px solid #3d3e43;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  &:hover {
    opacity: 0.9;
  }
`;

const Pagination = ({ pageInfo }) => {
  const { currentPage, lastPage } = pageInfo;
  const router = useRouter();
  const renderPage = () => {
    if (currentPage == 1) {
      return [currentPage, currentPage + 1, currentPage + 2];
    }
    if (currentPage === lastPage) {
      return [currentPage - 2, currentPage - 1, currentPage];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };
  const CurrentPageList = renderPage();

  const paginationOnClick = (item) => {
    router.push({
      pathname: router.pathname,
      query: { page: item },
    });
  };

  return (
    <Container>
      <PaginationButton onClick={() => paginationOnClick(currentPage - 1)}>
        <span>&#60;</span>
      </PaginationButton>
      {CurrentPageList.map((item) => {
        const isActive = currentPage == item;

        if (isActive) {
          return (
            <PaginationButton
              active
              key={item}
              onClick={() => paginationOnClick(item)}
            >
              {item}
            </PaginationButton>
          );
        }
        return (
          <PaginationButton key={item} onClick={() => paginationOnClick(item)}>
            {item}
          </PaginationButton>
        );
      })}
      <PaginationButton onClick={() => paginationOnClick(currentPage + 1)}>
        <span>&#62;</span>
      </PaginationButton>
    </Container>
  );
};

export default Pagination;

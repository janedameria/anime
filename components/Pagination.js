import styled from "@emotion/styled";
import Link from "next/link";

const PageList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  margin: 3rem;
  border-radius: 0.6rem;
  background: #ffffff;
  box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);
`;

const ItemList = styled.li`
  width: 30px;
  height: 30px;
  color: ${(props) => (props.active ? "#fbfbfb" : "#3d3e43")};
  background-color: ${(props) => (props.active ? "#3d3e43" : "#fbfbfb")};
  border: 1px solid #3d3e43;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Pagination = ({ pageInfo }) => {
  const { currentPage, total, lastPage } = pageInfo;
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

  return (
    <div>
      <PageList>
        <ItemList>
          <span>&#60;</span>
        </ItemList>
        {CurrentPageList.map((item) => {
          const isActive = currentPage == item;

          if (isActive) {
            return (
              <ItemList active key={item}>
                <Link
                  href={{
                    pathname: "/",
                    query: { page: item },
                  }}
                >
                  {item}
                </Link>
              </ItemList>
            );
          }
          return (
            <ItemList key={item}>
              <Link
                href={{
                  pathname: "/",
                  query: { page: item },
                }}
              >
                {item}
              </Link>
            </ItemList>
          );
        })}
        <ItemList>
          <span>&#62;</span>
        </ItemList>
      </PageList>
    </div>
  );
};

export default Pagination;

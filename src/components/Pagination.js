import React, { useState, useEffect } from "react";
import horizontalLoader from "../assets/horizontal-loader.svg";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  list: {
    listStyle: "none",
    display: "flex",
    flex: 2,
    alignSelf: "center",
    padding: 0,
    fontSize: "1.3rem",
    marginTop: 5,
    marginBottom: 5,
    "@media(max-width: 767px)": {
      justifyContent: "center",
      flexWrap: "wrap"
    }
  },
  listItem: {
    backgroundColor: "white",
    margin: 1,
    borderRadius: 2,
    textAlign: "center",
    padding: ".4rem",
    color: "#36304A",
    fontWeight: "bold",
    cursor: "pointer"
  },
  current: {
    border: "1px solid #3D79B8",
    backgroundColor: "#3D79B8",
    color: "white",
    fontWeight: "bold"
  },
  seperator: {
    color: "#6b6b6b"
  },
  showedResults: {
    flex: 1,
    paddingLeft: "1rem",
    "@media(max-width: 767px)": {
      flex: "initial",
      marginBottom: 5,
      marginTop: 5,
      padding: 0
    }
  }
});

export default function Pagination(props) {
  const {
    itemsPerPage,
    itemsCount,
    setCurrentPage,
    currentPage,
    defaultItemsPerPage,
    firstItemIndex,
    lastItemIndex,
    tableDOM
  } = props;
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const firstItem = pageNumbers[0];
  const lastItem = pageNumbers[pageNumbers.length - 1];
  const onLastPage = currentPage === lastItem;

  const seperator = (
    <li className={`${classes.listItem} ${classes.seperator}`}>...</li>
  );
  const numberOfResults = () => {
    if (itemsCount === 0) {
      return <h4 className={classes.showedResults}>No results</h4>;
    } else {
      return (
        <h4 className={classes.showedResults}>{`Showing ${firstItemIndex + 1}-${
          onLastPage ? itemsCount : lastItemIndex
        } of ${itemsCount} results`}</h4>
      );
    }
  };

  function PageNumber({ num }) {
    const current = num === currentPage;
    return (
      <li
        className={`${classes.listItem} ${current ? classes.current : ""}`}
        value={num}
        onClick={e => handleClick(e)}
      >
        {num}
      </li>
    );
  }

  function renderPageNumbers() {
    if (pageNumbers.length <= 6) {
      return pageNumbers.map(num => <PageNumber key={num} num={num} />);
    }
    if (currentPage <= 4) {
      const rightSide = <PageNumber num={lastItem} />;
      const leftSide = pageNumbers.slice(0, 6).map(num => {
        return <PageNumber key={num} num={num} />;
      });
      return (
        <>
          {leftSide}
          {seperator}
          {rightSide}
        </>
      );
    } else if (currentPage >= 5 && currentPage <= pageNumbers.length - 4) {
      const leftSide = <PageNumber num={firstItem} />;
      const rightSide = <PageNumber num={lastItem} />;
      const middle = pageNumbers
        .slice(currentPage - 3, currentPage + 2)
        .map(num => {
          return <PageNumber key={num} num={num} />;
        });

      return (
        <>
          {leftSide}
          {seperator}
          {middle}
          {seperator}
          {rightSide}
        </>
      );
    } else if (currentPage >= pageNumbers.length - 3) {
      const leftSide = <PageNumber num={firstItem} />;
      const rightSide = pageNumbers.slice(-6).map(num => {
        return <PageNumber key={num} num={num} />;
      });
      return (
        <>
          {leftSide}
          {seperator}
          {rightSide}
        </>
      );
    }
  }
  useEffect(() => {
    if (itemsCount > defaultItemsPerPage) {
      setIsLoading(false);
    }
  }, [itemsCount, defaultItemsPerPage]);

  const handleClick = e => {
    setCurrentPage(e);
    tableDOM.scrollTo(0, 0);
  };

  return (
    <>
      {isLoading ? (
        <img src={horizontalLoader} alt="" />
      ) : (
        <>
          {numberOfResults()}
          {itemsCount > 0 && (
            <ul className={classes.list}>
              <li
                className={classes.listItem}
                value={currentPage - 1}
                onClick={currentPage !== firstItem ? setCurrentPage : undefined}
              >
                {`<`}
              </li>
              {renderPageNumbers()}
              <li
                className={classes.listItem}
                value={currentPage + 1}
                onClick={currentPage !== lastItem ? setCurrentPage : undefined}
              >
                {`>`}
              </li>
            </ul>
          )}
        </>
      )}
    </>
  );
}

import React from "react";
/* 
    << |1| 2 3 4 5 6 ... 30 >>
    << 1 |2| 3 4 5 6 ... 30 >>
    << 1 2 |3| 4 5 6 ... 30 >>
    << 1 2 3 |4| 5 6 ... 30 >>

    << 1 ... 3 4 |5| 6 7 ... 30 >>
    << 1 ... 5 6 |7| 8 9 ... 30 >>
    << 1 ... 23 24 |25| 26 27 ... 30 >>
    << 1 ... 24 25 |26| 27 28 ... 30 >>

    << 1 ... 25 26 |27| 28 29 30 >>
    << 1 ... 25 26 27 |28| 29 30 >>
    << 1 ... 25 26 27 28 |29| 30 >>
    << 1 ... 25 26 27 28 29 |30| >>
*/

const listStyling = {
  listStyle: "none",
  display: "flex",
  padding: 0
};

const listItemStyling = {
  margin: 5
};

export default function Pagination(props) {
  const { itemsPerPage, itemsCount, setCurrentPage, currentPage } = props;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const firstItem = pageNumbers[0];
  const lastItem = pageNumbers[pageNumbers.length - 1];

  const seperator = <li style={listItemStyling}>...</li>;

  function PageNumber({ num }) {
    return (
      <li style={listItemStyling} value={num} onClick={setCurrentPage}>
        {num}
      </li>
    );
  }
  
  function renderPagesNumbers() {
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

  return (
    <ul style={listStyling}>
      <button
        value={currentPage - 1}
        onClick={currentPage !== firstItem ? setCurrentPage : undefined}
      >
        {`<<`}
      </button>
      {renderPagesNumbers()}
      <button
        value={currentPage + 1}
        onClick={currentPage !== lastItem ? setCurrentPage : undefined}
      >
        {`>>`}
      </button>
    </ul>
  );
}

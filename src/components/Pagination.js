import React from "react";

const listStyling = {
  listStyle: "none",
  display: "flex",
  padding: 0
};

const listItemStyling = {
  margin: 5
};

export default function Pagination(props) {
  const { itemsPerPage, itemsCount, setCurrentPage } = props;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(itemsCount / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const renderPageNumbers = pageNumbers.map(num => {
    return (
      <li style={listItemStyling} key={num} id={num} onClick={setCurrentPage}>
        {num}
      </li>
    );
  });
  return <ul style={listStyling}>{renderPageNumbers}</ul>;
}

Pagination.defaultProps = {
  currentPage: 1,
  itemsPerPage: 10,
  itemsCount: 100
};

import React from "react";

export default function SearchBox({ companies }) {
  function simpleSearch(term) {
    return companies.filter(company => {
      let results = Object.values(company);
      for (const value of results) {
        if (
          value
            .toString()
            .toLowerCase()
            .includes(term)
        ) {
          return company;
        }
      }
      return null
    });
  }

  const handleChange = e => {
    e.preventDefault();
    console.log(simpleSearch(e.target.value));
  };

  return (
    <div>
      <span>Search </span>
      <input type="text" onChange={e => handleChange(e)} />
    </div>
  );
}

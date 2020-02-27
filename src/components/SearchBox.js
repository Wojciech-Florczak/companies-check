import React from "react";

//TODO implement debouncing

export default function SearchBox(props) {
  const { companies, setDisplayedCompanies, setCurrentPage } = props;

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
      return null;
    });
  }

  const handleChange = e => {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      setDisplayedCompanies(simpleSearch(e.target.value));
      setCurrentPage(1);
    } else {
      setDisplayedCompanies(companies);
    }
  };
  return (
    <div>
      <span>Search </span>
      <input type="text" onChange={e => handleChange(e)} />
    </div>
  );
}

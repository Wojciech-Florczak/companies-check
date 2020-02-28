import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchBox(props) {
  const { companies, setDisplayedCompanies, setCurrentPage } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);

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

  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      setDisplayedCompanies(simpleSearch(debouncedSearchTerm));
      setCurrentPage(1);
    } else {
      setDisplayedCompanies(companies);
    }
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  return (
    <div>
      <span>Search </span>
      <input type="text" onChange={e => setSearchTerm(e.target.value)} />
    </div>
  );
}

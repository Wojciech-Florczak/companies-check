import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    "& img": {
      marginRight: 5
    },
    "& input": {
      border: "2px solid #3D79B8",
      borderRadius: 5,
      padding: 5,
      "&::placeholder": {
        color: "#36304A",
        opacity: 0.8
      },
      "@media(max-width: 767px)": {
        width: "100%"
      }
    }
  }
});

export default function SearchBox(props) {
  const { companies, setDisplayedCompanies, setCurrentPage, config, tableDOM } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, config.searchDebounce);

  const classes = useStyles();

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
      tableDOM.scrollTo(0, 0);
    } else {
      setDisplayedCompanies(companies);
    }
    // eslint-disable-next-line
  }, [debouncedSearchTerm]);

  return (
    <div className={classes.wrapper}>
      <input
        type="text"
        placeholder="Search..."
        onChange={e => setSearchTerm(e.target.value)}
        onKeyDown={e => e.key === "Enter" && document.activeElement.blur()}
      />
    </div>
  );
}

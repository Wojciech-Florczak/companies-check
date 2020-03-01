import React from "react";
import { createUseStyles } from "react-jss";
import { sortASC, sortDESC } from "../helpers";

const useStyles = createUseStyles({
  wrapper: {
    display: "none",
    alignItems: "center",
    flex: 1,
    marginRight: 5,
    "@media(max-width: 767px)": {
      display: "flex",
      "& label": {
        marginRight: 5
      },
      "& select": {
        backgroundColor: "white",
        border: "2px solid #3D79B8",
        borderRadius: 5,
        color: "#36304A",
        padding: 4,
        width: 120
      }
    }
  }
});
export default function DropdownSort(props) {
  const {
    fullDataLoaded,
    config,
    setDisplayedCompanies,
    displayedCompanies,
    setCurrentPage,
    tableDOM
  } = props;
  const classes = useStyles();
  const optionsList = Object.entries(config.headers).map(([key, value]) => {
    return (
      <React.Fragment key={key}>
        <option value={key} order="ASC">
          {value} - ASC ▲
        </option>
        <option value={key} order="DESC">
          {value} - DESC ▼
        </option>
      </React.Fragment>
    );
  });

  // handle sorting
  const handleSortNew = e => {
    const order = e.target.selectedOptions[0].attributes.order.value;
    const value = e.target.value;

    if (order === "ASC") {
      const sortedCompanies = [...sortASC(displayedCompanies, value)];
      setDisplayedCompanies(sortedCompanies);
      setCurrentPage(1);
      tableDOM.scrollTo(0, 0);
    } else {
      const sortedCompanies = [...sortDESC(displayedCompanies, value)];
      setDisplayedCompanies(sortedCompanies);
      setCurrentPage(1);
      tableDOM.scrollTo(0, 0);
    }
  };

  return (
    <div className={classes.wrapper}>
      <label htmlFor="sortby">Sort</label>
      <select
        name="sortby"
        id="sortby"
        onChange={e => handleSortNew(e)}
        defaultValue={config.sortBy}
        disabled={!fullDataLoaded}
      >
        {optionsList}
      </select>
    </div>
  );
}

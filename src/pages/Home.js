import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortASC, sumUp, getLastMonth } from "../helpers";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import QuantityToShow from "../components/QuantityToShow";
import Table from "../components/Table";
import { createUseStyles } from "react-jss";
import DropdownSort from "../components/DropdownSort";

const useStyles = createUseStyles({
  menu: {
    fontSize: "1rem",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    backgroundColor: "#eaeaea",
    boxSizing: "border-box",
    padding: ".85rem .5rem",
    "@media(max-width: 767px)": {
      backgroundColor: "#36304A",
      color: "white"
    }
  },
  bottomMenu: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#36304A",
    minHeight: 61,
    "@media(max-width: 767px)": {
      flexDirection: "column",
      minHeight: 76
    }
  }
});

export default function Home({ config }) {
  const [companies, setCompanies] = useState([]);
  const [displayedCompanies, setDisplayedCompanies] = useState([]);
  const [currentCompanies, setCurrentCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(config.defaultItemsPerPage);
  const [sortedBy, setSortedBy] = useState(config.sortBy);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [fullDataLoaded, setFullDataLoaded] = useState(false);

  const classes = useStyles();
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const tableDOM = document.getElementById("table-wrapper");

  async function fetchCompanies() {
    let res = await axios.get("https://recruitment.hal.skygate.io/companies");
    let sortedCompanies = sortASC(res.data, config.sortBy);

    return sortedCompanies;
  }
  async function mapIncomesToCompanies(arr, initial = false) {
    if (initial) {
      arr = arr.slice(0, itemsPerPage);
    } else {
      arr = arr.slice(itemsPerPage, arr.length);
    }
    let lastMonth = getLastMonth();
    const companiesFullInfo = arr.map(async company => {
      const res = await axios.get(
        `https://recruitment.hal.skygate.io/incomes/${company.id}`
      );
      const incomes = res.data.incomes;

      const totalIncome = sumUp(incomes);
      const averageIncome = parseFloat(
        (totalIncome / incomes.length).toFixed(2)
      );
      const lastMonthIncome = sumUp(
        incomes.filter(income => income.date.startsWith(lastMonth))
      );
      return {
        ...company,
        totalIncome,
        averageIncome,
        lastMonthIncome
      };
    });
    const results = await Promise.all(companiesFullInfo);
    return results;
  }

  function applyDataToCompanies(data) {
    setCurrentCompanies(data.slice(firstItemIndex, lastItemIndex));
    setDisplayedCompanies([...displayedCompanies, ...data]);
    setCompanies([...companies, ...data]);
  }
  // Load initial data on mount
  useEffect(() => {
    (async () => {
      let data = await fetchCompanies();
      let initialData = await mapIncomesToCompanies(data, true);
      applyDataToCompanies(initialData);
      setInitialDataLoaded(true);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setCurrentCompanies(
      displayedCompanies.slice(firstItemIndex, lastItemIndex)
    );
  }, [
    itemsPerPage,
    currentPage,
    displayedCompanies,
    firstItemIndex,
    lastItemIndex
  ]);
  // Fetch and set remaining data
  if (initialDataLoaded) {
    (async () => {
      let data = await fetchCompanies();
      let fullData = await mapIncomesToCompanies(data);
      setInitialDataLoaded(false);
      setFullDataLoaded(true);
      applyDataToCompanies(fullData);
    })();
  }
  // handle items per page
  const handleQuantity = num => {
    setItemsPerPage(num);
    setCurrentPage(1);
    tableDOM.scrollTo(0, 0);
  };

  // handle sorting
  const handleSort = val => {
    if (val === sortedBy) {
      setDisplayedCompanies([...displayedCompanies].reverse());
      setSortedBy("");
      tableDOM.scrollTo(0, 0);
    } else {
      const sortedCompanies = [...sortASC(displayedCompanies, val)];
      setDisplayedCompanies(sortedCompanies);
      setSortedBy(val);
      tableDOM.scrollTo(0, 0);
    }
    setCurrentPage(1);
  };

  return (
    <>
      <div className={classes.menu}>
        <QuantityToShow
          config={config}
          handleQuantity={handleQuantity}
          itemsPerPage={itemsPerPage}
          fullDataLoaded={fullDataLoaded}
          setCurrentPage={setCurrentPage}
          tableDOM={tableDOM}
        />
        <DropdownSort
          fullDataLoaded={fullDataLoaded}
          config={config}
          displayedCompanies={displayedCompanies}
          setDisplayedCompanies={setDisplayedCompanies}
          setCurrentPage={setCurrentPage}
          tableDOM={tableDOM}
        />
        <SearchBox
          displayedCompanies={displayedCompanies}
          setDisplayedCompanies={setDisplayedCompanies}
          companies={companies}
          setCurrentPage={setCurrentPage}
          config={config}
          tableDOM={tableDOM}
        />
      </div>
      <Table
        currentCompanies={currentCompanies}
        handleSort={handleSort}
        config={config}
        fullDataLoaded={fullDataLoaded}
        initialDataLoaded={initialDataLoaded}
      />
      <div className={classes.bottomMenu}>
        <Pagination
          itemsCount={displayedCompanies.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={e => setCurrentPage(Number(e.target.value))}
          defaultItemsPerPage={config.defaultItemsPerPage}
          lastItemIndex={lastItemIndex}
          firstItemIndex={firstItemIndex}
          tableDOM={tableDOM}
        />
      </div>
    </>
  );
}

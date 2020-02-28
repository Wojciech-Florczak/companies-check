import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortASC, sumUp, getLastMonth } from "../helpers";
import Pagination from "../components/Pagination";
import SearchBox from "../components/SearchBox";
import QuantityToShow from "../components/QuantityToShow";
import Table from "../components/Table";

export default function Home({ config }) {
  const [companies, setCompanies] = useState([]);
  const [displayedCompanies, setDisplayedCompanies] = useState([]);
  const [currentCompanies, setCurrentCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(config.defaultItemsPerPage);
  const [sortedBy, setSortedBy] = useState(config.sortBy);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

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

  // Fetch and set remaining data
  if (initialDataLoaded) {
    (async () => {
      let data = await fetchCompanies();
      let fullData = await mapIncomesToCompanies(data);
      setInitialDataLoaded(false);
      applyDataToCompanies(fullData);
    })();
  }

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

  // handle items per page
  const handleQuantity = num => {
    setItemsPerPage(num);
    setCurrentPage(1);
  };

  // handle sorting
  const handleSort = val => {
    if (val === sortedBy) {
      setDisplayedCompanies([...displayedCompanies].reverse());
      setSortedBy("");
    } else {
      const sortedCompanies = [...sortASC(displayedCompanies, val)];
      setDisplayedCompanies(sortedCompanies);
      setSortedBy(val);
    }
    setCurrentPage(1);
  };

  return (
    <>
      <Pagination
        itemsCount={displayedCompanies.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={e => setCurrentPage(Number(e.target.value))}
        defaultItemsPerPage={config.defaultItemsPerPage}
      />
      <QuantityToShow config={config} handleQuantity={handleQuantity} />
      <SearchBox
        displayedCompanies={displayedCompanies}
        setDisplayedCompanies={setDisplayedCompanies}
        companies={companies}
        setCurrentPage={setCurrentPage}
      />
      <Table currentCompanies={currentCompanies} handleSort={handleSort} />
    </>
  );
}
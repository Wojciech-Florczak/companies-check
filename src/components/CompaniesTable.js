import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortASC, sumUp } from "../helpers";
import Pagination from "./Pagination";

export default function CompaniesTable() {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentCompanies, setCurrentCompanies] = useState([]);

  async function fetchData() {
    let res = await axios.get("https://recruitment.hal.skygate.io/companies");
    let sorted = sortASC(res.data, "id");
    setCompanies(sorted);
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getFullData();
  }, [currentPage, companies]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  function getLastMonth() {
    let date = new Date();
    let currentYear = date.getFullYear();
    let lastMonth = date
      .getMonth()
      .toString()
      .padStart(2, "0");
    let result = `${currentYear}-${lastMonth}`;
    return result;
  }

  /* Make request only for companies that are being displayed to reduce number of requests */
  async function getFullData() {
    // TODO Modify this function to get full data of all companies when column header is clicked or search input has changed
    // TODO Implement requests caching
    const current = companies.slice(firstItemIndex, lastItemIndex);
    const currentCompaniesFullInfo = current.map(async company => {
      const res = await axios.get(
        `https://recruitment.hal.skygate.io/incomes/${company.id}`
      );
      const incomes = res.data.incomes;

      const totalIncome = sumUp(incomes);
      const averageIncome = parseFloat(
        (totalIncome / incomes.length).toFixed(2)
      );
      const lastMonthIncome = sumUp(
        incomes.filter(income => income.date.startsWith(getLastMonth()))
      );
      return {
        ...company,
        totalIncome,
        averageIncome,
        lastMonthIncome
      };
    });
    const results = await Promise.all(currentCompaniesFullInfo);
    setCurrentCompanies(results);
  }

  const renderCompanies = currentCompanies.map((company, i) => {
    const {
      id,
      name,
      city,
      totalIncome,
      averageIncome,
      lastMonthIncome
    } = company;
    return (
      <tr key={i}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{city}</td>
        <td>{totalIncome.toFixed(2)}</td>
        <td>{averageIncome.toFixed(2)}</td>
        <td>{lastMonthIncome.toFixed(2)}</td>
      </tr>
    );
  });

  function simpleSearch(term) {
    return companies.filter(company => {
      if (company.name.toLowerCase().includes(term)) {
        return company;
      } else if (company.city.toLowerCase().includes(term)) {
        return company;
      } else if (company.id.toString().includes(term)) {
        return company;
      }
    });
  }
  console.log(simpleSearch("port"));

  console.log(currentCompanies);

  // handle sorting
  const handleClick = val => {
    setCompanies([...sortASC(companies, val)]);
    setCurrentPage(1);
  };

  return (
    <>
      <Pagination
        itemsCount={companies.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={e => setCurrentPage(Number(e.target.id))}
      />
      <table border="1">
        <thead>
          <tr>
            <th scope="col">
              <button onClick={() => handleClick("id")}>ID</button>
            </th>
            <th scope="col">
              <button onClick={() => handleClick("name")}>Name</button>
            </th>
            <th scope="col">
              <button onClick={() => handleClick("city")}>City</button>
            </th>
            <th scope="col">
              <button onClick={() => handleClick("totalIncome")}>
                Total Income
              </button>
            </th>
            <th scope="col">
              <button onClick={() => handleClick("averageIncome")}>
                Average Income
              </button>
            </th>
            <th scope="col">
              <button onClick={() => handleClick("lastMonthIncome")}>
                Last Month Income
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{renderCompanies}</tbody>
      </table>
    </>
  );
}

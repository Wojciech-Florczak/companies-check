import React, { useEffect, useState } from "react";
import axios from "axios";
import { sortASC } from "../helpers";
import Pagination from "./Pagination";

export default function CompaniesTable() {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  async function getData() {
    let res = await axios.get("https://recruitment.hal.skygate.io/companies");
    let sorted = sortASC(res.data, "id");
    setCompanies(sorted);
  }
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const currentCompanies = companies.slice(firstItemIndex, lastItemIndex);
  const renderCompanies = currentCompanies.map((company, i) => {
    return (
      <tr key={i}>
        <td>{company.id}</td>
        <td>{company.name}</td>
        <td>{company.city}</td>
      </tr>
    );
  });

  const handleClick = val => {
    setCompanies([...sortASC(companies, val)]);
    setCurrentPage(1)
  };

  // on mount
  useEffect(() => {
    getData();
  }, []);

  console.dir(companies);

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
          </tr>
        </thead>
        <tbody>
          {renderCompanies}
        </tbody>
      </table>
    </>
  );
}

import React from "react";

export default function TableRows({ currentCompanies }) {
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

  return renderCompanies;
}

import React from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

const headers = {
  id: "ID",
  name: "Name",
  city: "City",
  totalIncome: "Total Income",
  averageIncome: "Average Income",
  lastMonthIncome: "Last Month Income"
};

export default function Table(props) {
  const { currentCompanies, handleSort } = props;
  const headersList = Object.entries(headers).map(([key, value]) => {
    return (
      <TableHeader
        key={key}
        handleSort={handleSort}
        target={key}
        name={value}
      />
    );
  });

  return (
    <div>
      <table border="1">
        <thead>
          <tr>{headersList}</tr>
        </thead>
        <tbody>
          <TableRows currentCompanies={currentCompanies} />
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

export default function Table(props) {
  const { currentCompanies, handleSort } = props;

  return (
    <table border="1">
      <thead>
        <tr>
          <TableHeader handleSort={handleSort} name="ID" target="id" />
          <TableHeader handleSort={handleSort} name="Name" target="name" />
          <TableHeader handleSort={handleSort} name="City" target="city" />
          <TableHeader
            handleSort={handleSort}
            name="Total Income"
            target="totalIncome"
          />
          <TableHeader
            handleSort={handleSort}
            name="Average Income"
            target="averageIncome"
          />
          <TableHeader
            handleSort={handleSort}
            name="Last Month Income"
            target="lastMonthIncome"
          />
        </tr>
      </thead>
      <tbody>
        <TableRows currentCompanies={currentCompanies} />
      </tbody>
    </table>
  );
}

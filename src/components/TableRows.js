import React from "react";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  row: {
    "& td": {
      padding: "12px 15px",
      textAlign: "left"
    },
    "& :first-child": {
      textAlign: "center"
    },
    "& :nth-child(n+4)": {
      textAlign: "right"
    },
    "@media(max-width: 767px)": {
      borderRadius: 10,
      "& td:not(:last-child)": {
        border: 0,
        borderBottom: "1px solid #ddd"
      }
    }
  }
});

export default function TableRows(props) {
  const {
    currentCompanies,
    headers,
    initialDataLoaded,
    fullDataLoaded,
    config
  } = props;
  const classes = useStyles();

  function generateEmptyRows(num) {
    let rows = [];
    for (let i = 0; i <= num; i++) {
      rows.push(
        <tr key={i} className={classes.row}>
          <td data-label={headers.id}>&nbsp;</td>
          <td data-label={headers.name}>&nbsp;</td>
          <td data-label={headers.city}>&nbsp;</td>
          <td data-label={headers.totalIncome}>&nbsp;</td>
          <td data-label={headers.averageIncome}>&nbsp;</td>
          <td data-label={headers.lastMonthIncome}>&nbsp;</td>
        </tr>
      );
    }
    return rows;
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
      <tr className={classes.row} key={i}>
        <td data-label={headers.id}>{id}</td>
        <td data-label={headers.name}>{name}</td>
        <td data-label={headers.city}>{city}</td>
        <td data-label={headers.totalIncome}>
          {totalIncome.toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN"
          })}
        </td>
        <td data-label={headers.averageIncome}>
          {averageIncome.toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN"
          })}
        </td>
        <td data-label={headers.lastMonthIncome}>
          {lastMonthIncome.toLocaleString("pl-PL", {
            style: "currency",
            currency: "PLN"
          })}
        </td>
      </tr>
    );
  });

  return initialDataLoaded || fullDataLoaded
    ? renderCompanies
    : generateEmptyRows(config.defaultItemsPerPage);
}

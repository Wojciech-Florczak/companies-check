import React from "react";
import { createUseStyles } from "react-jss";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

const useStyles = createUseStyles({
  wrapper: {
    overflow: "auto",
    maxWidth: "100%",
    scrollBehaviour: "smooth",
    "@media(max-width: 767px)": {
      flex: 1,
      width: "100%",
      paddingTop: 5,
      paddingBottom: 5,
      boxSizing: "border-box",
      borderBottom: "2px solid #36304A"
    }
  },
  body: {
    "& tr:nth-child(even)": {
      backgroundColor: "#eaeaea"
    },
    "& tr:nth-child(odd)": {
      backgroundColor: "#fff"
    }
  },
  head: {
    "& tr th:first-child": {
      textAlign: "center"
    },
    "& tr th:nth-child(n+4)": {
      textAlign: "right"
    },
    "& tr th:not(:last-child)": {
      borderRight: "1px solid #ddd"
    }
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    "@media(max-width: 767px)": {
      width: "100%",
      display: "block",
      "& thead": {
        display: "none"
      },
      "& tbody, tr, td": {
        display: "block",
        width: "auto"
      },
      "& tr:not(:last-child)": {
        marginBottom: 15
      },
      "& td": {
        paddingLeft: "40%",
        textAlign: "right!important",
        position: "relative",
        "&::before": {
          content: "attr(data-label)",
          position: "absolute",
          left: 0,
          width: "auto",
          textAlign: "left",
          paddingLeft: ".5rem",
          fontSize: "1rem",
          fontWeight: "bold"
        }
      }
    }
  },
  emptyRow: {
    "& td": {
      padding: "12px 15px"
    }
  }
});

export default function Table(props) {
  const {
    currentCompanies,
    handleSort,
    config,
    fullDataLoaded,
    initialDataLoaded
  } = props;
  const classes = useStyles();
  const headers = config.headers;
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
    <div className={classes.wrapper} id="table-wrapper">
      <table className={classes.table}>
        <thead className={classes.head}>
          <tr>{headersList}</tr>
        </thead>
        <tbody className={classes.body}>
            <TableRows
              currentCompanies={currentCompanies}
              headers={headers}
              initialDataLoaded={initialDataLoaded}
              fullDataLoaded={fullDataLoaded}
              config={config}
            />
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
import Home from "./pages/Home";
import "./App.css";
import { createUseStyles } from "react-jss";

const config = {
  itemsPerPage: [10, 20, 30],
  defaultItemsPerPage: 20,
  sortBy: "id",
  searchDebounce: 400,
  headers: {
    id: "ID",
    name: "Name",
    city: "City",
    totalIncome: "Total Income",
    averageIncome: "Average Income",
    lastMonthIncome: "Last Month Income"
  }
};

const useStyles = createUseStyles({
  mainWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to right, #56ccf2, #2f80ed)"
  },
  container: {
    marginTop: "1rem",
    borderRadius: 5,
    minWidth: "80%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    "@media(max-width: 767px)": {
      margin: 0,
      width: "100%",
      borderRadius: 0
    }
  }
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.container}>
        <Home config={config} />
      </div>
    </div>
  );
}

export default App;

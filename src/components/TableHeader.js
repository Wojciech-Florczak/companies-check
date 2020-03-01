import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  header: {
    backgroundColor: "#36304A",
    textAlign: "left"
  },
  button: {
    cursor: "pointer",
    fontWeight: "bold",
    padding: "12px 15px",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: 0,
    overflow: "hidden",
    color: "#fff",
    fontSize: "0.9rem",
    textAlign: "inherit"
  }
});

export default function TableHeader({ handleSort, name, target }) {
  const classes = useStyles();
  return (
    <th className={classes.header} scope="col">
      <button className={classes.button} onClick={() => handleSort(target)}>
        {name}
      </button>
    </th>
  );
}

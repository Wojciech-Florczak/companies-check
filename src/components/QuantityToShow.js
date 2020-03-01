import React from "react";
import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  wrapper: {
    display: "flex",
    marginRight: "auto",
    alignItems: "center",
    "& label": {
      marginRight: 5
    },
    "& select": {
      marginRight: 5,
      backgroundColor: "white",
      border: "2px solid #3D79B8",
      borderRadius: 5,
      color: "#36304A",
      padding: 4
    },
    "@media(max-width: 767px)": {
      display: "initial"
    }
  }
});

export default function QuantityToShow(props) {
  const { config, handleQuantity, fullDataLoaded } = props;
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <label htmlFor="quantity">Show</label>
      <select
        name="quantity"
        id="quantity"
        onChange={e => handleQuantity(e.target.value)}
        defaultValue={config.defaultItemsPerPage}
        disabled={!fullDataLoaded}
      >
        {config.itemsPerPage.map(item => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}

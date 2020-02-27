import React from "react";

export default function QuantityToShow({ config, handleQuantity }) {
  return (
    <div>
      <span>Items to display: </span>
      {config.itemsPerPage.map(item => {
        return (
          <button key={item} onClick={() => handleQuantity(item)}>
            {item}
          </button>
        );
      })}
    </div>
  );
}

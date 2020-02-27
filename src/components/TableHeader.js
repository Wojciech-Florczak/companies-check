import React from "react";

const buttonStyling = {
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  outline: 0
}

export default function TableHeader({handleSort, name, target}) {
  return (
    <th scope="col">
      <button style={buttonStyling} onClick={() => handleSort(target)}>{name}</button>
    </th>
  );
}

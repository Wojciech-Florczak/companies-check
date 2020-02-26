import React from "react";

export default function TableHeader({handleClick, name, target}) {
  return (
    <th scope="col">
      <button onClick={() => handleClick(target)}>{name}</button>
    </th>
  );
}

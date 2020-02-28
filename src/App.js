import React from "react";
import Home from "./pages/Home";

const config = {
  itemsPerPage: [10, 20, 30],
  defaultItemsPerPage: 20,
  sortBy: "id"
};

function App() {
  const wrapperStyling = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  return (
    <div style={wrapperStyling}>
      <Home config={config} />
    </div>
  );
}

export default App;

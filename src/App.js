import React from "react";
import CompaniesTable from "./components/CompaniesTable";

const wrapperStyling = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

function App() {
  return (
    <div style={wrapperStyling}>
      <CompaniesTable />
    </div>
  );
}

export default App;

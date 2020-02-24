import React, {useEffect, useState} from "react";
import axios from "axios";

export default function CompaniesTable() {
  const [companies, setCompanies] = useState([])
  
  async function getData(){
    let res = await axios.get("https://recruitment.hal.skygate.io/companies")
    setCompanies(res.data)
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <table border="1">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">City</th>
        </tr>
      </thead>
      <tbody>
        {companies.map(company => {
          return (
          <tr key={company.id}>
            <td>{company.id}</td>
            <td>{company.name}</td>
            <td>{company.city}</td>
          </tr>
          )
        })}
      </tbody>
    </table>
  );
}

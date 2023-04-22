import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../CONSTANTS";

const ScholarContext = React.createContext();
const ScholarUpdateContext = React.createContext();

const useScholar = () => useContext(ScholarContext);
const useUpdateScholar = () => useContext(ScholarUpdateContext);

const ScholarProvider = ({children})=>{
  const [scholar, setScholar] = useState({});

  const getScholar = async ()=>{
    await axios
    .get(`${BASE_URL}/profile`, {
        headers: {
        Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
    })
    .then((res) => {
        console.log(res.data);
        setScholar(res.data);
    });
  }

  useEffect(()=>{
    getScholar(); 
  },[]);

  return (
    <ScholarContext.Provider value={scholar}>
      <ScholarUpdateContext.Provider value={getScholar}>
        {children}
      </ScholarUpdateContext.Provider>
    </ScholarContext.Provider>
  )
}

export default ScholarProvider;
export { useScholar, useUpdateScholar };
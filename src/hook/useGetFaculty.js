import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../CONSTANTS";

const FacultyContext = React.createContext();
const FacultyUpdateContext = React.createContext();

const useFaculty = () => useContext(FacultyContext);
const useUpdateFaculty = () => useContext(FacultyUpdateContext);

const FacultyProvider = ({children})=>{
  const [faculty, setFaculty] = useState({});

  const getFaculty = async ()=>{
    await axios
    .get(`${BASE_URL}/faculty/profile`, {
        headers: {
        Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token")),
        },
    })
    .then((res) => {
        console.log("skdhjfbvhdksf",res.data);
        setFaculty(res.data);
    });
  }

  useEffect(()=>{
    getFaculty(); 
  },[]);

  return (
    <FacultyContext.Provider value={faculty}>
      <FacultyUpdateContext.Provider value={getFaculty}>
        {children}
      </FacultyUpdateContext.Provider>
    </FacultyContext.Provider>
  )
}

export default FacultyProvider;
export { useFaculty, useUpdateFaculty};
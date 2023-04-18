import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../CONSTANTS';

async function setSupervisor(scholar_id,setScholarData,fullName){
    const res = await axios.put(`${BASE_URL}/update-supervisor/${scholar_id}/${fullName}`, {scholar_id,fullName}, {
		headers: {
			Authorization:
				"Bearer " + JSON.parse(localStorage.getItem("token")),
		}
	});
    console.log(res);
    const newData = await axios.get(`${BASE_URL}/scholar-data`,{
        headers: {
            Authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
    });
    setScholarData(newData.data);
}

function SecondData(props){
    const {flt , msg, setScholarData ,scholar_id} = props;
    const {fullName} = flt;
    return(
        <>
            <h1>{fullName}</h1>
            <h1>{msg}</h1>
            <button onClick={()=>{setSupervisor(scholar_id,setScholarData,fullName)}}>Add As a Suervisor</button>    
        </>
    );
}

export default SecondData;
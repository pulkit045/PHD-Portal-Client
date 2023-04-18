import axios from 'axios';
import * as React from 'react';
import { BASE_URL } from '../CONSTANTS';


async function setSupervisor(_id,setScholarData){
    const res = await axios.put(`${BASE_URL}/update-supervisor/${_id}/`, _id, {
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

function Data(props){
    // console.log(props);
    const { setScholarData } = props; 
    const { request } = props;
    const { _id } = request;
    // console.log(requests_id);
     return (
        <>
            <div>
                <span>{request.supervisor}</span>
                <span>{request.supervisor_status}</span>
                <button onClick={()=>setSupervisor(_id,setScholarData)}>Add as the Supervisor</button>
            </div>
        </>
    );
}

export default Data;
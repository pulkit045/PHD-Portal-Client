import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './CONSTANTS';
import ScholarData  from './components/ScholarData';

function Fic(){
	const [scholar_data , setScholarData] = useState([]);
	useEffect(()=>{
			async function cc(){
				await axios.get(`${BASE_URL}/scholar-data`,{
					headers: {
						Authorization:
							"Bearer " + JSON.parse(localStorage.getItem("token"))
					}
				}).then((res)=>{
					setScholarData(res.data);
				});
			}
			cc();
	},[]);

	return (
		<>
            <ul>{scholar_data.map((data,index) => {return <ScholarData data={data} setScholarData={setScholarData} key={index}/>})}</ul>
			<h1>Faculty Incharge Page</h1>
		</>
	);
}

export default Fic;

import React from 'react';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../CONSTANTS';
import { useUpdateFaculty } from '../hook/useGetFaculty';



function Reject(props){
    const {id} = props;
	const func = useUpdateFaculty();
	async function reject(id) {
		const res = await axios.post(`${BASE_URL}/request/reject/${id}`, id, {
			headers: {
				Authorization:
					"Bearer " + JSON.parse(localStorage.getItem("token")),
			}
		});
		console.log("reject res", res);
		// navigate("/");
		// console.log("Here");
		func();
	}

    return (
        <Avatar 
			sx={{ cursor: "pointer" }}
			onClick={() => {
				reject(id);
			    }
			} 
			src="/images/close.svg" 
		/>
    );

}

export default Reject;
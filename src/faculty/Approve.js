import React from 'react';
import { Avatar } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../CONSTANTS';

import { useUpdateFaculty } from '../hook/useGetFaculty';



function Approve(props){
	const func = useUpdateFaculty();

	async function approve(id) {
		console.log("id", id)
		const res = await axios.post(`${BASE_URL}/request/approve/${id}`, id, {
			headers: {
				Authorization:
					"Bearer " + JSON.parse(localStorage.getItem("token")),
			}
		});
		console.log("approve res", res);
		func();
	}

    const {id} = props;

    return (
        <Avatar sx={{ cursor: "pointer" }} onClick={() => approve(id)} src="/images/check.svg" />
    );

}

export default Approve;
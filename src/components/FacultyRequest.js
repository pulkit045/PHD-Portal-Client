import { Avatar, Box, Grid, Typography } from '@mui/material'
import axios from 'axios'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../CONSTANTS'

async function approve(id) {
	console.log("id", id)
	const res = await axios.post(`${BASE_URL}/request/${id}/approve`, id, {
		headers: {
			Authorization:
				"Bearer " + JSON.parse(localStorage.getItem("token")),
		}
	});
	console.log("approve res", res);
}

async function reject(id) {
	const res = await axios.post(`${BASE_URL}/request/${id}/reject`, id, {
		headers: {
			Authorization:
				"Bearer " + JSON.parse(localStorage.getItem("token")),
		}
	});
	console.log("reject res", res);
}
export default function FacultyRequest(props) {
	return (
		<Box xs={12} sx={{ backgroundColor: "lightgray", borderRadius: "7px", my: 3, mx: "auto" }}>
			<Grid container spacing={2}>
				<Grid item xs={6} sx={{ padding: "7px" }}>
					<Link href={`/scholar/${props.scholar_id}`} variant="body2">
						<Typography sx={{ padding: "7px" }}>
							{props.fullName}
						</Typography>
					</Link>
				</Grid>
				<Grid item xs={3} sx={{ padding: "7px" }}>
					<Avatar sx={{ cursor: "pointer" }} onClick={() => reject(props.request_id)} src="/images/close.svg" />
				</Grid>
				<Grid item xs={3} sx={{ padding: "7px" }}>
					<Avatar sx={{ cursor: "pointer" }} onClick={() => approve(props.request_id)} src="/images/check.svg" />
				</Grid>
			</Grid>
		</Box>
	)
}
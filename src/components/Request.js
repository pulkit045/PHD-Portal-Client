import { Box, Grid, Typography } from '@mui/material'
import * as React from 'react'

export default function Request(props) {
	return (
		<Box xs={12} sx={{ backgroundColor: "lightgray", borderRadius: "7px", my: 3, mx: "auto" }}>
			<Grid container spacing={2}>
				<Grid item xs={6} sx={{ padding: "7px" }}>
					<Typography sx={{ padding: "7px" }}>
						{props.fullName}
					</Typography>
				</Grid>
				<Grid item xs={6} sx={{ padding: "7px" }}>
					<Typography sx={{ padding: "7px" }}>
						{props.status}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	)
}
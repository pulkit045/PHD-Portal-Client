import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FormControl } from '@mui/material';

import { BASE_URL } from '../CONSTANTS';

const facultySignup = async (body) => {
	try {
		const faculty = await axios.post(`${BASE_URL}/auth/faculty/signup`, body);
		console.log(faculty)
	} catch (err) {
		console.error(err)
	}
}

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://linkedin.com/therdt">
				RDT
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignUp() {
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const body = {
			fullName: data.get('fullName'),
			email: data.get('email'),
			password: data.get('password'),
			contactNo: data.get('contact'),
			gender: data.get('gender'),
			program: data.get('program'),
			faculty: data.get('faculty')
		}
		console.log(body);
		const res = facultySignup(body);
		if (res.status === 200) navigate('/');
		else navigate('/404')
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete="given-name"
									name="fullName"
									required
									fullWidth
									id="fulltName"
									label="Full Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="contact"
									label="Contact"
									name="contact"
									autoComplete="contact"
								/>
							</Grid>
							<Grid item xs={4}>
								<FormControl fullWidth>
									<InputLabel id="genderLabel">Gender</InputLabel>
									<Select
										labelId="genderLabel"
										id="gender"
										label="Gender"
										name="gender"
									>
										<MenuItem value={"M"}>M</MenuItem>
										<MenuItem value={"F"}>F</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={4}>
								<TextField
									required
									fullWidth
									id="program"
									label="Program"
									name="program"
									autoComplete='program'
								/>
							</Grid>
							<Grid item xs={4}>
								<FormControlLabel
									control={<Checkbox value="faculty" color="primary" />}
									label="Faculty Sign Up"
									id='faculty'
									name='faculty'
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="sign-in" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
import { Container } from '@mui/material';
import axios from 'axios';
import * as React from 'react'
import FacultyRequest from './components/FacultyRequest';
import Request from './components/Request';
import { BASE_URL } from './CONSTANTS';

async function getFaculty() {
	const res = await axios.get(`${BASE_URL}/faculty/profile`, {
		headers: {
			Authorization:
				"Bearer " + JSON.parse(localStorage.getItem("token")),
		}
	})
	return res.data;
}

export default class Faculty extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			faculty: {}
		}
	}

	componentDidMount() {
		getFaculty().then(data => [
			this.setState({ faculty: data }, () => console.log(this.state.faculty))
		])
	}

	render() {
		return (
			<>
				<Container maxWidth="80%">
					{this.state.faculty?.requests?.map(val => {
						return (val.supervisor_status === "Approved" || val.supervisor_status === "Rejected" ?
							<Request fullName={val.scholar} status={val.supervisor_status} /> :
							<FacultyRequest scholar_id={val.scholar_id} fullName={val.scholar} request_id={val._id} />)
					})}
				</Container>
				<h1>Facluty page</h1>
			</>
		)
	}
}
import { Container } from '@mui/material';
// import axios from 'axios';
import React from 'react';
import Sidebar from './faculty/Sidebar';
// import { useUpdateFaculty } from './hook/useGetFaculty';
// import { BASE_URL } from './CONSTANTS';
// import Sidebar from './faculty/Sidebar';

// async function getFaculty() {
// 	const res = await axios.get(`${BASE_URL}/faculty/profile`, {
// 		headers: {
// 			Authorization:
// 				"Bearer " + JSON.parse(localStorage.getItem("token")),
// 		}
// 	})
// 	return res.data;
// }

// export default class Faculty extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			faculty: {}
// 		}
// 	}

// 	componentDidMount() {
// 		getFaculty().then(data => [
// 			this.setState({ faculty: data }, () => console.log(this.state.faculty))
// 		])
// 	}

// 	render() {
// 		return (
// 			<>
// 				<Container maxWidth="80%">
// 					{this.state.faculty?.requests?.map(val => {
// 						return (val.supervisor_status === "Approved" || val.supervisor_status === "Rejected" ?
// 							<Request fullName={val.scholar} status={val.supervisor_status} /> :
// 							<FacultyRequest scholar_id={val.scholar_id} fullName={val.scholar} request_id={val._id} />)
// 					})}
// 				</Container>
// 				<h1>Facluty page</h1>
// 			</>
// 		)
// 	}
// }

function Faculty(){
	
	return (
		<Container maxWidth="80%">
			<Sidebar/>
			{/* {faculty?.requests?.map(val => {
				return (val.supervisor_status === "Approved" || val.supervisor_status === "Rejected" ?
				<Request fullName={val.scholar} status={val.supervisor_status} /> :
				<FacultyRequest scholar_id={val.scholar_id} fullName={val.scholar} request_id={val._id} />)
			})} */}
		</Container>
	);

}

export default Faculty;
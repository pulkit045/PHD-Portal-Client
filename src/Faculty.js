import { Container } from '@mui/material';
import React from 'react';
import Sidebar from './faculty/Sidebar';


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
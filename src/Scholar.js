// import {
//   Container
// } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./CONSTANTS";
import Sidebar from "./scholar/Sidebar";

function Scholar(props) {
  const {notMtech} = props;
  // console.log(isMtech);
  const [scholar, setScholar] = useState({});
  useEffect(() => {
    async function getScholarData() {
      await axios
        .get(`${BASE_URL}/profile`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          setScholar(res.data);
        });
    }
    getScholarData();
  }, []);

  return (
    // <Container
    //   sx={{
    //     maxWidth: "96%",
    //     backgroundColor: "lightgray",
    //     mt: 10,
    //     borderRadius: "10px",
    //   }}
    //   md={{ maxWidth: "80%" }}
    // >
    <Sidebar scholar={scholar} setScholar={setScholar} notMtech={notMtech}/>
	  // {/* {profile ? <Profile scholar={scholar} /> : requestSupervisor ? <RequestSupervisor scholar={scholar} /> : <Course scholar={scholar}/>} */}
    // </Container>
  );
}

export default Scholar;

//this will be in the profile section :)
// const getScholarData = async () => {
// 	try {
// 		const res = await axios.get(`${BASE_URL}/profile`, {
// 			headers: {
// 				Authorization:
// 					"Bearer " + JSON.parse(localStorage.getItem("token")),
// 			}
// 		});
// 		if (res.status === 200) return res.data;
// 		else return "";
// 	}
// 	catch (err) {
// 		console.error("Error in getting profile", err);
// 		return "";
// 	}
// }

// //this will be in the request supervisor section right
// const getAllFaculties = async () => {
// 	const res = await axios.get(`${BASE_URL}/get-all-faculties`, {
// 		headers: {
// 			Authorization:
// 				"Bearer " + JSON.parse(localStorage.getItem("token")),
// 		}
// 	});
// 	return res.data;
// }

// //same section this will be the post one
// const requestSupervisor = async (data) => {
// 	try {
// 		// console.log(data);
// 		const res = await axios.post(`${BASE_URL}/request-supervisor`, data, {
// 			headers: {
// 				Authorization:
// 					"Bearer " + JSON.parse(localStorage.getItem("token")),
// 			}
// 		});
// 		console.log(res);
// 		// return res.data;
// 	}
// 	catch (err) {
// 		console.error("Error in getting profile", err);
// 		return "";
// 	}
// }

// //this components needed to be converted to functional Component
// export default class Scholar extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			scholar: {},
// 			faculties: []
// 		}
// 	}

// 	componentDidMount() {
// 		getScholarData().then(data => {
// 			// data.courses = ["ACA", "CL"]
// 			this.setState({ scholar: data })
// 		})

// 		getAllFaculties().then(data => {
// 			// console.log(data);
// 			this.setState({ faculties: data })
// 		})
// 	}
// 	render() {
// 		const handleSubmit = async (event) => {
// 			event.preventDefault();
// 			const data = new FormData(event.currentTarget);
// 			const supData = JSON.parse(data.get('supervisor'));
// 			// console.log("supData", supData)
// 			const body = {
// 				supervisor: supData.fullName,
// 				supervisor_id: supData.id,
// 				scholar: this.state.scholar.fullName,
// 				scholar_id: this.state.scholar._id,
// 			}
// 			// console.log(body);
// 			await requestSupervisor(body);
// 			// console.log("request supervisor", res)
// 		};
// 		return (
// 			<Container
// 				sx={{
// 					maxWidth: "96%",
// 					// backgroundColor: "lightgray",
// 					mt: 10,
// 					borderRadius: "10px"
// 				}}
// 				md={{ maxWidth: "80%" }}
// 			>
// 				<Grid container spacing={2} sx={{ backgroundColor: "lightgray", borderRadius: "10px", padding: "20px" }}>
// 					<Grid item xs={12} md={6}>
// 						<Typography id="fullName" variant="h5" my={2}>
// 							{this.state.scholar.fullName}
// 						</Typography>
// 						<Typography id="email" variant="h5" my={2}>
// 							{this.state.scholar.email}
// 						</Typography>
// 						<Typography id="supervisor" variant="h5" my={2}>
// 							Supervisor: {this.state.scholar.supervisor}
// 						</Typography>
// 						<Typography id="courses" variant="h5" my={2}>
// 							Courses: {this.state.scholar.courses?.join(", ")}
// 						</Typography>
// 					</Grid>
// 					<Grid item xs={12} md={6}>
// 						<Typography id="enrollmentNumber" variant="h5" my={2}>
// 							{this.state.scholar.enrollmentNumber}
// 						</Typography>
// 						<Typography id="contactNo" variant="h5" my={2}>
// 							{this.state.scholar.contactNo}
// 						</Typography>
// 						<Typography id="tca" variant="h5" my={2}>
// 							Total Credits Active: {this.state.scholar.total_credits_active}
// 						</Typography>
// 						<Typography id="tcd" variant="h5" my={2}>
// 							Total Credits Done: {this.state.scholar.total_credits_done}
// 						</Typography>
// 					</Grid>
// 				</Grid>
// 				{
// 				//<RequestSupervisor scholar={this.scholar.scholar}/>
// 				(this.state.scholar.supervisor !== "") ? null :
// 				<><Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
// 					<Grid container spacing={2} >
// 						<Grid item xs={6}>
// 							<FormControl fullWidth>
// 								<InputLabel id="supervisorLabel">Faculties</InputLabel>
// 								<Select
// 									labelId="supervisorLabel"
// 									id="supervisor"
// 									label="Supervisor"
// 									name="supervisor"
// 								>
// 									{
// 										this.state.faculties?.map(faculty => {
// 											return (
// 												<MenuItem value={JSON.stringify({ id: faculty._id, fullName: faculty.fullName })}>
// 													{faculty.fullName}
// 												</MenuItem>
// 											)
// 										})
// 									}
// 								</Select>
// 							</FormControl>
// 						</Grid>
// 						<Grid item xs={6}>
// 							<Button
// 								type="submit"
// 								fullWidth
// 								variant="contained"
// 								sx={{ mt: 2, mb: 2 }}
// 							>
// 								Request Supervisor
// 							</Button>
// 						</Grid>
// 					</Grid>
// 				</Box>
// 				<Box>
// 					{this.state.scholar?.requests?.map(val => {
// 						return (
// 							<Request fullName={val.supervisor} status={val.supervisor_status} />
// 						)
// 					})}
// 				</Box></>}
// 			</Container >
// 		)
// 	}
// }

// functional component for the same

//why this is not working could not get it : (

import {
  Grid,
  Typography,
} from "@mui/material";
// import axios from "axios";
import React from "react";
import { useEffect } from "react";

function Profile(props) {
  const { scholar } = props;

  useEffect(()=>{
    if(localStorage.getItem("shouldLoad")===null){
      localStorage.setItem("shouldLoad",true);
      window.location.reload(true);
    }
  },[]);

  return (
    // <>
    <Grid
      container
      spacing={2}
      // sx={{
      //   // backgroundColor: "lightgray",
      //   borderRadius: "10px",
      //   padding: "20px",
      // }}
    >
      <Grid item xs={12} md={6}>
        <Typography id="fullName" variant="h5" my={2}>
          {scholar.fullName}
        </Typography>
        <Typography id="email" variant="h5" my={2}>
          {scholar.email}
        </Typography>
        <Typography id="supervisor" variant="h5" my={2}>
          Supervisor: {scholar.supervisor}
        </Typography>
        <Typography id="courses" variant="h5" my={2}>
          Courses: {scholar.courses?.join(", ")}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography id="enrollmentNumber" variant="h5" my={2}>
          {scholar.enrollmentNumber}
        </Typography>
        <Typography id="contactNo" variant="h5" my={2}>
          {scholar.contactNo}
        </Typography>
        <Typography id="tca" variant="h5" my={2}>
          Total Credits Active: {scholar.total_credits_active}
        </Typography>
        <Typography id="tcd" variant="h5" my={2}>
          Total Credits Done: {scholar.total_credits_done}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Profile;

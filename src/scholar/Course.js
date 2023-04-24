import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../CONSTANTS";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// for sending course from active list to completed list
async function removeFromActive(_id, setData) {
  // console.log(_id);
  let config = {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const res = await axios.patch(
    `${BASE_URL}/courses/scholar/update-courses`,
    { course_id: _id },
    config
  );

  await axios
    .get(`${BASE_URL}/courses/scholar/get-all-courses`, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((res) => {
      //   console.log(res.data);
      setData(res.data);
    });
  console.log("approve res", res);
}

// for sending course from not taken till now to active lsit

async function addToActive(_id, setCourses, setData) {
  let config = {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };
  const res = await axios.patch(
    `${BASE_URL}/courses/scholar/add-courses`,
    { course_id: _id },
    config
  );

  await axios
    .get(`${BASE_URL}/courses/scholar/get-courses`, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((res) => {
      setCourses(res.data);
    });

  await axios
    .get(`${BASE_URL}/courses/scholar/get-all-courses`, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    })
    .then((res) => {
      //   console.log(res.data);
      setData(res.data);
    });

  console.log("moved to active", res);
}

//creating data for active data and also for courses to be taken
function createDataActive(_id, course_name, course_credits, fullName) {
  return { _id, course_name, course_credits, fullName };
}

//creating data for completed list
function createDataCompleted(course_name, course_credits, fullName) {
  return { course_name, course_credits, fullName };
}

function Course() {
  const [data, setData] = useState({});
  const [rowscourses, setRowsCourses] = useState([]);
  const [rowsactive, setRowsActive] = useState([]);
  const [fetchData, setFetchData] = useState(true);
  const [rowscompleted, setRowsCompleted] = useState([]);
  const [activelength, setActiveLength] = useState(false);
  const [completedlength, setCompletedLength] = useState(false);
  const [courselength, setCourseLength] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function getAllCourses() {
      await axios
        .get(`${BASE_URL}/courses/scholar/get-all-courses`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          setData(res.data);
        });
    }

    async function getCourses() {
      await axios
        .get(`${BASE_URL}/courses/scholar/get-courses`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          setCourses(res.data);
        });
    }

    //this done for preventing the infinite loop
    if (fetchData) {
      getAllCourses();
      getCourses();
      setFetchData(false);
    }

    //this one for course_active and completed
    if (data !== "undefined" && data) {
      console.log(data);
      if (data.course_active !== "undefined" && data.course_active) {
        const newActiveRows = [];
        data.course_active.forEach((course) => {
          const dt = createDataActive(
            course._id,
            course.course_name,
            course.course_credits,
            course.faculty_id.fullName
          );
          newActiveRows.push(dt);
        });
        if (newActiveRows.length > 0) setActiveLength(true);
        else setActiveLength(false);
        setRowsActive(newActiveRows);
      }
      if (data.course_completed !== "undefined" && data.course_completed) {
        const newCompletedRows = [];
        data.course_completed.forEach((course) => {
          const dt = createDataCompleted(
            course.course_name,
            course.course_credits,
            course.faculty_id.fullName
          );
          newCompletedRows.push(dt);
        });
        if (newCompletedRows.length > 0) setCompletedLength(true);
        else setCompletedLength(false);
        setRowsCompleted(newCompletedRows);
      }
    }
    //this one for course list
    if (courses !== "undefined" && courses) {
      const newCourses = [];
      courses.forEach((course) => {
        const dt = createDataActive(
          course._id,
          course.course_name,
          course.course_credits,
          course.faculty_id.fullName
        );
        newCourses.push(dt);
      });
      if (newCourses.length > 0) setCourseLength(true);
      else setCourseLength(false);
      setRowsCourses(newCourses);
    }
  }, [fetchData, data, courses]);

  return (
    <>
      {courselength ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <caption style={{ width: "inherit" }}>
              Remaining Courses Available
            </caption>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Course Name</StyledTableCell>
                <StyledTableCell align="center">Faculty Name</StyledTableCell>
                <StyledTableCell align="center">Course Credits</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowscourses.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.course_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.course_credits}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      onClick={() => addToActive(row._id, setCourses, setData)}
                    >
                      {" "}
                      Add this course{" "}
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No More Courses Available for this Semester</Typography>
      )}
      {activelength ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <caption style={{ width: "inherit" }}>
              Courses currently active{" "}
            </caption>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Course Name</StyledTableCell>
                <StyledTableCell align="center">Faculty Name</StyledTableCell>
                <StyledTableCell align="center">Course Credits</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsactive.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.course_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.course_credits}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button onClick={() => removeFromActive(row._id, setData)}>
                      {" "}
                      Completed It !!{" "}
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No Active Courses</Typography>
      )}
      {completedlength ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <caption style={{ width: "inherit" }}>
              Courses you have completed till now
            </caption>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Course Name</StyledTableCell>
                <StyledTableCell align="center">Faculty Name</StyledTableCell>
                <StyledTableCell align="center">Course Credits</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowscompleted.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.course_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.course_credits}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No Completed Course</Typography>
      )}
    </>
  );
}

export default Course;

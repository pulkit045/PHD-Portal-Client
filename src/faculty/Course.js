import React, { useState, useEffect } from "react";
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
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import InnerData from './InnerData';
// import { useScrollTrigger } from '@mui/material';

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

function createDataUpper(course_name, course_credits, scholars_enrolled) {
  return { course_name, course_credits, scholars_enrolled };
}



function Row(props) {
  const { row } = props;
  // console.log(row);
  const [open, setOpen] = useState(false);
  // const checker = (row.scholars_enrolled !== 'undefined' && (row.scholars_enrolled && row.scholars_enrolled.length > 0));
  // console.log(checker);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="center">{row.course_name}</StyledTableCell>
        <StyledTableCell align="center">{row.course_credits}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <InnerData scholars_enrolled={row.scholars_enrolled} />
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

function Course() {
  const [data, setData] = useState([]);
  const [fetchdata, setFetchData] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function getAllCourses() {
      await axios
        .get(`${BASE_URL}/courses/faculty/get-all-courses`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          console.log(data);
          setData(res.data);
        });
    }

    if (fetchdata) {
      getAllCourses();
      setFetchData(false);
    }

    if (data !== "undefined" && data) {
      const newRows = [];
      data.forEach((course) => {
        const dt = createDataUpper(
          course.course_name,
          course.course_credits,
          course.scholars_enrolled
        );
        newRows.push(dt);
      });

      setRows(newRows);
    }
  }, [data, fetchdata]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="center">Course Name</StyledTableCell>
            <StyledTableCell align="center">Course Credits</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Course;

// some errors in data fetching and in the component building as well 

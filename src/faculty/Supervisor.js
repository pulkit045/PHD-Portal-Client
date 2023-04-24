import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Approve from "./Approve.js";
import Reject from "./Reject.js";
import { useFaculty } from "../hook/useGetFaculty";
// import axios from "axios";
// import { BASE_URL } from "../CONSTANTS.js";
// import { convertLength } from "@mui/material/styles/cssUtils.js";
// import FacultyRequest from "./FacultyRequest";

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

function createDataPending(fullName, accept, reject, scholar_id, request_id) {
  return { fullName, accept, reject, scholar_id, request_id };
}

function createDataOther(fullName, supervisor_status) {
  return { fullName, supervisor_status };
}

function Supervisor() {
  const faculty = useFaculty();
  const [rowsPending, setRowsPending] = useState([]);
  const [rowsDone, setRowsDone] = useState([]);

  useEffect(() => {
    if (typeof faculty !== "undefined" && faculty) {
      if (typeof faculty.requests !== "undefined" && faculty.requests) {
        const newRowPending = [];
        const newRowDone = [];
        faculty.requests.forEach((element) => {
          if (
            element.supervisor_status === "Approved" ||
            element.supervisor_status === "Rejected"
          ) {
            const dt = createDataOther(
              element.scholar,
              element.supervisor_status
            );
            newRowDone.push(dt);
          } else {
            const dt = createDataPending(
              element.scholar,
              "Accept",
              "Reject",
              element.scholar_id,
              element._id
            );
            newRowPending.push(dt);
          }
        });

        // const prevRowsDone = rowsDone;
        // const prevRowsPending = rowsPending;

        setRowsDone(newRowDone);
        setRowsPending(newRowPending);
      }
    }
    if (localStorage.getItem("shouldLoad") === null) {
      localStorage.setItem("shouldLoad", true);
      window.location.reload(true);
    }
  }, [faculty]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <caption sx={{ minWidth: 700 }}>Request Left to decide</caption>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Scholar Name</StyledTableCell>
              <StyledTableCell align="center">Accept</StyledTableCell>
              <StyledTableCell align="center">Reject</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsPending.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">
                  <Link href={`/scholar/${row.scholar_id}`} variant="body2">
                    <Typography sx={{ padding: "7px" }}>
                      {row.fullName}
                    </Typography>
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Approve id={row.request_id} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Reject id={row.request_id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <caption sx={{ minWidth: 700 }}>
            Request you have already responded to
          </caption>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Scholar Name</StyledTableCell>
              <StyledTableCell align="center">
                Supervisor Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsDone.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{row.fullName}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.supervisor_status}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Supervisor;

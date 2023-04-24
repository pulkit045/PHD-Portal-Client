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

function createData(fullName, enrollmentNumber, supervisor) {
  return { fullName, enrollmentNumber, supervisor };
}

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

function ScholarSupervisor() {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [fetchdata, setFetchData] = useState(true);

  useEffect(() => {
    async function getScholarSupervisorData() {
      await axios
        .get(`${BASE_URL}/examcell/get-scholar-supervisor-data`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        });
    }
    if (fetchdata) {
      getScholarSupervisorData();
      setFetchData(false);
    }

    if (data !== "undefined" && data) {
      const newRows = [];
      data.forEach((scholar) => {
        const dt = createData(
          scholar.fullName,
          scholar.enrollmentNumber,
          scholar.supervisor
        );
        newRows.push(dt);
      });
      setRows(newRows);
    }
  }, [data, fetchdata]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <caption style={{ width: "inherit" }}>
          List of Scholars and their corresponding Supervisor
        </caption>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Scholar Name</StyledTableCell>
            <StyledTableCell align="center">
              Scholar Enrollment Number
            </StyledTableCell>
            <StyledTableCell align="center">Supervisor Name</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{row.fullName}</StyledTableCell>
              <StyledTableCell align="center">
                {row.enrollmentNumber}
              </StyledTableCell>
              <StyledTableCell align="center">{row.supervisor}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScholarSupervisor;

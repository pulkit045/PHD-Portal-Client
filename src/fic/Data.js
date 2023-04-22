import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../CONSTANTS";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(supervisor, supervisor_status, _id, setScholarData) {
  return { supervisor, supervisor_status, _id, setScholarData };
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

async function setSupervisor(_id, setScholarData ,setIsSupervisor) {
  const res = await axios.put(`${BASE_URL}/update-supervisor/${_id}/`, _id, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
  console.log(res);
  const newData = await axios.get(`${BASE_URL}/scholar-data`, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
  setScholarData(newData.data);
  setIsSupervisor(true);
}

function Data(props) {

//   console.log(props);
  const { setIsSupervisor } = props
  const { setScholarData } = props;
  const { requests } = props;

  const [rows, setRows] = useState([]);
  const [isShow , setIsShow] = useState(false);

  useEffect(() => {
    const newRows = [];
    requests.forEach((request) => {
      const dt = createData(
        request.supervisor,
        request.supervisor_status,
        request._id,
        setScholarData
      );
      console.log(dt);
      newRows.push(dt);
    });
    if(newRows.length !== 0)
        setIsShow(true);
    else
        setIsShow(false);
    setRows(newRows);
  });

  // yahan check lagana hain that ki whether show karna hain yaa nhi :) 

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Faculty Name</StyledTableCell>
            <StyledTableCell align="center">Faculty Status</StyledTableCell>
            <StyledTableCell align="right"> Actions </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="left">{row.supervisor}</StyledTableCell>
              <StyledTableCell align="center">{row.supervisor_status}</StyledTableCell>
              <StyledTableCell align="right">
                <button onClick={()=> setSupervisor(row._id , row.setScholarData , setIsSupervisor)}> Add As Supervisor </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Data;

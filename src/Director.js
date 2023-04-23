import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from './CONSTANTS';

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


function createDataNotAssigned(fullName , enrollmentNumber){
    return {fullName , enrollmentNumber};
}

function createDataAssigned(fullName , enrollmentNumber , supervisor){
    return {fullName , enrollmentNumber , supervisor};
}

function Director(){
    const [data , setData] = useState([]);
    const [rowsassigned , setRowsAssigned] = useState([]);
    const [rowsnotassigned , setRowsNotAssigned] = useState([]);
    const [lengthassigned , setLengthAssigned] = useState(true);
    const [lengthnotassigned , setLengthNotAssigned] = useState(true);
    const [fetchdata , setFetchData] = useState(true);

    useEffect(()=>{

        async function getAllSupervisor() {
            await axios
              .get(`${BASE_URL}/get-all-supervisor`, {
                headers: {
                  Authorization:
                    "Bearer " + JSON.parse(localStorage.getItem("token")),
                },
              })
              .then((res) => {
                setData(res.data);
              });
          }
          
          if(fetchdata){
            getAllSupervisor();
            setFetchData(false);
          }

          if(data !== 'undefined' && data){
            if(data.supervisor_notassigned !== 'undefined' && data.supervisor_notassigned){
                const newrowsnotassigned = [];
                data.supervisor_notassigned.forEach(scholar => {
                    const dt = createDataNotAssigned(scholar.fullName , scholar.enrollmentNumber);
                    newrowsnotassigned.push(dt);
                });
                console.log(newrowsnotassigned);
                if(newrowsnotassigned.length > 0)
                    setLengthNotAssigned(true);
                else
                    setLengthNotAssigned(false);
                setRowsNotAssigned(newrowsnotassigned);
            }
            if(data.supervisor_assigned !== 'undefined' && data.supervisor_assigned){
                const newrowsassigned = [];
                data.supervisor_assigned.forEach(scholar => {
                    const dt = createDataAssigned(scholar.fullName , scholar.enrollmentNumber ,scholar.supervisor);
                    newrowsassigned.push(dt);
                });
                console.log(newrowsassigned);
                if(newrowsassigned.length > 0)
                    setLengthAssigned(true);
                else
                    setLengthAssigned(false);

                setRowsAssigned(newrowsassigned);
            }


          }


    },[]);

    return (

        <>
        {lengthassigned ? <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Scholar Name</StyledTableCell>
                <StyledTableCell align="center">EnrollMent Number</StyledTableCell>
                <StyledTableCell align="center">Supervisor Name</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsassigned.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.enrollmentNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.supervisor}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : <Typography></Typography>}

        {lengthnotassigned ? <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Scholar Name</StyledTableCell>
                <StyledTableCell align="center">EnrollMent Number</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsnotassigned.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.enrollmentNumber}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : <Typography>All Scholars have been assigned a Supervisor</Typography>}

        </>
    );
}

export default Director;
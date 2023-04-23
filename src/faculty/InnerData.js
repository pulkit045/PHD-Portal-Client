import React, { useState, useEffect } from "react";

//now it's working Fine 

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

function createInnerData(fullName, enrollmentNumber) {
  return { fullName, enrollmentNumber };
}

function InnerData(props) {
  const { scholars_enrolled } = props;
  const [rows, setRows] = useState([]);
  const intialize = scholars_enrolled.length > 0;
  console.log(intialize);
  const [length, setLength] = useState(intialize);

  useEffect(() => {
    const newRows = [];
    scholars_enrolled.forEach((scholar) => {
      const dt = createInnerData(scholar.fullName, scholar.enrollmentNumber);
      newRows.push(dt);
    });
    if (newRows.length > 0 && !length) setLength(true);
    else if (newRows.length === 0 && length) setLength(false);
    setRows(newRows);
  }, [length]);

  return (
    <>
      {length ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Scholar Name</StyledTableCell>
                <StyledTableCell align="center">
                  Enrollment Number
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
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
        </TableContainer>
      ) : (
        <Typography>No scholars enorlled</Typography>
      )}
    </>
  );
}

export default InnerData;

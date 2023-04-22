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

function createData(scholar_id, setScholarData, fullName) {
  return { scholar_id, setScholarData, fullName };
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

async function setSupervisor(scholar_id, setScholarData, fullName, setIsSupervisor) {
  const res = await axios.put(
    `${BASE_URL}/update-supervisor/${scholar_id}/${fullName}`,
    { scholar_id, fullName },
    {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    }
  );
  console.log(res);
  const newData = await axios.get(`${BASE_URL}/scholar-data`, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });
  setScholarData(newData.data);
  setIsSupervisor(true);
}

function SecondData(props) {
  const { flt_nin, setScholarData, scholar_id ,setIsSupervisor } = props;
  const [rows, setRows] = useState([]);
  const [isShow, setIsShow] = useState(false);
  console.log(flt_nin);

  useEffect(() => {
    const newRows = [];
    flt_nin.forEach((flt) => {
      const dt = createData(scholar_id, setScholarData, flt.fullName);
      newRows.push(dt);
    });

    if (newRows.length !== 0) setIsShow(true);
    else setIsShow(false);
    setRows(newRows);
  });

  // yahan bhi check karna hain wether it's showing data properly : )
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Faculty Name</StyledTableCell>
            <StyledTableCell align="right"> Actions </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="left">{row.fullName}</StyledTableCell>
              <StyledTableCell align="right">
                <button
                  onClick={() =>
                    setSupervisor(
                      row.scholar_id,
                      row.setScholarData,
                      row.fullName,
                      setIsSupervisor
                    )
                  }
                >
                  {" "}
                  Add As Supervisor{" "}
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SecondData;

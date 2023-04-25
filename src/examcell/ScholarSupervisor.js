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
// import {XLSX} from 'xlsx';
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

const styles = {
  dis : {
    margin : "0 auto",
    marginTop : "50px",
    disabled : "true"
  },
  nondis : {
    
    margin : "0 auto",
    marginTop : "50px",

  }
}

function ScholarSupervisor() {
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const [isDownloadable , setIsDownloadable] = useState(false);
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
          setData(res.data.data);
          setIsDownloadable(res.data.isDownloadable);
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

  // function downloadExcel(){
  //   const workSheet = XLSX.utils.json_to_sheet(rows);
  //   const workBook = XLSX.utils.book_new();
  
  //   XLSX.utils.book_append_sheet(workBook,workSheet,'Scholar - Supervisor Data');
  //   //Buffer
  //   let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"});
  //   //Binary String
  //   XLSX.write(workBook,{bookType:"xlsx",type:"binary"});
  //   //Download
  //   XLSX.writeFile(workBook,"ScholarSupervisorData.xlsx")
  // }

  return (
    <>
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

    {isDownloadable ? <button style={styles.nondis}> Download the File </button> : <button style={styles.dis}>Download the File</button>}
    </>
  );
}

export default ScholarSupervisor;

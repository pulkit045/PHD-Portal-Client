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
import { Typography } from "@mui/material";

function createData(scholar_id, setScholarData, fullName, supervisor_id) {
  return { scholar_id, setScholarData, fullName, supervisor_id };
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

async function setSupervisor(
  scholar_id,
  setScholarData,
  fullName,
  setIsDirector,
  setOpen,
  supervisor_id
) {
  const res = await axios.patch(
    `${BASE_URL}/director/finalize-supervisor-request/${scholar_id}/${supervisor_id}/${fullName}`,
    { scholar_id, supervisor_id, fullName },
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
  setIsDirector(true);
  setOpen(false);
}

function SecondData(props) {
  const { flt_nin, setScholarData, scholar_id, setIsDirector, setOpen } = props;
  console.log(flt_nin);
  const [rows, setRows] = useState([]);
  const intialize = flt_nin.length > 0;
  const [isShow, setIsShow] = useState(intialize);
  // console.log(flt_nin);

  useEffect(() => {
    const newRows = [];
    flt_nin.forEach((flt) => {
      const dt = createData(
        scholar_id,
        setScholarData,
        flt.fullName,
        flt._id
      );
      newRows.push(dt);
    });

    if (newRows.length !== 0) setIsShow(true);
    else setIsShow(false);
    setRows(newRows);
  }, [isShow]);

  // yahan bhi check karna hain wether it's showing data properly : )
  return (
    <>
      {intialize ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <caption style={{ width: "inherit" }}>
              Faculties to whom request is not sent
            </caption>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Faculty Name</StyledTableCell>
                <StyledTableCell align="center"> Actions </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">
                    {row.fullName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <button
                      onClick={() =>
                        setSupervisor(
                          row.scholar_id,
                          row.setScholarData,
                          row.fullName,
                          setIsDirector,
                          setOpen,
                          row.supervisor_id
                        )
                      }
                    >
                      {" "}
                      Finalize Supervisor{" "}
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>No more No request send Faculties</Typography>
      )}
    </>
  );
}

export default SecondData;

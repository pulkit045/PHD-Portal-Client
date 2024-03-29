import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./CONSTANTS";

// import ScholarData from "./fic/ScholarData";

// import PropTypes from 'prop-types';
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

import Data from "./fic/Data";
import SecondData from "./fic/SecondData";
// removing the need for the scholar data wala part :

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

function createData(
  firstName,
  enrollmentNumber,
  supervisor,
  _id,
  requests,
  flt_nin,
  setScholarData,
  isDirector
) {
  return {
    firstName,
    enrollmentNumber,
    supervisor,
    _id,
    requests,
    flt_nin,
    setScholarData,
    isDirector,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const intialize = row.supervisor.length > 0;
  const [isSupervisor, setIsSupervisor] = useState(intialize);
  console.log(row, isSupervisor);
  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {row.isDirector || isSupervisor ? null : open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell align="left">{row.firstName}</StyledTableCell>
        <StyledTableCell align="center">{row.enrollmentNumber}</StyledTableCell>
        <StyledTableCell align="center">{row.supervisor}</StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Data
                requests={row.requests}
                setScholarData={row.setScholarData}
                setIsSupervisor={setIsSupervisor}
                setOpen={setOpen}
              />
              <SecondData
                flt_nin={row.flt_nin}
                scholar_id={row._id}
                setScholarData={row.setScholarData}
                setIsSupervisor={setIsSupervisor}
                setOpen={setOpen}
              />
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

function Fic() {
  const [scholar_data, setScholarData] = useState([]);
  const [rows, setRows] = useState([]);
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    async function cc() {
      await axios
        .get(`${BASE_URL}/scholar-data`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          // console.log(res.data);
          setScholarData(res.data);
        });
    }
    if (fetchData) {
      cc();
      setFetchData(false);
    }
  }, [fetchData]);

  useEffect(() => {
    if (scholar_data !== "undefined" && scholar_data) {
      const newRows = [];
      scholar_data.forEach((data) => {
        const dd = createData(
          data.dt.firstName,
          data.dt.enrollmentNumber,
          data.dt.supervisor,
          data.dt._id,
          data.dt.requests,
          data.flt_nin,
          setScholarData,
          data.dt.isDirector
        );
        newRows.push(dd);
      });
      setRows(newRows);
    }
  }, [scholar_data]);

  return (
    <TableContainer component={Paper} sx={{ minWidth: 700 }}>
      <Table aria-label="collapsible table">
        <caption style={{ width: "inherit" }}>List of All Scholars</caption>
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell align="cneter">Scholar Name</StyledTableCell>
            <StyledTableCell align="center">Enrollment Number</StyledTableCell>
            <StyledTableCell align="center">Supervisor</StyledTableCell>
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

export default Fic;

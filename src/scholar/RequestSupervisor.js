import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useEffect, useState } from "react";
import { BASE_URL } from "../CONSTANTS";
import { useScholar, useUpdateScholar } from "../hook/useGetScholar";

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

//same section this will be the post one
const requestSupervisor = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/request-supervisor`, data, {
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
      },
    });
    console.log(res);
  } catch (err) {
    console.error("Error in getting profile", err);
    return "";
  }
};

function createData(supervisor, supervisor_status) {
  return { supervisor, supervisor_status };
}

function RequestSupervisor(props) {
  const [faculties, setFaculties] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const func = useUpdateScholar();
  const scholar = useScholar();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (typeof scholar !== "undefined" && scholar) {
      if (typeof scholar.requests !== "undefined" && scholar.requests) {
        const newRows = [];
        scholar.requests.forEach((val) => {
          const dt = createData(val.supervisor, val.supervisor_status);
          newRows.push(dt);
        });
        // const prevRows = rows;
        setRows(newRows);
        
      }
    }
    
  }, [scholar]);

  // const [isReq,setIsReq] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const supData = JSON.parse(data.get("supervisor"));
    // console.log("supData", supData)
    const body = {
      //here what we were taking is being passed on right : )
      supervisor: supData.fullName,
      supervisor_id: supData.id,
      scholar: scholar.fullName,
      scholar_id: scholar._id,
    };
    await requestSupervisor(body);
    setNameValue("");
    func();
  };

  useEffect(() => {
    async function getAllFaculties() {
      await axios
        .get(`${BASE_URL}/get-all-faculties`, {
          headers: {
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          setFaculties(res.data);
        });
    }
    getAllFaculties();
  }, [rows]);
  
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="supervisorLabel">Faculties</InputLabel>
              <Select
                labelId="supervisorLabel"
                id="supervisor"
                label="Supervisor"
                name="supervisor"
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              >
                {faculties.map((faculty, index) => {
                  return (
                    <MenuItem
                      key={index}
                      value={JSON.stringify({
                        id: faculty._id,
                        fullName: faculty.fullName,
                      })}
                    >
                      {faculty.fullName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Request Supervisor
            </Button>
          </Grid>
        </Grid>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Supervisor Name</StyledTableCell>
              <StyledTableCell align="right">Supervisor Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{row.supervisor}</StyledTableCell>
                <StyledTableCell align="right">
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

export default RequestSupervisor;
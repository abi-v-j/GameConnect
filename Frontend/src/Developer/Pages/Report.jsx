import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import axios from "axios";

const Report = () => {
  const textFieldStyle = { marginBottom: 1, backgroundColor: "#FAFAFA" };
  const paperStyle = {
    padding: "30px 20px",
    width: 300,
    margin: "20px auto",
    height: "auto",
  };
  const typoStyle = {
    fontFamily: "Segoe UI",
    color: "grey",
    fontSize: "16px",
    fontWeight: "bold",
    paddingTop: "10px",
  };
  const mainTextStyle = {
    margin: 5,
    fontFamily: "cursive",
    fontSize: "2rem",
    color: "#36454F",
    paddingBottom: "10px",
  };

  const [title,setTitle]=useState('');
  const [details,setDetails]=useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data={
        reportTitle:title,
        reportDetails:details,
        userId:'65cf096e4d3399b3376d6b84',
    }

    axios.post("http://localhost:5000/addreport",data).then((res)=>{
        console.log(res.data);

    })

  };


  return (
    <Box>
      <Paper
        elevation={2}
        sx={paperStyle}
        variant="outlined"
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Grid align="center" marginBottom={"50px"}>
          <ReportGmailerrorredIcon style={{ fontSize: "50px" }} />
          <h2 style={mainTextStyle}>TravelConnect</h2>
          <Typography variant="h7" style={typoStyle} >
            Report An Account
          </Typography>
        </Grid>
        <Grid align="left">
          <Typography variant="h7" style={typoStyle}>
            Report Title
          </Typography>
          <TextField fullWidth sx={textFieldStyle} onChange={(e)=>setTitle(e.target.value)} value={title} />
          <Typography variant="h7" style={typoStyle}>
            Report Reason
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            sx={textFieldStyle}
            fullWidth
            onChange={(e)=>setDetails(e.target.value)} 
            value={details}
          />

          <Grid sx={{ margin: 1 }}>
            <Typography variant="h7" color={"grey"}>
              By reporting, you agree to our Terms , Privacy Policy and Cookies
              Policy .
            </Typography>
          </Grid>
          <br />
          <Button
            type="submit"
            xfullWidth
            variant="contained"
            sx={{ marginBottom: "10px" }}
          >
            <span style={{ fontWeight: "bold" }}> Report</span>
          </Button>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Report;

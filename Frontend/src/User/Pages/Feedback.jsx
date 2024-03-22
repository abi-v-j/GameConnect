import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import axios from "axios";

const Feedback = () => {
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

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      feedbackTitle: title,
      feedbackDetails: details,
      userId: "65cf096e4d3399b3376d6b84",
    };
    axios.post("http://localhost:5000/addfeedback", data).then((res) => {
      console.log(res.data);
    });
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
          <SentimentVeryDissatisfiedIcon />
          <SentimentSatisfiedIcon />
          <TagFacesIcon />
          <h2 style={mainTextStyle}>TravelConnect</h2>
          <Typography variant="h7" style={typoStyle}>
            Feedback
          </Typography>
        </Grid>
        <Grid align="left">
          <Typography variant="h7" style={typoStyle}>
            Feedback Subject
          </Typography>
          <TextField
            fullWidth
            sx={textFieldStyle}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Typography variant="h7" style={typoStyle}>
            Message
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            sx={textFieldStyle}
            fullWidth
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />

          <br />
          <br />
          <Box align="center">
            <Button
              type="submit"
              xfullWidth
              variant="contained"
              sx={{ marginBottom: "10px" }}
            >
              <span style={{ fontWeight: "bold" }}> Submit</span>
            </Button>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Feedback;

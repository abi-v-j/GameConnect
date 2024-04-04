import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Editprofile = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");


  const did = sessionStorage.getItem("did");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: fullName,
     email,
     
    };
    axios.put("http://localhost:5000/Developer/" + did, data).then((res) => {
      console.log(res.data);
    });
  };

  const fetchData = () => {
    axios.get("http://localhost:5000/Developer/" + did).then((res) => {
      setFullName(res.data.name);
      setEmail(res.data.email);
     
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Box padding={5}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ flexDirection: "column" }}>
            <Avatar
              sx={{ bgcolor: "secondary.main", width: 100, height: 100 }}
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            ></Avatar>
           
          </Box>
        </Box>
        <Divider />
        <Box sx={{ m: 5 }} component={"form"} onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Name</Typography>
            <TextField
              id="standard-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Email</Typography>
            <TextField
              id="standard-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Box>
          
          <Box display={"flex"} justifyContent={"center"} margin={"20px"}>
            <Button
              type="submit"
              sx={{ marginLeft: "30px" }}
              variant="contained"
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Editprofile;

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
  const [userName, setUserName] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");

  const uid = sessionStorage.getItem("uid");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userFullName: fullName,
      userName: userName,
      userContact: contact,
      userGender: gender,
    };
    axios.put("http://localhost:5000/user/" + uid, data).then((res) => {
      console.log(res.data);
    });
  };

  const fetchData = () => {
    axios.get("http://localhost:5000/user/" + uid).then((res) => {
      setFullName(res.data.userFullName);
      setUserName(res.data.userName);
      setContact(res.data.userContact);
      setGender(res.data.userGender);
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
            <p style={{ marginLeft: "0", marginBottom: "45px" }}>
              Change Profile Picture
            </p>
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
            <Typography sx={{ width: "80px" }}>Username</Typography>
            <TextField
              id="standard-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
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
            <Typography sx={{ width: "80px" }}>Bio</Typography>
            <TextField
              id="standard-basic"
              variant="outlined"
              multiline
              sx={{ width: "250px" }}
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
            <Typography sx={{ width: "80px" }}>Contact</Typography>
            <TextField
              id="standard-basic"
              variant="outlined"
              sx={{ width: "250px" }}
              onChange={(e) => setContact(e.target.value)}
              value={contact}
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
            <Typography sx={{ width: "80px" }}>Gender</Typography>
            <FormControl sx={{ width: "250px" }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <MenuItem value={'Male'} >Male</MenuItem>
                <MenuItem value={'Female'} >Female</MenuItem>
                <MenuItem value={'Other'} >Other</MenuItem>
              </Select>
            </FormControl>
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

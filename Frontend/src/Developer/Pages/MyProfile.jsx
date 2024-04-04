import { Avatar, Box, Button, Card, CardMedia, Divider, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const [data, setData] = useState("");
  const [MyGame, setMyGame] = useState([]);

  const uid = sessionStorage.getItem("uid");

  const fetchData = () => {
    axios.get("http://localhost:5000/user/" + uid).then((res) => {
      console.log(res.data);
      setData(res.data);
    });

  };

  const fetchGameData = () => {
    axios.get("http://localhost:5000/ReviewHead/" + uid).then((res) => {
      console.log(res.data);
      setMyGame(res.data);
    });

  };





  useEffect(() => {
    fetchData();
    fetchGameData()
  }, []);
  return (
    <div>
      <Box padding={"60px"}>
        <Box display={"flex"}>
          <Box>
            {/* <Avatar
              sx={{ width: "150px", height: "150px" }}
              alt="Remy Sharp"
              src={"https://material-ui.com/static/images/avatar/1.jpg"}
            ></Avatar> */}
            {data.userPhoto ? (
              <Avatar
                sx={{ width: "150px", height: "150px" }}
                src={data.userPhoto}
              ></Avatar>
            ) : (
              <Avatar
                sx={{ bgcolor: "red", width: "150px", height: "150px" }}
                aria-label="recipe"
              >
                {data.userFullName}
              </Avatar>
            )}
          </Box>
          <Box paddingLeft={"50px"}>
            <Box display={"flex"}>
              <Typography variant="h5" fontWeight={"bold"}>
                @ {data.userName}
              </Typography>
              <Button sx={{ marginLeft: "30px" }} variant="contained">
                <Link
                  to="/Developer/editprofile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Edit Profile
                </Link>
              </Button>

              <Button sx={{ marginLeft: "30px" }} variant="contained">
                <Link to={'/Developer/changepassword'}
                  style={{ textDecoration: "none", color: "inherit" }}>
                  Change Password
                </Link>
              </Button>
              
            </Box>
            <Box display={"flex"} paddingTop={"30px"}>


            </Box>
            <Typography
              variant="h6"
              sx={{ paddingTop: "20px", fontWeight: "bold" }}
            >
              {data.userFullName}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "15px", color: "grey" }}>
              Creator
            </Typography>
            <Box>

            </Box>
          </Box>
        </Box>
      </Box>
     
     
    </div>
  );
};

export default MyProfile;

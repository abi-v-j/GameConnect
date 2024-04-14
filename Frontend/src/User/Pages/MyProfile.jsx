import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Divider,
  Popover,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MyProfile = () => {
  const [data, setData] = useState("");
  const [MyGame, setMyGame] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const frm = new FormData();
    frm.append("userPhoto", file);

    axios
      .put(`http://localhost:5000/UploadProfile/${uid}`, frm)
      .then((response) => {
        console.log(response.data);
        fetchData();
        handleClose();
      });
  };

  useEffect(() => {
    fetchData();
    fetchGameData();
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
                  to="/user/editprofile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Edit Profile
                </Link>
              </Button>

              <Button sx={{ marginLeft: "30px" }} variant="contained">
                <Link
                  to={"/user/AddGame"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Add Game
                </Link>
              </Button>
              <SettingsIcon
                sx={{ paddingLeft: "25px", width: "50px", height: "30px" }}
                onClick={handleClick}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Card sx={{p:3}}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Change Profile
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handlePhotoChange}
                    />
                  </Button>
                </Card>
              </Popover>
            </Box>
            <Box display={"flex"} paddingTop={"30px"}></Box>
            <Typography
              variant="h6"
              sx={{ paddingTop: "20px", fontWeight: "bold" }}
            >
              {data.userFullName}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "15px", color: "grey" }}>
              Creator
            </Typography>
            <Box></Box>
          </Box>
        </Box>
      </Box>
      <Box padding={"10px"}></Box>
      <Divider sx={{ paddingTop: "50px" }} />
      <Box>
        <Typography variant="h4" textAlign={"center"}>
          Games
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, m: 2 }}>
          {MyGame &&
            MyGame.map((item, key) => (
              <Card
                key={key}
                sx={{
                  width: 280,
                  height: 400,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <CardMedia
                  image={item.game.uploadfile}
                  sx={{ width: "inherit", height: 250, borderRadius: 5 }}
                />
                <Typography>{item.game.name}</Typography>
                <Typography>{item.game.desc}</Typography>
                <Link to={`/User/ShowReview/${item.gameId}`}>
                  <Button>View More</Button>
                </Link>
              </Card>
            ))}
        </Box>
      </Box>
    </div>
  );
};

export default MyProfile;

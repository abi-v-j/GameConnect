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
                  to="/user/editprofile"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Edit Profile
                </Link>
              </Button>

              <Button sx={{ marginLeft: "30px" }} variant="contained">
                <Link to={'/user/AddGame'}
                  style={{ textDecoration: "none", color: "inherit" }}>
                  Add Game
                </Link>
              </Button>
              <SettingsIcon
                sx={{ paddingLeft: "25px", width: "50px", height: "30px" }}
              />
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
      <Box padding={"10px"}>

      </Box>
      <Divider sx={{ paddingTop: "50px" }} />
      <Box>
        <Typography variant='h4' textAlign={'center'}>Games</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, m: 2 }}>
          {
            MyGame && MyGame.map((item, key) => (
              <Card key={key} sx={{ width: 280, height: 400, p: 2, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                <CardMedia image={item.game.uploadfile} sx={{ width: 'inherit', height: 250, borderRadius: 5 }} />
                <Typography>{item.game.name}</Typography>
                <Typography>{item.game.desc}</Typography>
                <Link to={`/User/ShowReview/${item.gameId}`}>

                  <Button>View More</Button>
                </Link>

              </Card>
            ))
          }

        </Box>
      </Box>
    </div>
  );
};

export default MyProfile;

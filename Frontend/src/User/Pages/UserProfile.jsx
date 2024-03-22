import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";

const UserProfile = () => {
  const { id } = useParams()
  const [data, setData] = useState("");
  const [tpost, setTpost] = useState("");
  const [posts, setPOst] = useState([]);
  const uid = sessionStorage.getItem("uid");


  const fetchData = () => {
    axios.get("http://localhost:5000/user/" + id).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
    axios.get("http://localhost:5000/user/totalposts/" + id).then((res) => {
      console.log(res.data);
      setTpost(res.data.totalPosts);
    });
  };


  const fetchPost = () => {
    axios.get("http://localhost:5000/postsSingleUser/" + id).then((res) => {
      console.log(res.data);
      setPOst(res.data);
    });
  };

 
  useEffect(() => {
    fetchData();
    fetchPost();
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
             
            
            </Box>
            <Box display={"flex"} paddingTop={"30px"}>
              <Typography variant="h6">
                <span style={{ fontWeight: "bold" }}>
                  {" "}
                  {tpost ? tpost : 0}{" "}
                </span>{" "}
                Posts
              </Typography>
             
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
        {posts.map((post) => (
          <Post data={post} fetchPost={fetchPost} />
        ))}
      </Box>
    </div>
  );
};

export default UserProfile;

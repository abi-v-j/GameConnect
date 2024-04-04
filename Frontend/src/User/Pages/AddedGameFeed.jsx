import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddedGamePost from "./AddedGamePost";

const AddedGameFeed = () => {
  const [posts, setPOst] = useState([]);
  const did = sessionStorage.getItem("did");


  const fetchPost = () => {
    axios.get(`http://localhost:5000/games`).then((res) => {
      console.log(res.data);
      setPOst(res.data);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <Box>
      {posts.map((post) => (
        <AddedGamePost data= {post} fetchPost={fetchPost}/>
      ))}
    </Box>
  );
};

export default AddedGameFeed;

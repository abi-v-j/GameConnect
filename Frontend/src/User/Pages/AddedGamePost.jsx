import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Comment from "../Pages/Comment";
import CommentIcon from "@mui/icons-material/Comment";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

const AddedGamePost = ({ data, fetchPost }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const did = sessionStorage.getItem("did");
  const post = data._id;
  const dev = data.developerId;

 




  

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={

          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {data.dev.devName.charAt(0)}
          </Avatar>

        }

       
        title={data.dev.devName}
        subheader="September 14, 2016"
      />
      <Carousel height={"400px"} stopAutoPlayOnHover={true} autoPlay={false}>
        {data.posts.map((post, key) => (
          <Box key={key}>
            {post.postType === "image" ? (
              <CardMedia
                component="img"
                height="100%"
                width="20%"
                image={post.postFile}
                alt="Image"
              />
            ) : (
              <video
                controls // Adding controls attribute for playback control
                autoplay // Adding autoplay attribute for automatic playback
                muted // Adding muted attribute to mute the video by default
                width="100%" // Setting width to 100% of the container
                height="500px" // Setting height to auto to maintain aspect ratio
              >
                <source src={post.postFile} type="video/mp4" />
              </video>
            )}
          </Box>
        ))}
      </Carousel>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <b style={{ color: "black" }}> {data.dev.devName} </b>{" "}
          {data.postCaption}
        </Typography>
      </CardContent>
      <a href={data.postgameFile} download={true} style={{ width:'200px',height:'50px', backgroundColor:'blue',color:'white',padding:'5px',borderRadius:'10px',textDecoration:'none'}} >Click here to download</a>
      <CardActions disableSpacing>
       
      
      </CardActions>
    </Card>
  );
};

export default AddedGamePost;

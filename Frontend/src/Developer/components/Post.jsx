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

import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

const Post = ({ data, fetchPost }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [check, setCheck] = useState(false);
  const did = sessionStorage.getItem("did");
  const post = data._id;
  const dev = data.developerId;

 


  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/postDevGame/" + id).then((res) => {
      console.log(res.data);
      fetchPost();
    });
    setAnchorEl(null);
  };
  const handleEdit = (id) => {
    setAnchorEl(null);
  };



  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={

          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {data.dev.devName.charAt(0)}
          </Avatar>

        }

        action={
         
            <Box>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: "ITEM_HEIGHT * 4.5",
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={() => handleDelete(post)}>Delete</MenuItem>
              </Menu>
            </Box>
          
        }
        title={data.dev.devName}
        subheader="September 14, 2016"
      />
      <Carousel height={"500px"} stopAutoPlayOnHover={true} autoPlay={false}>
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
      <a href={data.postgameFile} download={true} >Click here to download</a>
      <CardActions disableSpacing>
       
      </CardActions>
    </Card>
  );
};

export default Post;

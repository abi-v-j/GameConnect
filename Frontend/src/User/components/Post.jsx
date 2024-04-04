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

const Post = ({ data, fetchPost }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [check, setCheck] = useState(false);
  const uid = sessionStorage.getItem("uid");
  const post = data._id;
  const user = data.userId;
  const userPhoto = data.user.userPhoto;
  console.log(userPhoto);

  const LikeStatus = () => {
    axios
      .get("http://localhost:5000/LikeStatus/" + uid + "/" + post + "/")
      .then((res) => {
        if (res.data) {
          setLiked(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const countData = () => {
    axios.get("http://localhost:5000/likeCount/" + post).then((res) => {
      setLikes(res.data.likeCount);
    });

    axios.get("http://localhost:5000/commentcount/" + post).then((res) => {
      setComments(res.data.commentCount);
    });
  };

  const handleLike = () => {
    const datas = {
      postId: post,
      userId: uid,
    };
    axios.post("http://localhost:5000/like", datas).then((res) => {
      console.log(res.data);
      setLiked(true);
      countData();
    });
  };

  const handleDislike = (id) => {
    axios
      .delete("http://localhost:5000/like/" + uid + "/" + post)
      .then((res) => {
        console.log(res.data);
        setLiked(false);
        countData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/posts/" + id).then((res) => {
      console.log(res.data);
      fetchPost();
    });
    setAnchorEl(null);
  };
  const handleEdit = (id) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    LikeStatus();
    countData();
  }, []);

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          userPhoto ? (
            <Avatar src="userPhoto"></Avatar>
          ) : (
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {data.user.userFullName.charAt(0)}
            </Avatar>
          )
        }

        action={
          uid === user ? (
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
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={() => handleDelete(post)}>Delete</MenuItem>
              </Menu>
            </Box>
          ) : (
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
                <Link to={`/User/userprofile/${data.user._id}`} style={{ textDecoration: 'none', color: 'black' }}>

                  <MenuItem >View Profile</MenuItem>
                </Link>


              </Menu>
            </Box>
          )
        }
        title={data.user.userFullName}
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
          <b style={{ color: "black" }}> {data.user.userName} </b>{" "}
          {data.postCaption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            liked ? handleDislike() : handleLike();
          }}
        >
          {liked ? <FavoriteOutlinedIcon color="error" /> : <FavoriteBorder />}
          {likes > 0 ? (
            <span style={{ fontSize: "15px", paddingLeft: "5px" }}>
              {likes}
            </span>
          ) : null}
          {/* <Favorite /> */}
        </IconButton>
        <IconButton onClick={() => setCheck((prevCheck) => !prevCheck)}>
          <CommentIcon />
          {comments > 0 ? (
            <span style={{ fontSize: "15px", paddingLeft: "5px" }}>
              {comments}
            </span>
          ) : null}
        </IconButton>
       
      </CardActions>
      {check && <Comment post={post} countData={countData} />}
    </Card>
  );
};

export default Post;

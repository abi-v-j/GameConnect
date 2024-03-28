import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Comment = (props) => {
  const paperStyle = {
    height: "80vh",
    padding: "20px",
    margin: 5,
  };
  const typoStyle = {
    fontSize: "17px",
    fontWeight: "bold",
    display: "inline",
  };
  const captionStyle = { fontSize: "17px", paddingLeft: "12px" };

  const textStyle = { paddingLeft: "15px", width: "100%" };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 48;

  const [comments, setComments] = useState("");
  const [commentData, setCommentData] = useState([]);

  const uid = sessionStorage.getItem("uid");
  const postId = props.post;

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5000/comments/" + id)
      .then((res) => {
        console.log(res.data);
        fetchComment();
      })
      .catch((err) => {
        console.log(err);
      });
    setAnchorEl(null);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const datas = {
      commentContent: comments,
      postId: postId,
      userId: uid,
    };
    console.log(datas);

    axios.post("http://localhost:5000/addcomment", datas).then((res) => {
      console.log(res.data);
      fetchComment();
    });
  };
  const fetchComment = () => {
    axios
      .get("http://localhost:5000/comments/" + postId)
      .then((res) => {
        console.log(res.data);
        setCommentData(res.data.comments);
        setComments("");
        props.countData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchComment();
  }, []);

  const handleEdit = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Paper elevation={2} sx={paperStyle}>
        <Box sx={{ height: "65vh", overflowY: "scroll", p: 2 }}>
          {commentData.map((comment) => (
            <Box>
              <Box display={"flex"}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://mui.com/static/images/avatar/1.jpg"
                />
                <Box display={"flex"} paddingLeft={"13px"}>
                  <Box sx={{ paddingLeft: "10px" }}>
                    <Typography sx={typoStyle}>
                      {comment.userId.userFullName}
                    </Typography>
                    <span style={captionStyle}>{comment.commentContent}</span>
                  </Box>
                </Box>
              </Box>
              <Box display={"flex"}>
                <p style={{ color: "gray", paddingLeft: "50px" }}>16m</p>
                <p style={{ color: "gray", paddingLeft: "50px" }}>Reply</p>
                {console.log(comment.userId._id)}
                {uid===comment.userId._id?
                <Box sx={{ paddingLeft: "400px" }}>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
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
                    <MenuItem onClick={() => handleDelete(comment._id)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>:undefined }
              </Box>
            </Box>
          ))}
        </Box>
        {/* Add comment */}
        <Box sx={{ display: "flex", gap: 2, p: 2 }}>
          <Avatar
            alt="Remy Sharp"
            src="https://mui.com/static/images/avatar/1.jpg"
          />

          <OutlinedInput
            components={"form"}
            onChange={(e) => setComments(e.target.value)}
            id="outlined-adornment-password"
            sx={textStyle}
            placeholder="Add a Comment"
            value={comments}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  type="submit"
                  onClick={handleComment}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Comment;

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
  
  const AddReview = ({gid,countData}) => {
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
  
    const [review, setReview] = useState("");
    const [reviewData, setReviewData] = useState([]);
  
    const uid = sessionStorage.getItem("uid");
    const gameId = gid
  
    const handleDelete = (id) => {
      axios
        .delete("http://localhost:5000/ReviewBody/" + id)
        .then((res) => {
          console.log(res.data);
          fetchReview();
        })
        .catch((err) => {
          console.log(err);
        });
      setAnchorEl(null);
    };
  
    const handleReview = (e) => {
      e.preventDefault();
      const datas = {
        content: review,
        gameId: gameId,
        userId: uid,
      };
      console.log(datas);
  
      axios.post("http://localhost:5000/ReviewBody", datas).then((res) => {
        console.log(res.data);
        fetchReview();
      });
    };
    const fetchReview = () => {
      axios
        .get("http://localhost:5000/ReviewBody/" + gameId)
        .then((res) => {
          console.log(res.data);
          setReviewData(res.data.reviewBody);
          setReview("");
          countData();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    useEffect(() => {
      fetchReview();
    }, []);
  
    const handleEdit = () => {
      setAnchorEl(null);
    };
    return (
      <Box>
        <Paper elevation={2} sx={paperStyle}>
          <Box sx={{ height: "65vh", overflowY: "scroll", p: 2 }}>

          <Box sx={{ display: "flex", gap: 2, p: 2 }}>
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
  
            <OutlinedInput
              components={"form"}
              onChange={(e) => setReview(e.target.value)}
              id="outlined-adornment-password"
              sx={textStyle}
              placeholder="Add a Review"
              value={review}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    type="submit"
                    onClick={handleReview}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
            { reviewData && reviewData.map((comment) => (
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
                      <span style={captionStyle}>{comment.content}</span>
                    </Box>
                  </Box>
                </Box>
                <Box display={"flex"}>
                 
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
         
        </Paper>
      </Box>
    );
  };
  
  export default AddReview;
  
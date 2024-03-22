import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [photo, setPhoto] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append other form data
    formData.append("postCaption", caption);
    formData.append("userId", sessionStorage.getItem("uid"));

    // Append each file to the FormData object
    for (let i = 0; i < photo.length; i++) {
      formData.append("postFile", photo[i]);
    }

    // Send the FormData object using axios
    axios
      .post("http://localhost:5000/addpost", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
      });
  };

  const FileHandle = (event) => {
    const files = event.target.files;

    if (files.length + photo.length > 6) {
      // If so, alert the user
      alert("You can only upload up to 6 files.");
      return; // Exit the function
    }
    setPhoto(files);
  };


  

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Delete"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Box
          width={1000}
          height={400}
          bgcolor={"background.default"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create Post
          </Typography>
          <UserBox>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="data:image/jpeg;base64,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"
            />
            <Typography variant="span" fontWeight={500}>
              Rockey
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={5}
            placeholder="What's On Your Mind"
            variant="standard"
            onChange={(e) => setCaption(e.target.value)}
          />

          <Stack direction="row" gap={1} mt={2} mb={3}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput multiple type="file" onChange={FileHandle} />
            </Button>
            {/* <EmojiEmotions color="primary" />
            <Image color="secondary" />
            <VideoCameraBack color="success" />
            <PersonAdd color="error" /> */}
          </Stack>
         
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button type="submit">Post</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
};

export default Add;

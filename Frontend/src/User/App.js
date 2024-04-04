import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Editprofile from "./Pages/Editprofile";
import Changepassword from "./Pages/Changepassword";
import MyProfile from "./Pages/MyProfile";
import UserProfile from "./Pages/UserProfile";
import AddGame from "./Pages/AddGame";
import ShowReview from "./Pages/ShowReview";
import AddedGameFeed from "./Pages/AddedGameFeed";

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar setMode={setMode} mode={mode} />

          <Box flex={4} p={2}>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/editprofile" element={<Editprofile />} />
              <Route path="/changepassword" element={<Changepassword />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/userprofile/:gid" element={<UserProfile />} />
              <Route path="/AddGame" element={<AddGame />} />
              <Route path="/ShowReview/:gid" element={<ShowReview />} />
              <Route path="/GameFeed" element={<AddedGameFeed />} />
            </Routes>
          </Box>

          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  );
}

export default App;

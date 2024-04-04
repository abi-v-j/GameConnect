import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import React from "react";
import { AccountBox, Article, Groups, Home, ModeNight, Person, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = ({ mode, setMode }) => {
  return (
    <Box

      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed">

        <List >
          <ListItem disablePadding>
            <Link to={'/Developer'} style={{textDecoration:'none', color:'black'}}>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </Link>

          </ListItem>
          <ListItem disablePadding>
            <Link to={'/Developer/editprofile'} style={{textDecoration:'none', color:'black'}}>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
            </Link>

          </ListItem>
          <ListItem disablePadding>
            <Link to={'/Developer/changepassword'} style={{textDecoration:'none', color:'black'}}>
              <ListItemButton component="a" href="#home">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </Link>

          </ListItem>
         



        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;

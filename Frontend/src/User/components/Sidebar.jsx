import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import React from "react";
import { AccountBox, Article, Groups, Home, ModeNight, Person, Settings } from "@mui/icons-material";
import {Link} from 'react-router-dom'
const Sidebar = ({mode,setMode}) => {
  return (
    <Box
      
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <Box position="fixed">

      <List >
          <ListItem disablePadding>
            <Link to={'/User/'}  style={{textDecoration:'none',color:'black'}}>
            <ListItemButton >

              <ListItemIcon>
               <Home/>
              </ListItemIcon>
              <ListItemText primary="Home" />
              
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
          <Link to={'/User/GameFeed/'}  style={{textDecoration:'none',color:'black'}}>
            <ListItemButton >
              <ListItemIcon>
               <Article/>
              </ListItemIcon>
              <ListItemText primary="Game Feed" />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
          <Link to={'/User/myprofile/'}  style={{textDecoration:'none',color:'black'}}>
            <ListItemButton >          
                  <ListItemIcon>
               <Groups/>
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
          <Link to={'/User/changepassword'}  style={{textDecoration:'none',color:'black'}}>
            <ListItemButton >        
                            <ListItemIcon>
              <Person/>
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
          <Link to={'/'}  style={{textDecoration:'none',color:'black'}}>
            <ListItemButton >        
                            <ListItemIcon>
              <Person/>
              </ListItemIcon>
              <ListItemText primary="LogOut" />
            </ListItemButton>
            </Link>
          </ListItem>
         
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
               <ModeNight/>
              </ListItemIcon>
              <Switch onChange={e=>setMode(mode==="light" ? "dark" : "light")} /> 
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;

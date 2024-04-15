import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsIcon from '@mui/icons-material/Collections';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import BadgeIcon from '@mui/icons-material/Badge';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Divider, Paper } from "@mui/material";
import {Link}  from 'react-router-dom'

const Sidebar = () => {
  const {dispatch}= useContext(DarkModeContext)
  return (
    <Paper elevation={10}  square={false} sx={{width:"250px",backgroundColor:"#FAFAFA"}} >
    <div className="sidebar">
      <div className="top">
        <span className="logo">GameConnect</span>
      </div>
      <hr />
      <div className="center">
        <ul>
            <p className="title">MAIN</p>
            <Link  to={'/Admin'} style={{textDecoration:'none'}}>

          <li>
            <DashboardIcon className="icon"/>
            <span>Dashbord</span>
          </li>
            </Link>
          <Divider/>
          <p className="title">datas</p>
          <Link  to={'/Admin/UploadGame'} style={{textDecoration:'none'}}>

          <li>
            <AccountCircleIcon className="icon"/>
            <span>Upload Game</span>
          </li>
          </Link>
          <Link  to={'/Admin/Viewgame'} style={{textDecoration:'none'}}>

          <li>
            <CollectionsIcon className="icon"/>
            <span>Games</span>
          </li>
          </Link>
          <Link  to={'/'} style={{textDecoration:'none'}}>

          <li>
            <LocalMallIcon className="icon"/>
            <span>Log Out</span>
          </li>
          </Link>
          <Divider/>
        
        </ul>
      </div>
     
    </div>
    </Paper>
  );
};

export default Sidebar;

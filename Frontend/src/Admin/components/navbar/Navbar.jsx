import "./navbar.scss"

import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Avatar } from "@mui/material";
const Navbar = () => {
  const {dispatch}= useContext(DarkModeContext)
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
         
        </div>
        <div className="items">
          
          {/* <div className="item">
          <NotificationsNoneOutlinedIcon className="icon"/>
          <div className="counter">1</div>
          
          </div> */}
          
         
          <div className="item">
          <Avatar src="http://m.gettywallpapers.com/wp-content/uploads/2023/09/Cristiano-Ronaldo-pfp.jpg" 
          alt="" className="avatar"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
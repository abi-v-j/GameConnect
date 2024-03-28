import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const Changepassword = () => {
  const [oldPass,setOldPass]=useState('');
   const [newPass,setNewPass]=useState('');
   const [repass,setRePass]= useState('');

   const uid = sessionStorage.getItem("uid");

   const handleSubmit=(e)=>{
    e.preventDefault();
    
    if(newPass==repass){
      const data={
        userPassword:oldPass,
        userNewPassword:newPass,
      };
    axios.put("http://localhost:5000/changepassword/"+uid,data).then((res)=>{
      console.log(res.data);
      setOldPass('');
      setNewPass('');
      setRePass('');
      
    })
    }
    else{
      alert('Passwords do not match!');
    }

   }
  return (
    <div>
      <Box padding={5}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ flexDirection: "column" }}>
            <Avatar
              sx={{ bgcolor: "secondary.main", width: 80, height: 80 }}
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            ></Avatar>
            <Typography style={{marginTop:'10px', marginLeft: "0", marginBottom: "45px" }}>
              @USERName
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ m: 5 }} component={'form'} onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Old Password</Typography>
            <TextField id="standard-basic" variant="outlined" onChange={(e)=>setOldPass(e.target.value)} value={oldPass}/>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>New Password</Typography>
            <TextField id="standard-basic" variant="outlined" onChange={(e)=>setNewPass(e.target.value)} value={newPass}/>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              padding: "20px",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ width: "80px" }}>Confirm Password</Typography>
            <TextField id="standard-basic" variant="outlined" onChange={(e)=>setRePass(e.target.value)} value={repass}/>
          </Box>
          <Box display={"flex"} justifyContent={"center"} margin={"20px"}>
            <Button type='submit' sx={{ marginLeft: "40px" }} variant="contained">
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Changepassword
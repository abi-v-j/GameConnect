import { Link } from "react-router-dom"
import "./DevRegister.scss"
import { useState } from "react"
import { Box, Button } from "@mui/material";
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const DevRegister = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [file, setFile] = useState('')

  const handleSubmit = () => {

    const frm = new FormData()
    frm.append("username", username)
    frm.append("email", email)
    frm.append("password", password)
    frm.append("name", name)
    frm.append("file", file)


    axios.post('http://localhost:5000/Developer', frm).then((response) => {
      console.log(response.data);
      setEmail('')
      setUsername('')
      setPassword('')
      setConfirmPassword('')
      setName('')
      setFile('')
    })
  }



  return (

    <Box className="register" >
      <div className="card">
        <div className="left">
          <h1>GameConnect</h1>
          <p>“The Game gives you a Purpose. The Real Game is, to Find a Purpose”</p>

          <span>Do you have an account?</span>
          <Link to="/">
            <button>Login</button>
          </Link>

        </div>
        <div className="right">
          <h1>Register</h1>
          <Box className="form">
            <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={(event) => setFile(event.target.files[0])} />
            </Button>
            <button onClick={handleSubmit}>Register</button>

          </Box>
        </div>
      </div>
    </Box>
  )
}

export default DevRegister
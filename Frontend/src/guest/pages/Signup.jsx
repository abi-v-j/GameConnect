import { Link } from "react-router-dom"
import "./SignUp.scss"
import { useState } from "react"
import { Box } from "@mui/material"
import axios from 'axios'

const SignUp = () => {

  const [userName, setUserName] = useState('')
  const [userFullName, setUserFullName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userRePassword, setUserRePassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
      userName,
      userFullName,
      userEmail,
      userPassword

    }

    axios.post('http://localhost:5000/user', data).then((response) => {
      console.log(response.data);
      setUserName('')
      setUserFullName('')
      setUserEmail('')
      setUserPassword('')
      setUserRePassword('')
    })
  }


  return (

    <Box className="register" component={'form'} onSubmit={handleSubmit}>
      <div className="card">
        <div className="left">
          <h1>GameConnect</h1>
          <p>“I’m the hero of a thousand stories. I’m a superhero, an assassin a soldier. I’ve slain dragons and traveled through portals. I am a spartan, a commander. A king. I’ve saved a thousand worlds and countless more lives. What am I? I’m a gamer.”</p>

          <span>Do you have an account?</span>
          <Link to="/">
            <button>Login</button>
          </Link>
          <span>Are you a developer?</span>
          <Link to="/DevRegister">
            <button>Register</button>
          </Link>

        </div>
        <div className="right">
          <h1>Register</h1>
          <Box className="form">
            <input type="text" placeholder="Username" value={userName}
              onChange={(event) => setUserName(event.target.value)} />
            <input type="email" placeholder="Email" value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
            <input type="password" placeholder="password" value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
            <input type="password" placeholder="confirm password" value={userRePassword} onChange={(event) => setUserRePassword(event.target.value)} />
            <input type="text" placeholder="Name" value={userFullName} onChange={(event) => setUserFullName(event.target.value)} />
            <button type="submit">Register</button>
          </Box>
        </div>
      </div>
    </Box>
  )
}

export default SignUp
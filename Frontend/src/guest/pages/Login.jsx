import { Link, useNavigate } from "react-router-dom"
import "./Login.scss"
import { useState } from "react"
import axios from "axios";

const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    axios.post("http://localhost:5000/login", data).then((response) => {
      console.log(response.data);
      const { id, login } = response.data
      if (login === 'Admin') {
        sessionStorage.setItem('aid', id)
        navigate("../../Admin")

      }
      else if (login === 'User') {
        sessionStorage.setItem('uid', id)
        navigate("../../User")
      }
      else if (login === 'Developer') {
        sessionStorage.setItem('did', id)
        navigate("../../Developer")
      }
      else {

      }
    });

    setEmail("");
    setPassword("");
  };


  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome Back </h1>
          <p>Eat. Sleep. Game. Repeat.</p>

          <span>Don't you have an account</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <span>Are you a developer?</span>
          <Link to="/DevRegister">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} />

            <button onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
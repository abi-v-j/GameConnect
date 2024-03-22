import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import DevRegister from './pages/DevRegister'

const App = () => {
  return (
    <div >
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register/" element={<Signup/>}/>
      <Route path="/devRegister/" element={<DevRegister/>}/>
    </Routes>
  </div>
  )
}

export default App
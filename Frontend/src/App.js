import { Route, Routes } from "react-router-dom";
import Admin from './Admin/App'
import User from './User/App'
import Guest from './guest/App'
import Developer from './Developer/App'




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Admin/*" element={<Admin/>}/>
        <Route path="/User/*" element={<User/>}/>
        <Route path="/Developer/*" element={<Developer/>}/>
        <Route path="/*" element={<Guest/>}/>
      
      </Routes>
    </div>
  );
}

export default App;

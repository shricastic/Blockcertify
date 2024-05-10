import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

import Home from './components/user/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';

import Dashboard from './components/admin/Dashboard';
import AdminLogin from './components/admin/AdminLogin';
import Users from './components/admin/Users';
import AddUser from './components/admin/AddUser';
import AdminRegister from './components/admin/AdminRegister';
import AddCertificate from './components/admin/AddCertificate';

import About from './components/other/About';

function App(){
  return(
    <Router>
      <div className="App">
        <nav className="menubar">
          <label className="logo">BlockCertify</label>
        <ul>
          <li>
            <Link to ="/Home">Home</Link>
          </li>

          <li>
            <Link to ="/Login"> Login </Link>
          </li>

          <li>
            <Link to = "/Register"> Register </Link>
          </li>
          
          <li>
            <Link to = "/AdminLogin"> Admin </Link>
          </li>

          <li> 
            <Link to = "/About"> About </Link>
          </li>
        </ul>
        </nav>



        <Routes>
          
          <Route path="/Home" element={<Home />}> </Route>
          <Route path="/Login" element={<Login />}> </Route>
          <Route path="/Register" element={<Register />}> </Route>
          
          
          <Route exact path="/AdminLogin" element={<AdminLogin />}></Route>
          <Route exact path="/AdminRegister" element={<AdminRegister />}></Route>
          <Route exact path="/Dashboard" element={<Dashboard />}></Route>  
          <Route exact path="/Users" element={<Users />}></Route>  
          <Route path="/AddCertificate" element={<AddCertificate />}></Route>
          <Route path="/AddUser" element={<AddUser />}> </Route>

         
          <Route path="/About" element={<About />}></Route>

        </Routes>
        
        <div className="footer"> 
          <p> Shrikrushna C Gundre | ©2024 All rights revserved.</p>  
        </div>

      </div>
    </Router>
  );
}

export default App;

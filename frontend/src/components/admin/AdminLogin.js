import React from 'react';
import './adminLogin.css';

const AdminLogin = () =>{
    return(
      <>
         <div className="container">
            <div className="login-form">
              <h1> Admin Login </h1>
              <form>
                  <input type="text" name="email" placeholder="Email"/>
                  <input type="text" name="password" placeholder="Password"/>
                  <button type="submit" value="Submit">Login</button>
              </form>
            </div>

         </div>
              
      </>
    )
}

export default AdminLogin;

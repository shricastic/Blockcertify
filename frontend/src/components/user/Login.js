import React from 'react';
import '../admin/adminLogin.css';

const Login = () =>{
    return(
      <>
        <div className="container">
            <div className="login-form">
              <h1> User Login </h1>
              <form>
                  <input type="text" name="email" placeholder="Email"/>
                  <input type="text" name="password" placeholder="Password"/>
                  <button type="submit" value="Submit">Login</button>
              </form>
            </div>

         </div>
      </>
    );
}

export default Login;

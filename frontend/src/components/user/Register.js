import React from 'react';

const Register = () =>{
    return(
      <>
        <div className="container">
            <div className="login-form">
              <h1> Register New User </h1>
              <form>
                  <input type="text" name="username" placeholder="Username"/>
                  <input type="text" name="email" placeholder="Email"/>
                  <input type="text" name="prn" placeholder="PRN"/>
                  <input type="text" name="password" placeholder="Password"/>
                  <button type="submit" value="Submit">Register</button>
              </form>
            </div>

         </div>

      </>
    );
}

export default Register;


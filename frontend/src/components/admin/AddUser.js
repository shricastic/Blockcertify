import React from 'react';

const AddUser = () =>{
    return(
      <>
         <div className="container">
            <div className="login-form">
              <h1> Add New User </h1>
              <form>
                  <input type="text" name="username" placeholder="Username"/>
                  <input type="text" name="email" placeholder="Email"/>
                  <input type="text" name="prn" placeholder="PRN"/>
                  <input type="text" name="password" placeholder="Password"/>
                  <button type="submit" value="Submit">Add User</button>
              </form>
            </div>
         </div>
      </>
    );
}

export default AddUser;

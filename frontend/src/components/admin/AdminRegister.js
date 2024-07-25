import React, {useState} from 'react';
import axios from 'axios';

const AdminRegister = () =>{
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const HostUrl = process.env.REACT_APP_HOST_URL;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      await axios.post(`${HostUrl}/admin/register`, {username, email, password});
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
      <>
        <div className="container">
            <div className="login-form">
              <h1> Register New Admin </h1>
              <form onSubmit={handleSubmit}>
                  <input type="text" name="username" placeholder="Username" value={username} onChange={handleChange}/>
                  <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange}/>
                  <input type="text" name="password" placeholder="Password" value={password} onChange={handleChange}/>
                  <button type="submit" value="Submit">Register</button>
              </form>
            </div>

         </div>

      </>
    );
}

export default AdminRegister; 

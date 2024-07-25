import React, {useState} from 'react';
import '../admin/adminLogin.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =  useNavigate();
  const HostUrl = process.env.REACT_APP_HOST_URL;

  const handleChange = (event) =>{
    const { name, value } = event.target;

    switch(name){
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async(event) =>{
    event.preventDefault();

    try {
      const response = await axios.post(`${HostUrl}/user/login`, {email, password});
      const token = response.data.token;

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      localStorage.setItem('token', token);
  
      console.log(response);

      navigate('/Home', {replace: true});

    } catch (error) {
      console.error(error);
    }
  }

  const handleOnClick =  async(event) =>{
    navigate('/Verify', {replace: true});
  }

  return(
    <>
      <div className="container">
          <div className="login-form">
            <h1> User Login </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange}/>
                <input type="text" name="password" placeholder="Password" value={password} onChange={handleChange}/>
                <button type="submit" value="Submit">Login</button>
            </form>

            <button type="submit" onClick={handleOnClick}>Verify Certificate</button>
          </div>

        </div>
    </>
  );
}

export default Login;

import React, { useState, useEffect } from 'react';
import './adminLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const HostUrl = process.env.REACT_APP_HOST_URL;


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/Dashboard', { replace: true });
        }
      }, [navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post(`${HostUrl}/admin/login`, { email, password });
          const token = response.data.token;
          
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
          localStorage.setItem('token', token);
  
          console.log(response);

          navigate('/Dashboard', {replace: true});

        } catch (error) {
            console.error(error);
            setError('Invalid email or password');
        }
    }

    return (
      <>
          <div className="container">
              <div className="login-form">
                  <h1> Admin Login </h1>
                  <form onSubmit={handleSubmit}>
                      <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange} />
                      <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                      <button type="submit">Login</button>
                  </form>
                  {error && <p className="error">{error}</p>}
              </div>
          </div>
      </>
    )
}

export default AdminLogin;
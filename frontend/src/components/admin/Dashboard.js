import React, {useEffect} from 'react';
import axios from 'axios';
import '../user/home.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {  
  const navigate = useNavigate();
  const HostUrl = process.env.REACT_APP_HOST_URL;


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          navigate('/AdminLogin', {replace: true});
          throw new Error('Token not found'); 
        }

        const response = await axios.get(`${HostUrl}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        
        console.log(response);
      } catch (error) {
        console.error('Error fetching user', error);
      }
    }

    fetchUser();
  }, [navigate])

  const handleUserClick = () =>{
    navigate('/Users', {replace: true});
  }

  const handleAddCertificateClick = () =>{
    navigate('/AddCertificate', {replace: true});
  }

  const handleAddUserClick = () =>{
    navigate('/AddUser', {replace: true});
  }

  const handleLogOut = (event) =>{
    localStorage.removeItem('token');

    navigate('/Login', {replace: true});
    
    return null;
  }



  return(
    <>
      <div className='container'> 
          <h1> Welcome Admin! </h1>
          <button onClick={handleAddCertificateClick}>AddCertificate</button>
          <button onClick={handleUserClick}>Users</button>
          <button onClick={handleAddUserClick}>Add Users</button>
          <button onClick={handleLogOut}>logout</button>
      </div>
    </>
  )
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../user/home.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async() =>{
        try {
          const response = await axios.get("http://localhost:3001/admin/users");
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users', error); 
        }
    }

    fetchUsers();

  }, [])
  
  console.log("Users: ", users);

    return(
      <>
        <div className='container'> 
            <h1> Welcome Admin! </h1>
            <div className='inner-container'>
              <h2> Users </h2>
              
              <ul>
               {users && users.map((user, index)=>(
                <li key={index}>
                  {user.username} <button> Delete User </button> 
                </li>
               ))} 

              </ul>

            </div>
        </div>
      </>
    )
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Certificate from '../other/Certificate';
import './home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [certificates, setCertificates] = useState([]);
  const navigate = useNavigate();
  const HostUrl = process.env.REACT_APP_HOST_URL;

  useEffect(() => {

    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          navigate('/Login', {replace: true});
          throw new Error('Token not found');
        }

        const response = await axios.get(`${HostUrl}/user/home`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });

        console.log("this is whole response", response);

        console.log("Response from server: ", response.data);
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates: ', error);
      }
    }

    fetchCertificates();

  }, [navigate]);

  const handleLogOut = (event) =>{
    localStorage.removeItem('token');

    navigate('/Login', {replace: true});
    
    return null;
  }

  console.log('Certificates:', certificates);

  return (
    <>
      <div className="container">
        
        <h1>Welcome {certificates.length > 0 ? certificates[0].name+"!" : "User!"}</h1>
        
        <div className="inner-container">
          <h2>Certificates</h2>
          <ul>
            {certificates && certificates.map((certificate, index) => (
              <li key={index}>
                Course: {certificate.course}
                  <Certificate
                    name={certificate.name}
                    prn={certificate.prn}
                    course={certificate.course}
                    date={certificate.date}
                    hashCode={certificate.certificateHash}
                    issuedBy={certificate.issuedBy}
                  /> 
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleLogOut}>logout</button>

      </div>
    </>
  );
}

export default Home;

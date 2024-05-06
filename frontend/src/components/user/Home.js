import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/home");
        console.log("Response from server: ", response.data);
        setCertificates(response.data);
      } catch (error) {
        console.error('Error fetching certificates: ', error);
      }
    }

    fetchCertificates();

  }, []);

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
                <button>Download</button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
}

export default Home;

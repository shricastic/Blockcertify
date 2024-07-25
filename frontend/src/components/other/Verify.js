import React, { useState } from 'react';
import axios from 'axios';
import '../admin/adminLogin.css';
import verifiedlogo from './verified.gif';

const Verify = () => {
  const [prn, setPrn] = useState('');
  const [hashcode, setHashcode] = useState('');
  const [message, setMessage] = useState('');
  const [certificate, setCertificate] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const HostUrl = process.env.REACT_APP_HOST_URL;

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'prn') {
      setPrn(value);
    } else if (name === 'hashcode') {
      setHashcode(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${HostUrl}/user/verify`, { prn, hashcode });
      setMessage(response.data.message);
      setCertificate(response.data.certificate);
      setIsVerified(true);
      console.log(message);
    } catch (error) {
      console.error(error);
      setMessage('Verification failed');
      setIsVerified(false);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <h1>Verify Certificate</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="prn"
            placeholder="PRN"
            value={prn}
            onChange={handleChange}
          />
          <input
            type="text"
            name="hashcode"
            placeholder="Hashcode"
            value={hashcode}
            onChange={handleChange}
          />
          <button type="submit">Verify</button>
        </form>
        {message && (
          <div className='verified'>
            <p>{message}</p>
            <p>{certificate.name} completed {certificate.course}</p>
            {isVerified && <img src={verifiedlogo} alt="Verified" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;

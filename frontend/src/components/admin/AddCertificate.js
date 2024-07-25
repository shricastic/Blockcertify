import React, { useState } from 'react';
import axios from 'axios';

const AddCertificate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [prn, setPrn] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [issuedBy, setIssuedBy] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const HostUrl = process.env.REACT_APP_HOST_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) { 
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'prn':
        setPrn(value);
        break;
      case 'course':
        setCourse(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'issuedBy':
        setIssuedBy(value);
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files.item(0);
    setCsvFile(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${HostUrl}/admin/add-cert`, { name, email, prn, course, date, issuedBy });
      console.log('Certificate added successfully');
    } catch (error) {
      console.error('Error adding certificate:', error);
    }
  };

  const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No CSV file provided');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const lines = text.split('\n');
        const certificates = [];
  
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue; 
  
          const fields = line.split(',');
          if (fields.length !== 6) {
            reject(`Invalid number of fields in line ${i + 1}`);
            return;
          }
  
          const certificate = {
            name: fields[0].trim(),
            email: fields[1].trim(),
            prn: fields[2].trim(),
            course: fields[3].trim(),
            date: fields[4].trim(),
            issuedBy: fields[5].trim()
          };
          certificates.push(certificate);
        }
  
        resolve(certificates);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsText(file);
    });
  };
  
  

  const handleSubmitCSV = async (e) => {
    e.preventDefault();
    try {
      if (!csvFile) {
        console.error('No CSV file selected');
        return;
      }
      const certificateRecords = parseCSV(csvFile);

      for (const record of certificateRecords) {
        const { name, email, prn, course, date, issuedBy } = record;
        await axios.post(`${HostUrl}/admin/add-cert`, { name, email, prn, course, date, issuedBy });
      }
      console.log('Certificates added successfully');
    } catch (error) {
      console.error('Error adding certificates:', error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="login-form">
          <h1> Add New Certificate </h1>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
            <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange} />
            <input type="text" name="prn" placeholder="PRN" value={prn} onChange={handleChange} />
            <input type="text" name="course" placeholder="Course" value={course} onChange={handleChange} />
            <input type="text" name="date" placeholder="Date" value={date} onChange={handleChange} />
            <input type="text" name="issuedBy" placeholder="Issued By" value={issuedBy} onChange={handleChange} />
            <button type="submit" value="Submit">Create New Certificate</button>
          </form>

          <h1>______________________</h1>

          <form onSubmit={handleSubmitCSV}>
            <input type="file" name="csvFile" onChange={handleFileChange} accept=".csv" />
            <button type="submit">Upload CSV</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddCertificate;

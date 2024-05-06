import React, {useState} from 'react';
import axios from 'axios';

const AddCertificate = () =>{
  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[prn, setPrn] = useState('');
  const[course, setCourse] = useState('');
  const[date, setDate] = useState('');

  const handleChange = (e) =>{
    const {name, value} = e.target;

    switch(name){
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
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/admin/add-cert", {name, email, prn, course, date});
    } catch (error) {
      console.error(error);
    }
  }

  return(
      <>
          <div className="container">
            <div className="login-form">
              <h1> Add New Certificate </h1>
              <form onSubmit={handleSubmit}>
                  <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange}/>
                  <input type="text" name="email" placeholder="Email" value={email} onChange={handleChange}/>
                  <input type="text" name="prn" placeholder="PRN" value={prn} onChange={handleChange}/>
                  <input type="text" name="course" placeholder="Course" value={course} onChange={handleChange}/>
                  <input type="text" name="date" placeholder="Date" value={date} onChange={handleChange}/>
                  <button type="submit" value="Submit">Create New Certificate</button>
                  <button type="submit" value="Submit">Create Using CSV</button>
            </form>
            </div>
          </div>
      </>
    );
}

export default AddCertificate;

import React from 'react';

const AddCertificate = () =>{
    return(
      <>
          <div className="container">
            <div className="login-form">
              <h1> Add New Certificate </h1>
              <form>
                  <input type="text" name="Name" placeholder="Name"/>
                  <input type="text" name="prn" placeholder="PRN"/>
                  <input type="text" name="course" placeholder="Course"/>
                  <input type="text" name="date" placeholder="Date"/>
                  <button type="submit" value="Submit">Create New Certificate</button>
                  <button type="submit" value="Submit">Create Using CSV</button>
            </form>
            </div>
          </div>
      </>
    );
}

export default AddCertificate;

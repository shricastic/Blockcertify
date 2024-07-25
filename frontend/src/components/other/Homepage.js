import React from "react";
import './Homepage.css';

const homeImg = require('../../assets/homepg1.jpeg');

const Homepage = () =>{
    return(
        <div className='home-img'>
        <img src={homeImg} alt='home image'/>
      </div>    
    );
}

export default Homepage;
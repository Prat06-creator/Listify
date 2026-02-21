import React from 'react';
import {useState,useEffect} from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';
import CardCarousel from './imageSlider';
function Landing() {
  const navigate=useNavigate();
  function handleClick(){
    navigate('/login');
  }
  function handleSignup(){
    navigate('/signup');
  }
  
  return (
    <div className="page min-w-full h-auto">
      <div className="navbar">
        <div className="heading">
          <p>Listify</p>
          <p1>Got mess. I'll list it out!!</p1>
        </div>
        <div className="buttons">
          <button className="login" onClick={handleClick}>LOG-IN</button>
          <button className="signup" onClick={handleSignup}>SIGN-UP</button>
        </div>
      </div>

      <div className="banner">
        <div className="slider" style={{ '--quantity': 7 }}>
          {[1,2,3,4,5,6,7].map((num) => (
            <div
              className="item"
              key={num}
              style={{ '--position': num }}
            >
              <img src={`/${num}.png`} alt={`Slide ${num}`} />
            </div>
          ))}
        </div>

        <div className="content">
          <h1 data-content="WHERE FOCUS MEETS VISION">WHERE FOCUS MEETS VISION</h1>
          <div className="model"></div></div>
      </div>
      <div> <CardCarousel/> </div>
      </div>
   
  );
}


export default Landing;

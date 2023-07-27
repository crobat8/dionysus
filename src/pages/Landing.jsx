import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";
import ResetPassword from '../componets/ResetPassword';
import background from '../img/home_banner_edit.png'
import logo from '../img/partyuplogo.png'
const Landing = () =>{ 
  const [slide,setSlide] = useState(1)

  function HandleSwap(){
        
    if(slide === 1){
      return <Login change={changeSlide}/>;
    }else if(slide === 2){
      return <ResetPassword change={changeSlide}/>;
    }else if(slide === 3){
      return <Register change={changeSlide}/>;
    }
  }
  const changeSlide = (x) =>{
    setSlide(x)
  }

  return (
    <div className="landing">
      <header className="topBar" >
        {/* <img src={logo} alt='logo' /> */}
      </header>
      <main >
        <div className='focus'> 
          <img className='home_banner' src={background} alt='logo'/>
          <HandleSwap/>
        </div>
        
        
      </main>
      <footer className='botBar'>

      </footer>
      
      {/* <ReactCardFlip isFlipped={flipR}>
        {flipR?<div>
        </div>:<ReactCardFlip isFlipped={flip}
          flipDirection="horizontal">
          <Login/>
          <Register/>
        </ReactCardFlip>}
        
        <ResetPassword/>
      </ReactCardFlip>
      
      {flipR?<div></div>:<button style={{
              margin: '10px',
              width: '150px',
              padding: '10px',
              fontSize: '20px',
              background: '#00618c',
              fontWeight: 'bold',
              borderRadius: '5px'
              }} onClick={() => setFlip(!flip)}>
        {flip ? "Login": "Register"}
      </button>}
      
      <button style={{
              margin: '10px',
              width: '150px',
              padding: '10px',
              fontSize: '20px',
              background: '#00618c',
              fontWeight: 'bold',
              borderRadius: '5px'
              }} onClick={() => setFlipR(!flipR)}>
        {flipR ? "Go Back": "Password Reset"}
      </button> */}
    </div>
  )
}

export default Landing;
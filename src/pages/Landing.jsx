import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";
import ResetPassword from '../componets/ResetPassword';
import background from '../img/home_banner_edit.png'
import logo from '../img/partyuplogo.png'
import Pill from '../componets/Pill';

const Landing = () =>{ 
  const [slide,setSlide] = useState(1)
  const pillInfo = [
    {
      title:"party",
      description:"Find local events, get-togethers, or parties near you.",
      pic:logo
    },
    {
      title:"Create",
      description:"Make your own events and meet new people",
      pic:logo
    },
    {
      title:"Friends",
      description:"Met somebody at and evenet you want to keep in touch with? Add them as a friend.",
      pic:logo
    }
  ]
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
        <div className='pills'>
            {pillInfo.map((e,i)=>{
              console.log(i)
              return(
                <Pill data={e} count={i}/>
              )
              
            })}
        </div>
      </main>
      <footer className='botBar'>
      </footer>
    </div>
  )
}

export default Landing;
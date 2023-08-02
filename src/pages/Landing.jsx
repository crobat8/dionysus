import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";
import ResetPassword from '../componets/ResetPassword';
import background from '../img/home_banner_edit.png'
import logo from '../img/partyuplogo.png'
import Pill from '../componets/Pill';
import FadeIn from 'react-fade-in';

const Landing = () =>{ 
  const [slide,setSlide] = useState(1)
  const pillInfo = [
    {
      title:"Party",
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
      return (
      <FadeIn >
        <Login change={changeSlide}/>
      </FadeIn>
      )
      
    }else if(slide === 2){
      return(
        <FadeIn >
          <ResetPassword change={changeSlide}/>
        </FadeIn>
      ) 
    }else if(slide === 3){
      return (
        <FadeIn >
          <Register change={changeSlide}/>
        </FadeIn>
      ) 
    }
  }
  const changeSlide = (x) =>{
    setSlide(x)
    
  }

  return (
    <div className="landing">
      
      <header className="topBar" >
        <img src={logo} alt='logo' /> 
        <p>
          PartyUp
        </p>
      </header>
      <main >
        <FadeIn delay={100}>
          <div className='focus'> 
            <div className='imageContainer'> 
              <img className='home_banner1' src={background} alt='logo'/>
            </div>
            
            <HandleSwap/>
            
          </div>
          <img className='home_banner2' src={background} alt='logo'/>
          <div className='pills'>
            
              {pillInfo.map((e,i)=>{
                return(
                  <Pill data={e} count={i}/>
                )
                
              })}
            
          </div>
        </FadeIn>
      </main>
      
      
      <footer className='botBar'>
      </footer>
    </div>
  )
}

export default Landing;
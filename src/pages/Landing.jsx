import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";
import ResetPassword from '../componets/ResetPassword';

const Landing = () =>{ 
  const [flip, setFlip] = useState(false);
  const [flipR,setFlipR] = useState(false);
  return (
    <div className="landing">
      <ReactCardFlip isFlipped={flipR}>
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
      </button>
    </div>
  )
}

export default Landing;
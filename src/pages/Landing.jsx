import React, { useState } from 'react';

import Login from "../componets/Login";
import Register from "../componets/Register";
import ReactCardFlip from "react-card-flip";

const Landing = () =>{ 
  const [flip, setFlip] = useState(false);
  
  return (
    <div className="landing">
      <ReactCardFlip isFlipped={flip}
        flipDirection="horizontal">
        <Login/>
        <Register/>
      </ReactCardFlip>
      
      <button style={{
              margin: '10px',
              width: '150px',
              padding: '10px',
              fontSize: '20px',
              background: '#00618c',
              fontWeight: 'bold',
              borderRadius: '5px'
              }} onClick={() => setFlip(!flip)}>
        {flip ? "Login": "Register"}
      </button>
    </div>
  )
}

export default Landing;
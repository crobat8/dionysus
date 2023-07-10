import React, { useContext, useState } from 'react';


import Parties from '../componets/Parties';
import Create from '../componets/Create';
import Friends from '../componets/Friends';


import logo from '../img/partyuplogo.png'
import { auth } from '../firebase'
import {signOut} from "firebase/auth"
import { AuthContext } from '../context/AuthContext';
import { 
    AiFillGithub,
    AiFillLinkedin,
    AiFillFacebook,
    AiFillInstagram 
} from 'react-icons/ai';
import Login from "../pages/Login";
import Register from "../pages/Register";
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
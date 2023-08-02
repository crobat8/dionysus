import React, { useState } from 'react';

import { auth, db, storage,getAuth} from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { 
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiFillMail,
  AiOutlineKey
} from 'react-icons/ai';
import FadeIn from "react-fade-in";

const ResetPassword = ({change}) =>{

    const [email, setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    let iconStyles = { color: "#1B2430", height:"16px",width:"16px",padding:"5px"};
    const triggerResetEmail = async (e) =>{
      setLoading(true);
      e.preventDefault();
        await sendPasswordResetEmail(auth, email);
        console.log(email)
        console.log("Password reset email sent")
    }

    return (
      <div className="formWrapper">
        
        <h2 className="loginTitle">
          Reset your account password
        </h2>
        <form onSubmit={triggerResetEmail}>
          <div className="fullIn">
            <div className="left">
              <AiFillMail style={iconStyles}/>
            </div>
            <div className="right">
              <label for='email'>Email</label>
              <input type="email" placeholder="email" />
            </div>
          </div>

          
          <button className="logButton">Send Email</button>
          <span onClick={() => change(1)} style={{cursor:'pointer'}}>
            back to log in
          </span>
          {/* <p style={{color: "#00b2be"}}>{loading && <span>Reset email has been sent</span>}</p> */}
        </form>
        
      </div>
        
    )
}
export default ResetPassword;
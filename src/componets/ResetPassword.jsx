import React, { useState } from 'react';

import { auth, db, storage,getAuth} from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const ResetPassword = () =>{

    const [email, setEmail] = useState('')
    const [loading,setLoading] = useState(false)

    const triggerResetEmail = async (e) =>{
      setLoading(true);
      e.preventDefault();
        await sendPasswordResetEmail(auth, email);
        console.log(email)
        console.log("Password reset email sent")
    }

    return (
      <div className="formWrapper">
        <span className="logo">PartyUp</span>
        <span className="title">Reset Password</span>
        <span className="title">enter your email</span>
        <form onSubmit={triggerResetEmail}>
          <input required value={email} type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>

          
          <button>send reset email</button>
          
          <p style={{color: "#00b2be"}}>{loading && <span>Reset email has been sent</span>}</p>
        </form>
      </div>
        
    )
}
export default ResetPassword;
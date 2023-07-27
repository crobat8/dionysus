import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { 
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiFillMail,
  AiOutlineKey
} from 'react-icons/ai';

const Login = ({change}) => {
  console.log(change)
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  let iconStyles = { color: "#1B2430", height:"16px",width:"16px",padding:"5px"};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };


  // const handleGuest = async (e) => {
  //   e.preventDefault();
  //   const email = "PartyUpContact@gmail.com";
  //   const password = "PartyupGuest21%";

  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     navigate("/")
  //   } catch (err) {
  //     setErr(true);
  //   }
  // };
  

  return (
    
      <div className="formWrapper">
        <h3 className="loginTitle">
          Login to access your account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="fullIn">
            <div className="left">
              <AiFillMail style={iconStyles}/>
            </div>
            <div className="right">
              <label for='email'>Email</label>
              <input type="email" placeholder="email" />
            </div>
          </div>
          <div className="fullIn">
            <div className="left">
              <AiOutlineKey style={iconStyles}/>
            </div>
            <div className="right">
              <label for='password'>Password</label>
              <input type="password" placeholder="password" />
            </div>
          </div>
          <button className="logButton">Log In</button>
        </form>
        <span className="forgotMessage" onClick={() => change(2)} style={{cursor:'pointer'}}>
          Forgot Password?
        </span>
        <hr class="hr-text" data-content="OR" />
        <button onClick={() => change(3)} className="signUpButton">
          Sign Up
        </button>
        {/* <button onClick={handleGuest}>Guest Login</button> */}
      </div>
    
  );
};

export default Login;
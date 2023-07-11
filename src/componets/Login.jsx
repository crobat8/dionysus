import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

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

  const handleGuest = async (e) => {
    e.preventDefault();
    const email = "PartyUpContact@gmail.com";
    const password = "PartyupGuest21%";

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  

  return (
    
      <div className="formWrapper">
        <span className="logo">PartyUp</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Login</button>
          
          {err && <span style={{color: "#00b2be"}}>Something went wrong</span>}
        </form>
        <button onClick={handleGuest}>Guest Login</button>
      </div>
    
  );
};

export default Login;
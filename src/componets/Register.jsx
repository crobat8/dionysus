import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { 
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
  AiFillMail,
  AiOutlineKey,
  AiOutlineUser
} from 'react-icons/ai';
import FadeIn from "react-fade-in";

const Register = ({change}) => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fileName,setFileName] = useState('')
  let iconStyles = { color: "#1B2430", height:"16px",width:"16px",padding:"5px"};
  
  const saveFile = (e) =>{
    
    var partsArray = e.nativeEvent.srcElement.value.split('\\');
    setFileName(partsArray[partsArray.length -1])
  }

  const handleSubmit = async (e) => {
    console.log(e.target[0].value)
    console.log(e.target[1].value)
    console.log(e.target[2].value)
    setLoading(true);
    
    e.preventDefault();
    const displayName = e.target[0].value;
    const lowerDisplayName = displayName.toLowerCase();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const brokenDisplayName = []
    for (var x = 1;x<=lowerDisplayName.length;x++)
      brokenDisplayName.push(lowerDisplayName.substring(0, x))
    try {
      //Create user
      console.log("test")
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();

      try {
        //Update profile
        await updateProfile(res.user, {
          displayName,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/partyup-76d1a.appspot.com/o/GUEST1689117670991?alt=media&token=7c0d02f7-4b98-4f24-a070-5c82b5b368ab",
        });
        //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          lowerDisplayName,
          brokenDisplayName,
          cleanText:0,
          email,
          photoURL: "https://firebasestorage.googleapis.com/v0/b/partyup-76d1a.appspot.com/o/GUEST1689117670991?alt=media&token=7c0d02f7-4b98-4f24-a070-5c82b5b368ab",
          friends:{
            Jerry:"Jerry"
            
          }
        }).then(() => {
          console.log("Successful")}
        );
      } catch (err) {
        console.log(err);
        setErr(true);
        setLoading(false);
      }

    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  
  return (
    
      <div className="formWrapper">
        
        <h2 className="loginTitle">
          Register an account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="fullIn">
            <div className="left">
              <AiOutlineUser style={iconStyles}/>
            </div>
            <div className="right">
              <label for='displayName'>Display Name</label>
              <input type="displayName" placeholder="displayName" />
            </div>
          </div>
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

          {/* <label htmlFor="file">
            <div className="profileButton">
              { fileName ? <AiFillIdcard style={iconStylesfull}/>:<AiFillIdcard style={iconStylesempty}/>}
              
              <span>Add an avatar required</span>
            </div>
            
            <span>{fileName}</span>
          </label>
          <input required onChange={(e) => saveFile(e)} style={{ display: "none" }} type="file" id="file" />
           */}
          <button className="logButton" disabled={loading}>Register</button>
          <p style={{color: "#00b2be"}}>{loading && "creating profile"}</p>
          <p style={{color: "#00b2be"}}>{err && <span>Something went wrong</span>}</p>
        </form>
        <span onClick={() => change(1)} style={{cursor:'pointer'}}>
          already have an acount {" "}
          <strong >
            Log In
          </strong>
        </span>
      
        
      </div>
    
  );
};

export default Register;
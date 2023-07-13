import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { 
  AiFillIdcard
} from 'react-icons/ai';
const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [fileName,setFileName] = useState('')

  let iconStylesempty = { color: "#000000", fontSize: "3em" ,padding:"5px"};
  let iconStylesfull = { color: "#e2f1ff", fontSize: "3em" ,padding:"5px"};
  
  const saveFile = (e) =>{
    
    var partsArray = e.nativeEvent.srcElement.value.split('\\');
    setFileName(partsArray[partsArray.length -1])
  }

  const handleSubmit = async (e) => {
    console.log(e)
    setLoading(true);
    
    e.preventDefault();
    const displayName = e.target[0].value;
    const lowerDisplayName = displayName.toLowerCase();
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const brokenDisplayName = []
    for (var x = 1;x<=lowerDisplayName.length;x++)
      brokenDisplayName.push(lowerDisplayName.substring(0, x))
    try {
      //Create user
      console.log("test")
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              lowerDisplayName,
              brokenDisplayName,
              email,
              photoURL: downloadURL,
              friends:{
                Jerry:"Jerry"
                
              }
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log("test")
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };
  
  return (
    
      <div className="formWrapper">
        <span className="logo">PartyUp</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <label htmlFor="file">
            <div className="profileButton">
              { fileName ? <AiFillIdcard style={iconStylesfull}/>:<AiFillIdcard style={iconStylesempty}/>}
              
              <span>Add an avatar required</span>
            </div>
            
            <span>{fileName}</span>
          </label>
          <input required onChange={(e) => saveFile(e)} style={{ display: "none" }} type="file" id="file" />
          
          <button disabled={loading}>Register</button>
          <p style={{color: "#00b2be"}}>{loading && "Uploading and compressing the image please wait..."}</p>
          <p style={{color: "#00b2be"}}>{err && <span>Something went wrong</span>}</p>
        </form>
      </div>
    
  );
};

export default Register;
import React,{
  useState,
  useContext 
} from "react";

import { 
  AuthContext 
} from "../context/AuthContext";

import { auth, db, storage } from "../firebase";

import { 
  doc, 
  updateDoc 
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { 
  AiFillIdcard
} from 'react-icons/ai';

  const ProfilePictureSetting = (props) =>{
    
  const{currentUser} = useContext(AuthContext);
  const [fileName,setFileName] = useState('')
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  let iconStylesempty = { color: "#000000", fontSize: "3em" ,padding:"5px"};
  let iconStylesfull = { color: "#e2f1ff", fontSize: "3em" ,padding:"5px"};
  const saveFile = (e) =>{
    
    var partsArray = e.nativeEvent.srcElement.value.split('\\');
    setFileName(partsArray[partsArray.length -1])
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      console.log(currentUser)
      const file = e.target[0].files[0];
      const date = new Date().getTime();
      const storageRef = ref(storage, `${currentUser.displayName + date}`);


      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(currentUser, {
              photoURL: downloadURL,
            });
            //create user on firestore
            const Ref = doc(db, "users", currentUser.uid);
            await updateDoc(Ref, {
              photoURL:downloadURL
            }).then(() => {
              e.preventDefault();
              alert("photo was succesfully updated refresh page for it to take affect");
            }).catch((error) => {
              console.log(error)
            });

          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
  
    }
    
    function CurrentState() {
      return(
          <img src={currentUser.photoURL} alt="" width={"100%"}/>
      )
    }
    
    return(
    <div className="Setting">
      {props.label}
      <br></br>
      <br></br>
        <CurrentState/>
      <br></br>
      <form onSubmit={handleSubmit}>
          <label htmlFor="file">
            <div className="profileButton">
              { fileName ? <AiFillIdcard style={iconStylesfull}/>:<AiFillIdcard style={iconStylesempty}/>}
              <span>Add an avatar required</span>
            </div>
            <span>{fileName}</span>
          </label>
          <input required onChange={(e) => saveFile(e)} style={{ display: "none" }} type="file" id="file" />
          
          <button disabled={loading}>Update</button>
          <p style={{color: "#00b2be"}}>{loading && "Uploading and compressing the image please wait..."}</p>
          <p style={{color: "#00b2be"}}>{err && <span>Something went wrong</span>}</p>
        </form>
    </div>
    )
  }
  
export default ProfilePictureSetting
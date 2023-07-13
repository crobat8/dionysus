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
  
import { getAuth, updateProfile } from "firebase/auth";

  const DisplayNameSetting = (props) =>{
    const{currentUser} = useContext(AuthContext);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(currentUser)
      const displayName = e.target[0].value;
      const lowerDisplayName = displayName.toLowerCase();
      const brokenDisplayName = []
        for (var x = 1;x<=lowerDisplayName.length;x++){
            brokenDisplayName.push(lowerDisplayName.substring(0, x))
        }
        
      try{
        const Ref = doc(db, "users", currentUser.uid);
        await updateDoc(Ref, {
          brokenDisplayName,
          lowerDisplayName,
          displayName,
        });
        updateProfile(auth.currentUser,{
          displayName: displayName
        }).then(() => {
          e.preventDefault();
        }).catch((error) => {
          console.log(error)
        });
        
        alert("display name was changed refresh page for it to show")
      }catch(err){
        console.log(err)
      }
  
    }
    
    function CurrentState() {
      return(
        <p>
            {props.currentVal}
        </p>
      )
    }
    
    return(
    <div className="Setting">
      {props.label}
      <br></br>
      <br></br>
        <CurrentState/>
      <br></br>
      <form className="sub" onSubmit={handleSubmit}>
        <input required type="text" placeholder={props.currentVal} />
        <button>Update</button>
      </form>
    </div>
    )
    
  }
  
  export default DisplayNameSetting
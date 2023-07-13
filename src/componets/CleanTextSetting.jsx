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
  
  const CleanTextSetting = (props) =>{
    const{currentUser} = useContext(AuthContext);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(e)
      const newTextSetting = e.target[0].value;
      console.log(newTextSetting)

      try{
        const Ref = doc(db, "users", currentUser.uid);
        await updateDoc(Ref, {
          cleanText: newTextSetting
        });
        e.preventDefault();
        alert("setting was updated")
      }catch(err){
        console.log(err)
      }
  
    }
    
    function CurrentState() {
      if(props.currentVal == 0){
        return(
          <p>
            cleanText is on
          </p>
        )
        
      }else if(props.currentVal == 1){
        return(
          <p>
            cleanText is partially on 
          </p>
        )
        
      }else {
        return(
          <p>
            cleanText is off
          </p>
        )
      }
    }
    
    return(
    <div className="Setting">
      {props.label}
      <br></br>
      <br></br>
        <CurrentState/>
      <br></br>
      <form className="sub" onSubmit={handleSubmit}>
        <label for="Event" >
          select what to change it to
          <select required id='EventType' name="EventType">
            <option value="0">censor text on</option>
            {/* <option value="1">censor text partial</option> */}
            <option value="2">censor text off</option>
          </select>
        </label>
      <button>Update</button>
    </form>
    </div>
    )
    
  }
  
  export default CleanTextSetting
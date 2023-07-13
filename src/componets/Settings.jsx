import React,{
  useState,
  useContext 
} from "react";

import { 
  AuthContext 
} from "../context/AuthContext";

import { auth, db, storage } from "../firebase";

import { 
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where, 
} from "firebase/firestore";
import CleanTextSetting from "./CleanTextSetting";

const Settings = () =>{
  const{currentUser} = useContext(AuthContext);
  const[loading,setLoading] = useState(true)
  const [myData,setMyData]     = useState([]);

  function getMe(){
    const meRef = query(collection(db,"users")
                  ,where("uid","==",currentUser.uid))
    onSnapshot(meRef,(snapshot)=>{
      setMyData(snapshot.docs.map(doc=>doc.data()))
      setLoading(false)
    })
  }

  if(loading){
    getMe();
    
    return(
      <h1>
        Loading Settings
      </h1>
    )
  }else{
    console.log(myData)
  }
  return (
    
    <div className="Settings">
      <CleanTextSetting label={"Clean Text"} currentVal={myData[0].cleanText}/>
      {/* <Setting label={"Display Name"} currentVal={myData[0].displayName}/>
      <Setting label={"Profile Picture"} currentVal={myData[0].photoURL}/> */}
    </div>
  )
}

export default Settings
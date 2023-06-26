import React,{useState,useRef,useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import {  db  } from "../firebase";
import { doc, setDoc } from "firebase/firestore";


const ChatInput = (props) =>{
  const{currentUser} = useContext(AuthContext);
  const id = props.id
  const handleSubmit = async (e) => {
    
    const text    = e.target[0].value;
    const sentBy  = currentUser.uid;
    const sentName= currentUser.displayName
    try{
      let date = await new Date().getTime();

      setDoc(doc(db, "Chats", date+currentUser.uid), {
        date,
        text,
        sentBy,
        id,
        sentName,
      });
      e.preventDefault();
      console.log(e.target[0].value)
      e.target[0].value = ""
    }catch(err){
      console.log(err)
    }

  }

  return(
    <form className='chatInput' onSubmit={handleSubmit}>
      <input required id="TextInput" name="TextInput" placeholder='Message'/>
      <button>Send</button>
    </form>
      
  )
}
 export default ChatInput;
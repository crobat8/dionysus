import React,{useState,useRef,useContext} from 'react'
import { AuthContext } from "../context/AuthContext";
import {  db  } from "../firebase";
import { doc, setDoc } from "firebase/firestore";


const ChatInput = (props) =>{
  const{currentUser} = useContext(AuthContext);
  const id = props.id
  const handleSubmit = async (e) => {
   
    const text = e.target[0].value;
    const sentBy = currentUser.uid;
    try{
      let date = await new Date().getTime();

      /*
        date = date.toString();
        const day= new Date();
        let text = day.toString();
        const result = text.substring(0,15);
        const saveSpot = result +" " + currentUser.uid +" Disc"
      */
     
      //console.log(date)
      setDoc(doc(db, "Chats", date+currentUser.uid), {
          date,
          text,
          sentBy,
          id,
          
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
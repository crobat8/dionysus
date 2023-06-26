import React,{
  useState,
  useContext
} from 'react'

import { 
  AuthContext 
} from "../context/AuthContext";

import {  
  db  
} from "../firebase";

import { 
  query,
  where,
  orderBy,
  collection,
  onSnapshot
} from "firebase/firestore";

const ChatOutput = (props) =>{
  var id = props.id;
  const [loading,setLoading] =useState(true);
  const [messages,setMessages]=useState();
  const{currentUser} = useContext(AuthContext);

  function getMessages(){
      const messageRef =query(collection(db,"Chats")
                        ,where("id" , "==", id)
                        ,orderBy("date"))
      onSnapshot(messageRef,(snapshot)=>{
        setMessages(snapshot.docs.map(doc=>doc.data()))
        setLoading(false);
      })
  }

  if(loading){
    getMessages()
    return(
      <h1>
        Loading
      </h1>
    )
  }

  return(
    <div className='messageHolder'>
      {messages.map((e)=>{
        if(e.sentBy === currentUser.uid){
          return(
            <p className='mychat' >
              {e.text}
            </p>
          )   
        }else{
          return(
            <div>
              <p className='theychat'>
                {e.text}
              </p>
              <p className='sentMarker'>
                {e.sentName}
              </p>
            </div>
          )
        }
      })}
    </div>
  )
}
 export default ChatOutput;
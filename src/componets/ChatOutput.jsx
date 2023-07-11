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

import Filter from 'bad-words'

const ChatOutput = (props) =>{
  var id = props.id;
  const [loading,setLoading] =useState(true);
  const [messages,setMessages]=useState();
  const{currentUser} = useContext(AuthContext);
  
  const filter = new Filter();
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
        var cleaned = filter.clean(e.text)
        if(e.sentBy === currentUser.uid){
          return(
            <p className='mychat' >
              {cleaned}
            </p>
          )   
        }else{
          return(
            <div>
              <p className='theychat'>
                {cleaned}
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
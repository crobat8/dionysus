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
  
  //lets users choose if they want to see profanity
  const cleanTxt = 0
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

        var text;
        //different levels of filter for chat
        if(cleanTxt == 0){
          text = filter.clean(e.text)
        }else if(cleanTxt == 1){
          text = e.text
        }else{
          text = e.text
        }
        
        if(e.sentBy === currentUser.uid){
          return(
            <p className='mychat' >
              {text}
            </p>
          )   
        }else{
          return(
            <div>
              <p className='theychat'>
                {text}
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
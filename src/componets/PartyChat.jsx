import React,{
  useState,
  useContext 
} from "react";

import { 
  AuthContext 
} from "../context/AuthContext";

import ChatOutput from "./ChatOutput";
import ChatInput from "./ChatInput";

const PartyChat = (props) =>{
  const{currentUser} = useContext(AuthContext);
  var e =props.event

  return(
    <div className="fullChat">
      <ChatOutput id={e.id} cleanText = {props.cleanText}/>
      {currentUser.uid == "BqJmqRQc2gQnSoHZVwoH8Q99uya2"
        ?
        <h4>
          sending messages is disabled on guest account 
        </h4>
        :
        <ChatInput id={e.id}/>
      }
      
    </div>
  )
}
 export default PartyChat;
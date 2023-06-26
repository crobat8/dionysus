import React from "react";
import ChatOutput from "./ChatOutput";
import ChatInput from "./ChatInput";

const PartyChat = (props) =>{
  var e =props.event
  console.log(e);
  return(
    <div className="fullChat">
      <ChatOutput id={e.id}/>
      <ChatInput id={e.id}/>
    </div>
  )
}
 export default PartyChat;
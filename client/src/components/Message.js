import React from "react";
import "./Message.css";

const Message = ({ message }) => {

 
  return message.messageType === "AI" ? (
    
    <div className="user-message">
    <div className="message-sender">GPT</div>
    <div className="message-text">{message.messageBody}</div>
    <div className="message-time">
      {new Date(message.createdAt).toLocaleTimeString()}
    </div>
  </div>
  ) : (
    <div className="ai-message">
      <div className="message-sender">You</div>
      <div className="message-text">{message.messageBody}</div>
      <div className="message-time">
        {new Date(message.createdAt).toLocaleTimeString()}
      </div>
    </div>
    
  );
};

export default Message;

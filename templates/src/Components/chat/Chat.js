import React, { useState } from "react";
import ChatContainer from "./ChatContainer";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import "./chatwindow.css";
import { CHAT_USER, APIBASE_DETAIL } from "../../constants";
import axios from "axios";

function sendMessageToBot(message){
  const baseURL = APIBASE_DETAIL.messageAPI.endpoint
  const payload = APIBASE_DETAIL.messageAPI.requestBody(message)
  
  // Axios request to send message to bot
  return axios
    .post(baseURL, payload)
    .then(response => {
      return {data: response.data, error: null};
    })
    .catch(error => {
      // Handle errors
      // console.error('Error:', error);
      console.error('status code: ',  error)
      return {data: null, error: error.response.status};
    });
}


function Chat() {
  const [messages, setMessages] = useState([]);


  async function appendMessage(message, isUserMessage=false) {
    setMessages((prevMessages) => [...prevMessages, message]);
    if(isUserMessage){
      const responseData = await sendMessageToBot(message);
      let response = {
        key: "2",
        message: responseData.response,
        sender: CHAT_USER,
        receiver: responseData.receiver
      }
      setMessages((prevMessages) => [...prevMessages, response]);
    }
  }


  return (
    <div className="chat-window">
      <ChatHeader />
      <ChatContainer messages={messages} />
      <ChatFooter appendMessage={appendMessage} />
    </div>
  );
}

export default Chat;
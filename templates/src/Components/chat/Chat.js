import React, { useState } from "react";
import ChatContainer from "./ChatContainer";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import "./chatwindow.css";
import { CHAT_USER, APIBASE_DETAIL } from "../../constants";
import axios from "axios";

function sendMessageToBot(message, promptID){
  const baseURL = APIBASE_DETAIL.messageAPI.endpoint
  const payload = APIBASE_DETAIL.messageAPI.requestBody(message, promptID)
  
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
  const [promptID, setPromptID] = useState(null);

  async function appendMessage(message, isUserMessage=false) {
    setMessages((prevMessages) => [...prevMessages, message]);
    if(isUserMessage){
      const responseData = await sendMessageToBot(message, promptID);
      let response = {
        key: "2",
        message: responseData.data.message,
        sender: CHAT_USER,
        receiver: responseData.data.receiver
      }
      setPromptID(responseData.data.prompt_id);
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
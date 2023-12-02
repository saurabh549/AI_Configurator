import { useEffect, useState } from "react";
import { MDBTooltip } from "mdb-react-ui-kit";
import { BASE_USER, CHAT_USER } from "../../constants";

function ChatFooter({appendMessage}){
    const [inputText, setInputText] = useState();
    const [placeholderOpacity, setPlaceholderOpacity] = useState("1");
    const [inputColor, setInputColor] = useState("black");
    const [previousInputColor, setPreviousInputColor] = useState([]);

    


    // sendMessage function sends the message input in the text box
    const sendMessage = () =>{
        const inputMessage = inputText.innerText.trim();
        const message = {
            key: "",
            message: "",
            sender: "",
            receiver: ""
        }
        if (inputMessage !== ""){
            message.key = "2";
            message.message = inputMessage;
            message.sender = BASE_USER;
            message.receiver = CHAT_USER;
            appendMessage(message, true);
            inputText.innerText="";
            setPlaceholderOpacity("1");
            // setInputColor(colors.default);
            setPreviousInputColor([]);
        }
    }

    useEffect(()=>{
        setInputText(document.getElementById("input-text"));
    },[inputText]);

    const setFocus = () => {
        document.getElementById('input-text').focus();
    }

    const handleInput = (e) => {
        const inputText = e.target.innerText
        setPlaceholderOpacity( () => {
            return inputText !== "" ? "0" : "1"; 
        });
    };

    const popLastColor = () => {
        setPreviousInputColor((previousInputColor) => previousInputColor.slice(0, -1));
      };
    

    // handles the keypress like backspace for special character feature 
    const handleKeyDown = (e) => {
        if(e.key === "#" && inputText.innerText === ""){
            setPreviousInputColor((previousInputColor) => [...previousInputColor,inputColor]);
            // setInputColor(colors.hash);
        }
        if(e.key === " "){
           
            setPreviousInputColor((previousInputColor) => [...previousInputColor,inputColor])
            // setInputColor(colors.default);
        }
        if(e.keyCode === 8){
            if (e.target.innerText === "#" || inputText.innerText.toLowerCase().endsWith(" ")){
                setInputColor(previousInputColor[previousInputColor.length - 1]);
                popLastColor();
            } 
        }
        
        
    }
    
    return(
        <>
        <div className="chat-footer">
            {/* refer this for input box https://codepen.io/apodacaduron/pen/vYBrLox?css-preprocessor=less*/}
            <div id="user-input" onClick={setFocus}>
                <div className="input-text-group">
                <div
                  id="input-text"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  data-tab="10"
                  data-lexical-editor="true"
                  tabIndex={10}
                  onInput={handleInput}
                  // onKeyDown={handleKeyDown}
                  // style={{ color: inputColor }}
                ></div>
                    <div className="input-placeholder" style={{opacity:placeholderOpacity}}>Type a message</div>
                </div>
            </div>
            <div className="input-actions">
                <button type="button" className="send-btn" onClick={sendMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                    </svg>
                </button>
            </div>
        </div>
        </>
    );
}

export default ChatFooter;
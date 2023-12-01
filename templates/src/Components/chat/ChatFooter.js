import { useEffect, useState, useRef } from "react";
import { CHAT_USER, BASE_USER } from "../../constants";

function ChatFooter({ appendMessage, userDetails }) {
  const [inputText, setInputText] = useState("");
  const [placeholderOpacity, setPlaceholderOpacity] = useState("1");

  const inputRef = useRef();

  const sendMessage = () => {
    const inputMessage = inputText.trim();
    const message = {
      key: "2",
      message: inputMessage,
      sender: BASE_USER,
      receiver: CHAT_USER
    };

    if (inputMessage !== "") {
      appendMessage(message, true);
      setInputText("");
      setPlaceholderOpacity("1");
    }
  };

  useEffect(() => {
    setInputText("");
  }, [userDetails]);

  const setFocus = () => {
    inputRef.current.focus();

    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputRef.current);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleInput = (e) => {
    const inputText = e.target.innerText.trim();
    setInputText(inputText);

    setPlaceholderOpacity(inputText !== "" ? "0" : "1");
  };

  return (
    <>
      <div className="chat-footer">
        <div id="user-input" onClick={setFocus}>
          <div className="input-text-group">
            <div
              id="input-text"
              ref={inputRef}
              contentEditable={true}
              suppressContentEditableWarning={true}
              data-tab="10"
              tabIndex={10}
              onInput={handleInput}
            ></div>
            <div className="input-placeholder" style={{ opacity: placeholderOpacity }}>
              Type a message    
            </div>
          </div>
        </div>
        <div className="input-actions">
          <button type="button" className="send-btn" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatFooter;

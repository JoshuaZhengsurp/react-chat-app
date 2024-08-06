import React, { useRef, useState } from "react";

import { IoMdSend } from "react-icons/io";
import { EmojiPicker } from "../components/EmojiPicker";

import style from "./input.module.scss";
import { EmojiClickData } from "emoji-picker-react";

export const MessageInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelected = (emoji: EmojiClickData) => {
    setMessage(message + emoji.emoji);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    setMessage(event.target.value);
  };

  const sendMessage = (event: React.MouseEvent, msg: string) => {
    event.preventDefault();
    if (msg) {
      // handleSendMessage(msg.trim());
      console.log(msg);
      setMessage(msg);
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={style["contain"]}>
      <div className={style["tools-bar"]}>
        <EmojiPicker
          show={showEmojiPicker}
          handleClick={handleEmojiPickerShow}
          handleSelected={handleEmojiSelected}
        />
      </div>
      <div className={style["input-content"]}>
        <textarea
          ref={textareaRef}
          className={style["input-content-style"]}
          placeholder="please input hear"
          value={message}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className={style["input-content-btn"]}
          type="submit"
          title="submit"
          onClick={(e) => sendMessage(e, message)}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

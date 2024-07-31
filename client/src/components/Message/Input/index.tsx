import React, { useState } from "react";

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
    setMessage(event.target.value);
  };

  const sendMessage = (event: React.MouseEvent, msg: string) => {
    event.preventDefault();
    if (msg.trim()) {
      // handleSendMessage(msg.trim());
      console.log(msg);
      setMessage("");
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
      <form className={style["input-content"]}>
        <input
          className={style["input-content-style"]}
          type="text"
          placeholder="please input hear"
          value={message}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className={style["input-content-btn"]}
          type="submit"
          onClick={(e) => sendMessage(e, message)}
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

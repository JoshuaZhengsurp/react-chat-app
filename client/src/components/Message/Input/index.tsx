import React, { useRef, useState } from "react";

import { IoMdSend } from "react-icons/io";
import { EmojiPicker } from "../components/EmojiPicker";

import style from "./input.module.scss";
import { EmojiClickData } from "emoji-picker-react";

/**
 * @todo
 * bug：1. 表情会直接插入尾部
 * bug: 2. 选中时会报错
*/
export const MessageInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  const handleEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelected = (emoji: EmojiClickData) => {
    const updatedMessage = (inputRef.current?.innerHTML || '') + emoji.emoji;
    setMessage(updatedMessage);
    if (inputRef.current) {
      inputRef.current.innerText = updatedMessage; // 同步更新input内容
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      // console.log('handleInputChange', e.currentTarget.innerText, message);
      setMessage(e.currentTarget.innerText);
    }
  };

  // 监听Enter键发送消息
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(message);
    }
  };

  const sendMessage = (msg: string) => {
    if (msg) {
      console.log(msg);
      // push msg
      setMessage("");
      inputRef.current && (inputRef.current.innerHTML = "");
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
        <div
          className={style["input-content-style"]}
          contentEditable
          suppressContentEditableWarning
          ref={inputRef}
          data-placeholder="Message"
          onInput={(e)=>handleInputChange(e)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={style["input-content-btn"]}
          type="submit"
          title="submit"
          onClick={() => sendMessage(message)}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

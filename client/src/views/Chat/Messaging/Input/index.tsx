import React, { useRef, useState } from "react";

import { IoMdSend } from "react-icons/io";
import { EmojiPicker } from "../components/EmojiPicker";

import style from "./input.module.scss";
import { EmojiClickData } from "emoji-picker-react";
import { KEY_CODE_ENTER } from "@/config/constant";

interface MessageInputProps {
  handleEnter?: (message: string) => void;
}

/**
 * @todo
 * 1. bug：表情会直接插入尾部
 * 2. bug: 选中时会报错(部分浏览器会出现，但不影响)
 * 3. bug: 中文输入法，正输入，回车确认时，自动发送数据了
 */
export const MessageInput: React.FC<MessageInputProps> = ({handleEnter}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  const handleEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelected = (emoji: EmojiClickData) => {
    const updatedMessage = (inputRef.current?.innerHTML || "") + emoji.emoji;
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
    if (e.key === "Enter" && e.keyCode === KEY_CODE_ENTER) {
      e.preventDefault();
      sendMessage(message);
    }
  };

  const sendMessage = (msg: string) => {
    if (msg) {
      console.log(msg);
      handleEnter && handleEnter(msg);
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
          onInput={(e) => handleInputChange(e)}
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

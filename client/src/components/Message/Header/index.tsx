import React from "react";
import style from "./header.module.scss";

interface MessageHeaderProps {
  userInfo: User;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({ userInfo }) => {
  return (
    <div className={style["message-header"]}>
      <img src={userInfo?.avatar} alt="avatar" />
      <span>{userInfo?.username}</span>
    </div>
  );
};

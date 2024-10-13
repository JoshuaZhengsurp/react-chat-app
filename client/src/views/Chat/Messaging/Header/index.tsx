import React from "react";
import style from "./header.module.scss";

interface MessageHeaderProps {
  contacteeInfo: User;
}

export const MessageHeader: React.FC<MessageHeaderProps> = ({ contacteeInfo }) => {
  return (
    <div className={style["message-header"]}>
      <img src={contacteeInfo?.avatar} alt="avatar" />
      <span>{contacteeInfo?.username}</span>
    </div>
  );
};

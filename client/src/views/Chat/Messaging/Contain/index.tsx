import React, { Fragment, useEffect, useRef } from "react";
import moment from "moment";
import { useUserStore } from "@/store/module/user";
import style from "./contain.module.scss";

enum positionEnum {
  LEFT,
  RIGHT,
}

interface MessageProps {
  chatItem: ChatItem;
  isContinuous: boolean;
  position: positionEnum;
}
interface MessageContainProps {
  chatRecords: ChatItem[];
}

const Message: React.FC<MessageProps> = ({ chatItem, position }) => {
  return (
    <div
      className={`${style["chat"]} ${
        position === positionEnum.LEFT ? style["left"] : style["right"]
      }`}
    >
      <img className={style["chat-avatar"]} src={chatItem.avatar} alt="" />
      <div className={style["chat-item"]}>
        <div
          className={style["chat-item-username"]}
          style={{ color: chatItem.theme }}
        >
          {chatItem.userName}
        </div>
        <div className={style["chat-item-message"]}>
          <div className={style["detail"]}>{chatItem.message}</div>
          <div className={style["time"]}>
            {moment(chatItem.createTime).format("hh:mm")}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MessageContain: React.FC<MessageContainProps> = ({
  chatRecords,
}) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const messageContainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainRef.current) {
      messageContainRef.current.scrollTo({
        behavior: "instant",
        top: messageContainRef.current.scrollHeight,
      });
    }
  }, [chatRecords]);

  return (
    <div ref={messageContainRef} className={style["contain"]}>
      {chatRecords &&
        chatRecords.map((item) => (
          <Fragment key={item.contactId}>
            <Message
              chatItem={item}
              isContinuous={false}
              position={
                item.userId === userInfo.id
                  ? positionEnum.RIGHT
                  : positionEnum.LEFT
              }
            />
          </Fragment>
        ))}
    </div>
  );
};

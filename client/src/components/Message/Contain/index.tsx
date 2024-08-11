import React, { Fragment } from "react";
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
  return (
    <div className={style["contain"]}>
      {chatRecords.map((item) => (
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

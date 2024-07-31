import React, { Fragment } from "react";
import { useUserStore } from "@/store/module/user";
import style from "./contain.module.scss";

enum positionEnum {
  LEFT,
  RIGHT,
}

type MessageItem = {
  id?: number
  senderId: number
  recevier: number
  message: string
  type: number
  sendTime?: number,
};
interface MessageProps {
  message: MessageItem;
  isContinuous: boolean;
  position: positionEnum;
}

const TEST_DATA: MessageItem[] = [
  {
    senderId: 1,
    message: "sdjhfaf",
    id: 1,
    sendTime: 123123123,
    recevier: 1,
    type: 1,
  },
  {
    senderId: 1,
    message: "sdjhfaf",
    id: 2,
    sendTime: 123123123,
    recevier: 1,
    type: 1,
  },
  {
    senderId: 2,
    message: "sdjhfaf",
    id: 3,
    sendTime: 123123123,
    recevier: 1,
    type: 1,
  },
  {
    senderId: 1,
    message: "sdjhfaf",
    id: 4,
    sendTime: 123123123,
    recevier: 1,
    type: 1,
  },
  {
    senderId: 2,
    message: "sdjhfaf",
    id: 5,
    sendTime: 123123123,
    recevier: 1,
    type: 1,
  },
];

const Message: React.FC<MessageProps> = ({ message }) => {
  return <div>{message.message}</div>;
};

export const MessageContain = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  return (
    <div  className={style["contain"]}>
      {TEST_DATA.map((item) => (
        <Fragment key={item.id}>
          <Message
            message={item}
            isContinuous={false}
            position={
              item.senderId === userInfo.id ? positionEnum.RIGHT : positionEnum.LEFT
            }
          />
        </Fragment>
      ))}
    </div>
  );
};

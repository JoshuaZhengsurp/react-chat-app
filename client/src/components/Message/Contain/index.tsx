import React from "react";
import { useUserStore } from "@/store/module/user";
import style from "./contain.module.scss";

enum positionEnum {
  LEFT,
  RIGHT,
}

type MessageItem = {
  userId: number;
  msg: string;
  id: number;
  timestamp: number;
};
interface MessageProps {
  key: number;
  message: MessageItem;
  isContinuous: boolean;
  position: positionEnum;
}

const TEST_DATA = [
  {
    userId: 1,
    msg: "sdjhfaf",
    id: 1,
    timestamp: 123123123,
  },
  {
    userId: 1,
    msg: "sdjhfaf",
    id: 2,
    timestamp: 123123123,
  },
  {
    userId: 2,
    msg: "sdjhfaf",
    id: 3,
    timestamp: 123123123,
  },
  {
    userId: 1,
    msg: "sdjhfaf",
    id: 4,
    timestamp: 123123123,
  },
  {
    userId: 2,
    msg: "sdjhfaf",
    id: 5,
    timestamp: 123123123,
  },
];

const Message: React.FC<MessageProps> = ({ message, key }) => {
  return <div key={key}>{message.msg}</div>;
};

export const MessageContain = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  return (
    <div>
      {TEST_DATA.map((item) => (
        <Message
          message={item}
          key={item.id}
          isContinuous={false}
          position={
            item.userId === userInfo.id ? positionEnum.RIGHT : positionEnum.LEFT
          }
        />
      ))}
    </div>
  );
};

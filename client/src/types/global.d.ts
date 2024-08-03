export {};
declare global {
  interface User {
    id: number;
    username: string;
    role: number;
    avatar: string;
    email: string;
    [propsName: string]: unknown;
  }

  interface Contact {
    contactId: number;
    type: number;
    lastMessage: string;
    createTime: number;
    updateTime: number;
    contactee?: User;
    room?: Room;
    [propsName: string]: unknown;
  }

  interface Room {
    roomId: number;
    roomName: string;
    avatar: string;

  }

  interface ChatItem {
    contactId: number;
    userId: number;
    contacteeId: number;
    message: string;
    createTime: number;
  }

  interface ChatList {
    contactee?: User;
    chat?: ChatItem[];
  }
  

  interface SettingItem {
    role: number;
    id: number;
    name: string;
    handle?: (...arg: unknown[]) => unknown;
  }
}

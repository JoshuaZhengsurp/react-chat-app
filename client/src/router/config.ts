interface RouteItem {
    pathName: string,
    role: number,
    name?: string,
}
interface RouteList{
  [CHAT]: RouteItem,
  [LOGIN]: RouteItem,
  [REGISTER]: RouteItem,
  [AVATAR]: RouteItem,

  [PropsName: string]: RouteItem;
}

export const CHAT = "/"
export const LOGIN = "/login";
export const REGISTER = "/register";
export const AVATAR = "/avatar"; 
export const ROUTER_WHITE_LIST: RouteList = {
  [CHAT]: {
    pathName: CHAT,
    name: 'Chat',
    role: 0,
  },
  [LOGIN]: {
    pathName: LOGIN,
    name: 'login',
    role: -1,
  },
  [REGISTER]: {
    pathName: REGISTER,
    name: 'register',
    role: -1,
  },
  [AVATAR]: {
    pathName: AVATAR,
    name: 'avatar',
    role: 0,
  },
};

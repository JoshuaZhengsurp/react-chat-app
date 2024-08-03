import { Routes, Route } from "react-router-dom";
import Register from "@/views/Register";
import Chat from "@/views/Chat";
import Login from "@/views/Login";
import Avatar from "@/views/Avatar";

import { AVATAR, CHAT, LOGIN, REGISTER, ROUTER_WHITE_LIST } from "./config";

// todo: map views components
export default function Router() {
  return (
    <Routes>
      <Route path={ROUTER_WHITE_LIST[LOGIN].pathName} element={<Login />} />
      <Route path={ROUTER_WHITE_LIST[REGISTER].pathName} element={<Register />} />
      <Route path={ROUTER_WHITE_LIST[AVATAR].pathName} element={<Avatar />} />
      <Route path={ROUTER_WHITE_LIST[CHAT].pathName} element={<Chat />} />
    </Routes>
  );
}

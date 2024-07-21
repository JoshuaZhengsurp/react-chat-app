import { Routes, Route } from "react-router-dom";
import Register from "@/pages/Register";
import Chat from "@/pages/Chat";
import Login from "@/pages/Login";
import Avatar from "@/pages/Avatar";


export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/avatar" element={<Avatar />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}

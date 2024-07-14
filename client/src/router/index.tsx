import { Routes, Route } from "react-router-dom";
import Register from "@/pages/Register/index";
import Chat from "@/pages/Chat";
import Login from "@/pages/Login";

export default function Router() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}

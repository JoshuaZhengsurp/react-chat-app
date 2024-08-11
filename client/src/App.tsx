import { ToastContainer } from "react-toastify";
import Router from "@/router";
import Auth from "@/components/Auth";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Auth>
        <Router />
      </Auth>
      <ToastContainer />
    </>
  );
}

export default App;

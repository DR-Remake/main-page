import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./comps/Front/Register/Register.jsx";
import Home from "./comps/Pages/Home/Home.jsx";
import "./mainStyle.css";
import NotFound from "./comps/Pages/NotFound.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Login from "./comps/Front/Login/Login.jsx";
import Lobby from "./comps/Pages/Lobby/Lobby.jsx";
import AdminLogin from "./comps/Admin/AdminLogin/AdminLogin.jsx";
import AdminHome from "./comps/Admin/AdminHome/AdminHome.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./socket.jsx";
import SetNewPassword from "./comps/Admin/SetNewPassword/SetNewPassword.jsx";

ReactDOM.createRoot(document.getElementById("drr")).render(
  <Provider store={store}>
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/user/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/drr/home" element={<Home />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/lobby" element={<Lobby />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/setNewPassword" element={<SetNewPassword />} />
        </Routes>
      </Router>
      <ToastContainer />
    </SocketProvider>
  </Provider>
);

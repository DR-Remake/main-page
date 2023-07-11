import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './comps/Front/Register/Register.jsx'
import Login from './comps/Front/Login/Login.jsx'
import "./mainStyle.css";
import NotFound from './comps/Pages/NotFound.jsx'

ReactDOM.createRoot(document.getElementById("drr")).render(
  <Router>
    <Routes>
      <Route path="/user/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />

      {/* <Route path="/user/login" element={<Login />} /> */}
      {/* <Route path="/drr/home" element={<DRRHome />} />
      <Route path="/drr/shop" element={<DRRShop />} />
      <Route path="/drr/leaderboards" element={<DRRLeaderboards />} />
      <Route path="/drr/aboutme" element={<DRRAboutMe />} /> */}
    </Routes>
  </Router>
);

import React from "react";
import Register from "../Register/Register";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/user/register")}>register</button>

      <Register excludeInputs={['username', 'confirmPassword', 'date']} />
    </div>
  );
}

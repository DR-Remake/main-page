import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../../redux/inputsSlice";
import "./regStyle.css";

export default function Register() {
  const dispatch = useDispatch();
  const { input1, input2, input3 } = useSelector((state) => state.inputs);

  const handleInputChange = (inputName, e) => {
    const { value } = e.target;
    dispatch(setInputValue({ inputName, value }));
  };

  return (
    <div className="RegisterComp">
      <div className="title">
        <p>Register</p>
      </div>
      <form>
        <input
          type="text"
          value={input1}
          onChange={(e) => handleInputChange("input1", e)}
        />
        <input
          type="text"
          value={input2}
          onChange={(e) => handleInputChange("input2", e)}
        />
        <input
          type="text"
          value={input3}
          onChange={(e) => handleInputChange("input3", e)}
        />
      </form>
    </div>
  );
}

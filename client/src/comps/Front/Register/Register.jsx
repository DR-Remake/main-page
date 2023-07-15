import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../../redux/inputsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./regStyle.css";

export default function Register({ excludeInputs = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [db, setDB] = useState({});

  const [theInputs, setTheInputs] = useState([
    {
      name: "username",
      defaultValue: "",
    },
    {
      name: "email",
      defaultValue: "",
    },
    {
      name: "password",
      defaultValue: "",
    },
    {
      name: "confirmPassword",
      defaultValue: "",
    },
    {
      name: "date",
      defaultValue: "",
    },
  ]);

  useEffect(() => {
    const getDB = async () => {
      try {
        const res = await axios
          .get("http://localhost:5174/users/getUsers")
          .then((res) => {
            setDB(res);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getDB();
  }, []);

  const handleInputChange = (inputName, e) => {
    const { value } = e.target;
    dispatch(setInputValue({ inputName, value }));
  };

  return (
    <div className="RegisterComp">
      <div className="title">
        <p>{excludeInputs.length !== 0 ? 'Login' : 'Register'}</p>
      </div>
      {/* <button onClick={() => navigate(excludeInputs !== 0 ? "/drr/home" : '')}>home</button> */}
      <form>
        {theInputs.map((input) =>
          excludeInputs.includes(input.name) ? null : (
            <input
              key={input.name}
              value={useSelector((state) => state.inputs[input.name])}
              type="text"
              onChange={(e) => handleInputChange(input.name, e)}
            />
          )
        )}
      </form>
    </div>
  );
}

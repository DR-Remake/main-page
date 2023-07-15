import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../../redux/inputsSlice";
import axios from "axios";
import "./regStyle.css";

export default function Register() {
  const dispatch = useDispatch();

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
        <p>Register</p>
      </div>
      <form>
        {theInputs.map((input) => (
          <input
            key={input.name}
            value={useSelector((state) => state.inputs[input.name])}
            type="text"
            onChange={(e) => handleInputChange(input.name, e)}
          />
        ))}
      </form>
    </div>
  );
}

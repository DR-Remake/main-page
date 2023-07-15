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
    <div className="RegisterComp combineW combineH flex jcac">
      <div className="square">
        <div className="title flex">
          <p className="gradientText">
            {excludeInputs.length !== 0 ? "Login" : "Register"}
          </p>
          {excludeInputs.length === 0 ? (
            <>
              <h3>Already a rampager?</h3>
              <button onClick={() => navigate("/user/login")}>Login</button>
            </>
          ) : (
            <button onClick={() => navigate("/user/register")}>Register</button>
          )}
          <button onClick={() => navigate("/drr/home")}>home</button>
        </div>
        <form className="registerForm flex">
          {theInputs.map((input, index) =>
            excludeInputs.includes(input.name) ? null : (
              <div className="tab combineW combineH flex">
                <div className="left">
                  {index === 0 && (
                    <>
                      <p>
                        You wake up on a weird place, know nothing about what
                        happened to you.
                      </p>
                      <p>
                        You start looking around, and by time goes it gets more
                        and more confusing.
                      </p>
                      <p>Suddenly, a blurry dark creature arrives near you.</p>
                      <p>
                        As they get closer, a windy voice reaches your mind ~{" "}
                        <span>Who is this brave soul that violated my peace?</span>
                      </p>
                      <input
                        key={input.name}
                        placeholder={input.name}
                        value={useSelector((state) => state.inputs[input.name])}
                        type="text"
                        onChange={(e) => handleInputChange(input.name, e)}
                      />
                    </>
                  )}
                </div>
                <div className="right">
                  <p>right</p>
                </div>
              </div>
            )
          )}
        </form>
      </div>
    </div>
  );
}

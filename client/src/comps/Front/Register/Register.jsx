import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../../redux/inputsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./regStyle.css";
import { AiOutlineHome } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';


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
        <div className="topPart flex">
          <p className="gradientText flex jcac">
            {excludeInputs.length !== 0 ? "Login" : "Registration"}
          </p>
          {excludeInputs.length === 0 ? (
            <>
              {/* <h4>Already a rampager?</h4> */}
              <button
                className="flex jcac combineW combineH trans gradientText"
                onClick={() => navigate("/user/login")}
              >
                <FiLogIn/>Login
              </button>
            </>
          ) : (
            <button className="flex jcac trans gradientText" onClick={() => navigate("/user/register")}>Registeration</button>
          )}
          <button className="flex jcac trans gradientText" onClick={() => navigate("/drr/home")}><AiOutlineHome/>home</button>
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
                        <span>
                          Who is this brave soul that violated my peace?
                        </span>
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
                <div className="right blackBG trans">
                  <div className="eyes">
                    <p></p>
                    <p></p>
                  </div>
                </div>
              </div>
            )
          )}
        </form>
      </div>
    </div>
  );
}

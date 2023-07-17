import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../../redux/inputsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./regStyle.css";
import "../../../mainStyle.css";
import {
  AiOutlineHome,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";

export default function Register({ excludeInputs = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [requiredWidth, setRequiredWidth] = useState(0);

  const firstText = (
    <>
      <h1>
        Chapter 1 | <span>Username</span>
      </h1>
      <p>
        You wake up on a dark place, know nothing about what happened to you.
      </p>
      <p>
        You start looking around, and by time goes it gets more and more
        confusing.
      </p>
      <p>Suddenly, a blurry dark creature arrives near you.</p>
      <p>As they get closer, a windy voice reaches your mind,</p>
      <p className="evil shake">
        - Who is this brave soul that violated my peace?
      </p>
    </>
  );

  const secondText = (
    <>
      <h1>
        Chapter 2 | <span>Email</span>
      </h1>
      <p>Without any hesitation, you decided running.</p>
      <p>You could feel the thrilling that surrounded your body.</p>
      <p>As it becomes less dark, you notice a weird address on your hand.</p>
      <p className="user">- Was it always there?</p>
      <p className="user">I can't remember. Let me try reading it...</p>
    </>
  );

  const formRef = useRef(null);

  const [db, setDB] = useState({});

  const [theInputs, setTheInputs] = useState([
    {
      name: "Username",
      defaultValue: "",
    },
    {
      name: "Email",
      defaultValue: "",
    },
    {
      name: "Password",
      defaultValue: "",
    },
    {
      name: "confirmPassword",
      defaultValue: "",
    },
    {
      name: "Date",
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
        // console.log(res);
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

  const clickedButton = (number) => {
    const newRequiredWidth =
      number === 1 ? -formRef.current.offsetWidth : formRef.current.offsetWidth;
    setRequiredWidth((prev) => prev + newRequiredWidth);
  };

  useEffect(() => {
    const maxWidth = theInputs.length * formRef.current.offsetWidth;

    if (requiredWidth <= 0) {
      setRequiredWidth(0);
    } else if (requiredWidth >= maxWidth) {
      setRequiredWidth(maxWidth - formRef.current.offsetWidth);
    }

    formRef.current.scrollTo({
      left: requiredWidth,
      behavior: "smooth",
    });
  }, [requiredWidth]);

  return (
    <div className="RegisterComp combineW combineH flex jcac">
      <div className="square bRadius">
        <div className="topPart flex">
          <p className="gradientText flex jcac">
            {excludeInputs.length !== 0 ? "Login" : "Registration"}
          </p>
          {excludeInputs.length === 0 ? (
            <>
              {/* <h4>Already a rampager?</h4> */}
              <button
                className="flex jcac combineW combineH trans gradientText bRadius pointer"
                onClick={() => navigate("/user/login")}
              >
                <FiLogIn />
                Login
              </button>
            </>
          ) : (
            <button
              className="flex jcac trans gradientText bRadius pointer"
              onClick={() => navigate("/user/register")}
            >
              Registeration
            </button>
          )}
          <button
            className="flex jcac trans gradientText bRadius pointer"
            onClick={() => navigate("/drr/home")}
          >
            <AiOutlineHome />
            home
          </button>
        </div>
        <form className="registerForm flex" ref={formRef}>
          {theInputs.map((input, index) =>
            excludeInputs.includes(input.name) ? null : (
              <div key={index} className="tab combineW combineH flex">
                <div className="left flex">
                  {index === 0 ? (
                    <>
                      {firstText}
                      <div className="myName combineW flex jcac">
                        <p className="user">- My name is</p>
                        <input
                          className="trans bRadius"
                          key={input.name}
                          placeholder={`Your ${input.name}...`}
                          value={useSelector(
                            (state) => state.inputs[input.name]
                          )}
                          type="text"
                          onChange={(e) => handleInputChange(input.name, e)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                    {secondText}
                    <div className="myName combineW flex jcac">
                      <p className="user">It says</p>
                      <input
                        className="trans bRadius"
                        key={input.name}
                        placeholder={`Your ${input.name}...`}
                        value={useSelector(
                          (state) => state.inputs[input.name]
                        )}
                        type="text"
                        onChange={(e) => handleInputChange(input.name, e)}
                      />
                    </div>
                  </>
                  )}
                </div>
                <div className="right blackBG trans bRadius">
                  <div className={`flex jcac combineH ${index === 0 ? 'eyes' : 'running'}`}>
                    <p className="trans"></p>
                    <p className="trans"></p>
                  </div>
                </div>
              </div>
            )
          )}
        </form>
        <div className="buttons flex jcac combineW">
          <button
            onClick={() => clickedButton(1)}
            className="bRadius pointer trans flex jcac"
          >
            <AiOutlineArrowLeft />
            Surrender
          </button>
          <button
            onClick={() => clickedButton(2)}
            className="bRadius pointer trans flex jcac"
          >
            Continue
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

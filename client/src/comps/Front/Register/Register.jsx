import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../../redux/inputsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./regStyle.css";
import "../../../mainStyle.css";
import ReCAPTCHA from "react-google-recaptcha";
import {
  AiOutlineHome,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillHeart,
} from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { GiFamilyHouse } from "react-icons/gi";


export default function Register({ excludeInputs = [] }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const siteKey = import.meta.env.CAPTCHAKEY;
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
      <p>You could feel the thrilling that surroundes your body.</p>
      <p>As it becomes less dark, you notice a weird address on your hand.</p>
      <p className="user">- Was it always there?</p>
      <p className="user">I can't remember. Let me try reading it...</p>
    </>
  );

  const thirdText = (
    <>
      <h1>
        Chapter 3 | <span>Password</span>
      </h1>
      <p>As you keep on running, you feel your breath running out.</p>
      <p className="user">- I can see a building ahead of me.</p>
      <p className="user">It's my only chance, I must hide there.</p>
      <p>As you get more close to the door, things don't seem on your side...</p>
      <p className="user">- Crap! It is protected with a combination lock!</p>
      <p className="user">There must be any clues... Aha! a paper.</p>
    </>
  );

  const fourthText = (
    <>
       <h1>
         Chapter 4 | <span>Confirm Password</span>
       </h1>
        <p className="user">- I think it's working!</p>
        <p className="user">Just placing the last digit...</p>
        <p className="user">and.. LET'S G-nothing? really?</p>
        <p className="user">No no NO it has to work!!!</p>
     </>
  )

  const fifthText = (
    <>
    <h1>
      Chapter 5 | <span>Date of birth</span>
    </h1>
    <p className="user">- I think I'm finally -</p>
    <p className="evil">- Finally? finally what?</p>
    <p className="evil">You made your worst mistake.</p>
    <p className="evil">Are you even old enough to fight me?</p>
    <p className="user">- (fight?!?) Yes I am.</p>
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
      name: "ConfirmPassword",
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
                  ) : index === 1 ? (
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
                  ) : index === 2 ? (
                    <>
                      {thirdText}
                      <div className="myName combineW flex jcac">
                        <p>"To open the door, place</p>
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
                        <p>"</p>
                      </div>
                    </>
                  ) : index === 3 ? (
                    <>
                      {fourthText}
                      <div className="myName combineW flex jcac">
                        <input
                          className="trans bRadius"
                          key={input.name}
                          placeholder={`${input.name.replace('m', 'm ')}...`}
                          value={useSelector(
                            (state) => state.inputs[input.name]
                          )}
                          type="text"
                          onChange={(e) => handleInputChange(input.name, e)}
                        />
                      </div>
                    </>
                  ) : index === 4 ? (
                    <>
                      {fifthText}
                      <div className="myName combineW flex jcac">
                        <p className="user">My date is</p>
                        <input
                          className="trans bRadius"
                          key={input.name}
                          placeholder={`Your ${input.name} of Birth...`}
                          value={useSelector(
                            (state) => state.inputs[input.name]
                          )}
                          type="date"
                          onChange={(e) => handleInputChange(input.name, e)}
                        />
                          <ReCAPTCHA sitekey={siteKey} />
                      </div>
                    </>
                  ) : ''}
                </div>
                <div className={`right blackBG trans bRadius ${index === 1 && 'panic'}`}>
                  <div
                    className={`flex jcac combineH ${
                      index === 0 ? "eyes" : index === 1 ? "running" : index === 2 ? 'house'
                    : "checkAgain shake"}`}
                  >
                    <p className="trans flex jcac bRadius">{index === 1 ? <AiFillHeart /> : index === 2 ? <GiFamilyHouse/> : ''}</p>
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

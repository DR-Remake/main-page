import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../../redux/inputsSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "./regStyle.css";
import "../../../mainStyle.css";
import {
  AiOutlineHome,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiFillHeart,
} from "react-icons/ai";
import { Toaster } from "../../HelperFunctions/toastify";
import { GiFamilyHouse } from "react-icons/gi";
import { LuCrown } from "react-icons/lu";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import TopPart from "../TopPart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toggleEye } from "../../../redux/giveOppositeSegments/eyeSlice";
import { postRequest } from "../../HelperFunctions/requests";

export default function Register({ excludeInputs = [] }) {
  const {
    VITE_SERVER_PORT,
    VITE_VERIFY,
    VITE_USERS,
    VITE_USER_POSTUSER,
    VITE_CAPTCHA,
    VITE_USER_CHECKUSERNAME,
  } = import.meta.env;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputsState = useSelector((state) => state.inputs);
  const [currentPage, setCurrentPage] = useState(0);

  const [changeText, setChangeText] = useState("");

  //reCAPTCHA
  const siteKey = import.meta.env.VITE_SITE_KEY;
  useEffect(() => {
    const loadRecaptcha = async () => {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });
    };
    loadRecaptcha();
  }, [siteKey]);

  const handleRecaptchaSuccess = async (token) => {
    const res = await postRequest(
      `${VITE_SERVER_PORT}/${VITE_VERIFY}/${VITE_CAPTCHA}`,
      true
    );
    if (res.data.success) {
      setAccessSend(true);
      Toaster("success", "reCAPTCHA verification successful");
    } else {
      Toaster("error", "reCAPTCHA verification failed");
    }
  };

  const [stringValue, setStringValue] = useState("");
  const [accessSend, setAccessSend] = useState(true);

  const handleRecaptchaError = () => {
    Toaster("error", "reCAPTCHA error");
  };

  const executeRecaptcha = (e) => {
    e.preventDefault();
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(siteKey, { action: "submit" })
        .then(handleRecaptchaSuccess)
        .catch(handleRecaptchaError);
    });
  };
  //reCAPTCHA

  const [showDialog, setShowDialog] = useState(false);

  const handleDialog = (string) => {
    string === "open"
      ? setShowDialog((prev) => (prev === false ? true : false))
      : setShowDialog(false);
  };

  const [requiredWidth, setRequiredWidth] = useState(0);

  const generateEventHandlers = () => ({
    onClick: () => handleDialog("open"),
    onMouseEnter: () => handleDialog("open"),
    onMouseLeave: () => handleDialog("close"),
  });

  const firstText = (
    <>
      <h1 className="relative" {...generateEventHandlers()}>
        Chapter 1 | <span>Username</span>
        <span className="makeSure">
          <BsFillInfoCircleFill />
        </span>
        <div
          style={{ left: `${requiredWidth}px` }}
          className={`popUp absolute bRadius bShadow trans ${
            showDialog ? "show" : "hide"
          }`}
        >
          {currentPage === 0 ? (
            <p>
              Your username must be appropriate, any usernames that will break
              the rules will be banned with no warnings!
            </p>
          ) : currentPage === 1 ? (
            <>
              <p>Your email must be valid.</p>
              <p>
                A message will be sent to you after a succesful registeration.
              </p>
            </>
          ) : currentPage === 2 ? (
            <>
              <p>Your password must be above or equal to 8 letters.</p>
              <p>Your password must contain an Upper-Case letter.</p>
              <p>Your password must contain at least 1 special letter.</p>
            </>
          ) : currentPage === 4 ? (
            <p>You must be above 12 years old to play.</p>
          ) : (
            currentPage === 5 && (
              <p>
                Upon clicking,
                <br /> 'Verify and accept T&C' <br />
                you are agreeing to the Terms & Conditions.
              </p>
            )
          )}
        </div>
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
      <p className="evil shake">- {changeText}</p>
    </>
  );

  const secondText = (
    <>
      <h1 {...generateEventHandlers()}>
        Chapter 2 | <span>Email</span>
        <span className="makeSure">
          <BsFillInfoCircleFill />
        </span>
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
      <h1 {...generateEventHandlers()}>
        Chapter 3 | <span>Password</span>
        <span className="makeSure">
          <BsFillInfoCircleFill />
        </span>
      </h1>
      <p>As you keep on running, you feel your breath running out.</p>
      <p className="user">- I can see a building ahead of me.</p>
      <p>
        As you get more close to the door, things don't seem on your side...
      </p>
      <p className="user">- Crap! It is protected with a combination lock!</p>
      <p className="user">There must be any clues... Aha! a paper.</p>
    </>
  );

  const fourthText = (
    <>
      <h1>
        Chapter 4 | <span {...generateEventHandlers()}>Confirm Password</span>
      </h1>
      <p className="user">- I think it's working!</p>
      <p className="user">Just placing the last digit...</p>
      <p className="user">and.. LET'S G-nothing? really?</p>
      <p className="user">No no NO it has to work!!!</p>
    </>
  );

  const fifthText = (
    <>
      <h1 {...generateEventHandlers()}>
        Chapter 5 | <span>Date of birth</span>
        <span className="makeSure">
          <BsFillInfoCircleFill />
        </span>
      </h1>
      <p className="user">- I think I'm finally -</p>
      <p className="evil">- Finally? finally what?</p>
      <p className="evil">You made your worst mistake.</p>
      <p className="evil">Are you even old enough to fight me?</p>
      <p className="user">- (fight?!?) Yes I am.</p>
    </>
  );
  const sixthText = (
    <>
      <h1 {...generateEventHandlers()}>
        Chapter 6 | <span>Verification</span>
        <span className="makeSure">
          <BsFillInfoCircleFill />
        </span>
      </h1>
      <p className="evil">- Finally, after all these years.</p>
      <p className="evil">Stealing loot from these poor civilians...</p>
      <p className="evil">I can strike yet again.</p>
      <p className="user">- Wait a second, that sounds familiar...</p>
      <p className="user">YOU ARE...</p>
      <p>To be continued in game...</p>
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
    {
      name: "Captcha",
    },
  ]);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const res = await postRequest(
          `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_POSTADMINNOPASS}`,
          true,
          { Username: theInputs[0].defaultValue }
        );
        res.data.Username !== ""
          ? setChangeText(`I see, so it's you... ${res.data.Username}`)
          : setChangeText("Who is this brave soul that violated my peace?");
      } catch (err) {
        Toaster("error", err.response.data.err);
        const { Email, Username } = err.response.data.user;
        setChangeText(
          `I've seen ${Email || Username} before, you're not them.`
        );
      }
    };
    checkUsername();
  }, [theInputs[0].defaultValue]);

  useEffect(() => {
    const updatedInputs = theInputs.map((input) => ({
      ...input,
      defaultValue: inputsState[input.name],
    }));
    setTheInputs(updatedInputs);
  }, [inputsState]);

  const handleInputChange = (inputName, e) => {
    const { value } = e.target;
    dispatch(setInputValue({ inputName, value }));
  };

  const clickedButton = (number) => {
    const newRequiredWidth =
      number === 1 ? -formRef.current.offsetWidth : formRef.current.offsetWidth;
    if (number === 1) {
      setCurrentPage((prev) => (prev <= 0 ? 0 : prev - 1));
    } else {
      setCurrentPage((prev) =>
        prev === theInputs.length ? theInputs.length : prev + 1
      );
    }
    setRequiredWidth((prev) => prev + newRequiredWidth);
  };
  useEffect(() => {
    const maxWidth = theInputs.length * formRef.current.offsetWidth;
    if (requiredWidth <= 0) {
      setRequiredWidth(0);
    } else if (requiredWidth >= maxWidth) {
      setRequiredWidth(maxWidth - formRef.current.offsetWidth);
    }

    if (
      requiredWidth >= 0 &&
      requiredWidth >= maxWidth - formRef.current.offsetWidth
    ) {
      setAccessSend(false);
      setStringValue("Finish");
    } else {
      setAccessSend(true);
      setStringValue("Continue");
    }

    formRef.current.scrollTo({
      left: requiredWidth,
      behavior: "smooth",
    });
  }, [requiredWidth]);

  useEffect(() => {
    const checkerSize = window.addEventListener("resize", () => {
      setRequiredWidth(0);
    });

    return () => {
      window.removeEventListener("resize", checkerSize);
    };
  }, []);

  const submitUser = async () => {
    const data = {
      ...Object.fromEntries(
        theInputs.map((input) => [input.name, input.defaultValue])
      ),
      Role: "User",
    };

    //checks if the username is taken
    try {
      const checkUsernameResponse = await postRequest(
        `${VITE_SERVER_PORT}/${VITE_USERS}/${VITE_USER_CHECKUSERNAME}`,
        true,
        {
          Username: data.Username,
        }
      );
      if (checkUsernameResponse.status === 200) {
        const postUserResponse = await postRequest(
          `${VITE_SERVER_PORT}/${VITE_USERS}/${VITE_USER_POSTUSER}`,
          true,
          {
            data,
          }
        );
        if (postUserResponse.status === 200) {
          Toaster("success", "Created user successfully.");
          navigate("/user/login");
        } else {
          console.error("Failed to post user data.");
        }
      } else {
        Toaster("error", "Username already exists.");
      }
    } catch (error) {
      Toaster("error", error.response.data.err);
    }
  };

  const eyeState = useSelector((state) => state.eye);

  const handleToggleEye = () => {
    dispatch(toggleEye());
  };

  return (
    <div className="RegisterComp combineW combineH flex jcac">
      <div className="square bRadius">
        <TopPart />
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
                      <div className="myName combineW flex jcac relative">
                        <p>"To open the door, place</p>
                        <input
                          className="trans bRadius"
                          key={input.name}
                          placeholder={`Your ${input.name}...`}
                          value={useSelector(
                            (state) => state.inputs[input.name]
                          )}
                          type={eyeState === false ? "text" : "password"}
                          onChange={(e) => handleInputChange(input.name, e)}
                        />
                        <p>"</p>
                        <p
                          onClick={handleToggleEye}
                          className="absolute eye flex jcac trans"
                        >
                          {eyeState === true ? (
                            <BsEyeFill />
                          ) : (
                            <BsEyeSlashFill />
                          )}
                        </p>
                      </div>
                    </>
                  ) : index === 3 ? (
                    <>
                      {fourthText}
                      <div className="myName combineW flex jcac relative">
                        <p className="user">Let's see, it looked like...</p>
                        <input
                          className="trans bRadius"
                          key={input.name}
                          placeholder={`${input.name.replace("m", "m ")}...`}
                          value={useSelector(
                            (state) => state.inputs[input.name]
                          )}
                          type={eyeState === false ? "text" : "password"}
                          onChange={(e) => handleInputChange(input.name, e)}
                        />
                        <p
                          onClick={handleToggleEye}
                          className="absolute eye flex jcac trans"
                        >
                          {eyeState === true ? (
                            <BsEyeFill />
                          ) : (
                            <BsEyeSlashFill />
                          )}
                        </p>
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
                      </div>
                    </>
                  ) : (
                    index === 5 && (
                      <>
                        {sixthText}
                        <div className="myName combineW flex jcac">
                          <p>You must be verified, and accept the ToS</p>
                          <button
                            className="flex jcac trans gradientText bRadius pointer"
                            onClick={executeRecaptcha}
                          >
                            Verify & Accept T&S
                          </button>
                        </div>
                      </>
                    )
                  )}
                </div>
                <div
                  className={`right blackBG trans bRadius ${
                    index === 1 && "panic"
                  }`}
                >
                  <div
                    className={`flex jcac combineH ${
                      index === 0
                        ? "eyes"
                        : index === 1
                        ? "running"
                        : index === 2
                        ? "house"
                        : index === 3
                        ? "checkAgain shake"
                        : `dateBirth ${index === 4 ? "blur shake" : "reveal"}`
                    }`}
                  >
                    <p className="trans flex jcac bRadius">
                      {index === 1 ? (
                        <AiFillHeart />
                      ) : index === 2 ? (
                        <GiFamilyHouse />
                      ) : (
                        index >= 4 && <LuCrown />
                      )}
                    </p>
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
            onClick={() => {
              clickedButton(2);
              if (stringValue === "Finish") {
                submitUser();
              }
            }}
            className={`bRadius pointer trans flex jcac ${
              !accessSend ? "stop" : "continue"
            }`}
            disabled={!accessSend}
          >
            {stringValue === "Finish" ? (
              <>
                Finish
                <MdDone />
              </>
            ) : (
              <>
                Continue
                <AiOutlineArrowRight />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

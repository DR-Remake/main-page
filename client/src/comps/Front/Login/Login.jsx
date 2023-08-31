import React, { useEffect, useState } from "react";
import TopPart from "../TopPart";
import "./logStyle.css";
import BarbFire from "../../../assets/barbFire.gif";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleEye } from "../../../redux/giveOppositeSegments/eyeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { Toaster } from "../../HelperFunctions/toastify";
import { postRequest } from "../../HelperFunctions/requests";

export default function Login() {
  const {
    VITE_SERVER_PORT,
    VITE_ADMIN,
    VITE_USERS,
    VITE_USER_LOGINADMIN,
    VITE_USER_LOGINUSER,
  } = import.meta.env;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const eyeState = useSelector((state) => state.eye);

  const location = useLocation();

  const currentPath = location.pathname;

  const handleToggleEye = () => {
    dispatch(toggleEye());
  };

  const [inputs, setInputs] = useState([
    {
      label: currentPath === "/admin/login" ? "Email/Username" : "Email",
      value: "",
      icon:
        currentPath === "/admin/login" ? (
          <AiOutlineUser />
        ) : (
          <MdAlternateEmail />
        ),
    },
    {
      label: "Password",
      value: "",
      icon: <MdPassword />,
    },
  ]);

  const handleInputs = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].value = value;
    setInputs(updatedInputs);
  };

  const loginUser = async () => {
    const dataToSend = {
      Email: inputs[0].value,
      Password: inputs[1].value,
    };
    const url =
      currentPath === "/user/login"
        ? `${VITE_SERVER_PORT}/${VITE_USERS}/${VITE_USER_LOGINUSER}}`
        : `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_USER_LOGINADMIN}}`;
    try {
      const res = await postRequest(url, true, dataToSend);
      if (res) {
        Toaster("success", "Welcome back");
        currentPath === "/user/login"
          ? navigate("/drr/home")
          : navigate("/admin/home");
        const expirationTimeInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        const expirationDate = new Date(
          new Date().getTime() + expirationTimeInMilliseconds
        );
        document.cookie = `t=${
          res.data.token
        }; SameSite=Lax; expires=${expirationDate.toUTCString()}; path=/`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //for emergency if above doesn't work
  // await axios
  //   .post(url, dataToSend)
  //   .then((res) => {
  //     Toaster('success', 'Welcome back');
  //     currentPath === "/user/login"
  //       ? navigate("/drr/home")
  //       : navigate("/admin/home");
  //     const expirationTimeInMilliseconds = 7 * 24 * 60 * 60 * 1000;
  //     const expirationDate = new Date(
  //       new Date().getTime() + expirationTimeInMilliseconds
  //     );
  //     document.cookie = `t=${
  //       res.data.token
  //     }; SameSite=Lax; expires=${expirationDate.toUTCString()}; path=/`;
  //   })
  //   .catch((err) => {
  //      Toaster("error", err.response.data.err);
  //   });

  return (
    <div className="LoginComp combineW combineH flex jcac">
      <div className="square bRadius">
        <TopPart />
        <div className="loginForm flex">
          <div className="inputsArea flex jcac">
            {inputs.map((input, index) => (
              <div className="oneInput combineW flex jcac relative" key={index}>
                {input.icon}
                <input
                  className="trans"
                  value={input.value}
                  onChange={(e) => handleInputs(index, e.target.value)}
                  placeholder={input.label}
                  type={
                    index === 1
                      ? eyeState === false
                        ? "password"
                        : "text"
                      : null
                  }
                />
                {index === 1 && (
                  <p
                    onClick={handleToggleEye}
                    className="absolute eye flex jcac trans"
                  >
                    {eyeState === true ? <BsEyeFill /> : <BsEyeSlashFill />}
                  </p>
                )}
              </div>
            ))}
            <button
              onClick={loginUser}
              className="gradientText bRadius pointer trans"
            >
              Login
            </button>
          </div>
          <div className="movingCharacters combineW flex jcac">
            <img src={BarbFire} alt="Moving Characters" />
          </div>
        </div>
      </div>
    </div>
  );
}

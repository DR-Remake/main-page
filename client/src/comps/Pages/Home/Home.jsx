import React, { useEffect, useState } from "react";
import drrFlag from "../../../assets/flagDRR.png";
import drrVideo from "../../../assets/videoDRR.mp4";
import drrLogo from "../../../assets/logoDRR.gif";
import iconLogo from "../../../assets/iconLogoDRR.png";
import axios from "axios";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { getRequest } from "../../HelperFunctions/requests";

export default function Home() {
  const dummyArrayRemoveLaterYosef = [
    {
      chest: "common_chest",
      key: "common_key",
    },
    {
      chest: "uncommon_chest",
      key: "uncommon_key",
    },
    {
      chest: "rare_chest",
      key: "rare_key",
    },
    {
      chest: "legendary_chest",
      key: "legendary_key",
    },
  ];

  const { VITE_SERVER_PORT, VITE_DASHBOARD } = import.meta.env;

  const navigate = useNavigate();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [neededNav, setNeededNav] = useState([{ name: "Loading..." }]);
  const [width, setWidth] = useState(0);
  const navBarAfter = [
    {
      name: "PLAY NOW",
      path: "/drr/playnow",
    },
    {
      name: <img src={iconLogo} alt="Icon of the company" />,
    },
    {
      name: "Lobby",
      path: "/user/lobby",
    },
  ];
  const navBarBefore = [
    {
      name: "Register",
      path: "/user/register",
    },
    {
      name: <img src={iconLogo} alt="Logo of the company" />,
    },
    {
      name: "Login",
      path: "/user/login",
    },
  ];

  function getCookieValue(cookieName) {
    const theCookie = cookieName;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    let result = cookieArray.map((cookie) => {
      return cookie
        .trim()
        .split("=")
        .filter((word) => word.includes(theCookie));
    });
    return (result = result.filter((arr) => arr.length > 0));
  }

  useEffect(() => {
    const checkOnce = async () => {
      setContentLoaded(true);
      try {
        const res = await getRequest(
          `${VITE_SERVER_PORT}/${VITE_DASHBOARD}/`,
          true
        );
        if (res.status === 200) setNeededNav(navBarAfter);
      } catch (error) {
        setNeededNav(navBarBefore);
      }
    };
    checkOnce();
  }, []);

  const [appear, setAppear] = useState(0);

  useEffect(() => {
    const itemInterval = setInterval(() => {
      setAppear((prev) =>
        prev === dummyArrayRemoveLaterYosef.length - 1 ? 0 : prev + 1
      );
    }, 1200);

    return () => {
      clearInterval(itemInterval);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const flag = (number) => (
    <>
      <div className="flagContainer flex">
        <img className="combineW" src={drrFlag} alt="DRR Flag" />
        <div className="itemMoving flex jcac relative">
          {dummyArrayRemoveLaterYosef.map((dum, index) => {
            return number === 1 ? (
              <p
                key={index}
                className={`absolute trans ${dum.key} bgImage ${
                  appear === index ? "appear" : "no"
                }`}
              ></p>
            ) : (
              <p
                key={index}
                className={`absolute trans ${dum.chest} bgImage ${
                  appear === index ? "appear" : "no"
                }`}
              ></p>
            );
          })}
        </div>
      </div>
    </>
  );

  let theMiddle = navBarBefore[Math.floor(navBarBefore.length / 2)];

  return (
    <div className="Home combineW combineH flex">
      <>
        <div className="videoContainer absolute">
          <video
            className="relative combineW combineH"
            autoPlay
            muted
            loop
            style={{
              width: width || window.innerWidth,
            }}
          >
            <source src={drrVideo} type="video/mp4" />
          </video>
        </div>
        <div className="mainCenter combineW flex">
          {contentLoaded ? (
            <>
              {flag(1)}
              <div className="centerOne flex">
                <div className="navBar flex">
                  {neededNav?.map((nav, index) => {
                    return (
                      <a
                        href={nav.path}
                        // onClick={checkPerClick}
                        key={index}
                        className={`flex jcac trans ${
                          nav === theMiddle ? "big" : "text gradientText"
                        }`}
                      >
                        {nav.name}
                      </a>
                    );
                  })}
                </div>
                <div className="some flex jcac">
                  <p className="gradientText">Dungeon Rampage Remake</p>
                  <img className="combineW" src={drrLogo} alt="Logo" />
                </div>
              </div>
              {flag(2)}
            </>
          ) : (
            <LoadingScreen />
          )}
        </div>
      </>
    </div>
  );
}

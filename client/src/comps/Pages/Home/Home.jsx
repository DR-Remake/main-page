import React, { useEffect, useState } from "react";
import drrFlag from "../../../assets/flagDRR.png";
import drrVideo from "../../../assets/videoDRR.mp4";
import drrLogo from "../../../assets/logoDRR.gif";
import iconLogo from "../../../assets/iconLogoDRR.png";

import key1 from "../../../assets/firstSet/Common_key.png";
import chest1 from "../../../assets/firstSet/Common_chest.png";
import key2 from "../../../assets/firstSet/Uncommon_key_.png";
import chest2 from "../../../assets/firstSet/Uncommon_chest_.png";
import key3 from "../../../assets/firstSet/Rare_key_.png";
import chest3 from "../../../assets/firstSet/Rare_chest_.png";
import key4 from "../../../assets/firstSet/Legendary_key_.png";
import chest4 from "../../../assets/firstSet/Legendary_chest_.png";
import "./home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [width, setWidth] = useState(0);

  const [keys, setKeys] = useState([key1, key2, key3, key4]);
  const [chests, setChests] = useState([chest1, chest2, chest3, chest4]);

  const [appear, setAppear] = useState(0);

  useEffect(() => {
    const itemInterval = setInterval(() => {
      setAppear((prev) =>
        prev === (keys.length - 1 || chests.length - 1) ? 0 : prev + 1
      );
    }, 1200);

    return () => {
      clearInterval(itemInterval);
    };
  }, []);

  const determineWhich = (number) => {
    navigate(
      number === 0 ? "/user/register" : number === 2 ? "/user/login" : null
    );
  };

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
          {number === 1
            ? keys.map((key, index) => {
                return (
                  <img
                    className={`absolute trans ${
                      appear === index ? "appear" : "no"
                    }`}
                    src={key}
                  />
                );
              })
            : chests.map((chest, index) => {
                return (
                  <img
                    className={`absolute trans ${
                      appear === index ? "appear" : "no"
                    }`}
                    src={chest}
                  />
                );
              })}
        </div>
      </div>
    </>
  );

  // const navBar = ["HOME", "SHOP", "PLAY NOW", "CARDS", "ABOUT US"];
  const navBar = ["Register", <img src={iconLogo} />, "Login"];
  let theMiddle = navBar[Math.floor(navBar.length / 2)];

  return (
    <div className="Home combineW combineH flex">
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
        {flag(1)}
        <div className="centerOne flex">
          <div className="navBar flex">
            {navBar.map((nav, index) => {
              return (
                <p
                  onClick={() => determineWhich(index)}
                  key={index}
                  className={`flex jcac trans ${
                    nav === theMiddle ? "big" : "text gradientText"
                  }`}
                >
                  {nav}
                </p>
              );
            })}
          </div>
          <div className="some flex jcac">
            <p className="gradientText">Dungeon Rampage Remake</p>
            <img className="combineW" src={drrLogo} />
          </div>
        </div>
        {flag(2)}
      </div>
    </div>
  );
}

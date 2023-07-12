import React, { useEffect, useState } from "react";
import drrFlag from "../../../assets/flagDRR.png";
import drrVideo from "../../../assets/videoDRR.mp4";
import "./home.css";

export default function Home() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const flag = (
    <>
      <div className="flagContainer">
        <img className="combineW combineH" src={drrFlag} alt="DRR Flag" />
      </div>
    </>
  );

  // const navBar = ["HOME", "SHOP", "PLAY NOW", "CARDS", "ABOUT US"];
  const navBar = ["Register", "Home", "Login"];
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
        {flag}
        <div className="centerOne flex">
          <div className="navBar flex">
            {navBar.map((nav, index) => {
              return (
                <p
                  className={`flex jcac trans ${
                    nav === theMiddle ? "big" : "text gradientText"
                  }`}
                >
                  {nav}
                </p>
              );
            })}
          </div>
          <div className="some"></div>
        </div>
        {flag}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import drrLogo from "../../../assets/logoDRR.gif";
import "./LoadingScreen.css";

function LoadingScreen() {
  const [dotArray, setDotArray] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
        setDotArray((dots) => (dots.length > 3 ? [""] : [...dots, "."]));
    }, 450);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="loadingScreen flex jcac bRadius">
      <img className="effects" src={drrLogo} alt="Logo of the company" />
      <p className="gradientText">loading{dotArray}</p>
    </div>
  );
}

export default LoadingScreen;

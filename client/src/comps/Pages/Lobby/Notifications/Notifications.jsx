import "./Notifications.css";
import { BiNews } from "react-icons/bi";
import { AiFillBell } from "react-icons/ai";
import { useState } from "react";

function Notifications() {
  const [chosenIndex, setChosenIndex] = useState(0);

  const tabs = [
    {
      icon: <BiNews />,
      desc: "News",
    },
    {
      icon: <AiFillBell />,
      desc: "Notifications",
    },
  ];

  const setIndex = (i) => {
    setChosenIndex(i);
  };

  return (
    <div className="Notifications bRadius combineW combineH">
      <div className="select flex relative">
        {tabs.map((tab, i) => {
          return (
            <p
              key={i}
              onClick={() => setIndex(i)}
              className={`combineW pointer trans flex jcac bRadius ${
                chosenIndex === i ? "chosen" : ""
              }`}
            >
              {tab.icon} {tab.desc}
            </p>
          );
        })}
      </div>
      <div className="area"></div>
    </div>
  );
}

export default Notifications;

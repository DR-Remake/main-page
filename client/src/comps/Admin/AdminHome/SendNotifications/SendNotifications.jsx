import Notifications from "./Notifications/Notifications";
import News from "./News/News";
import CurrentMessages from "./CurrentMessages/CurrentMessages";
import {
  FaBullhorn,
  FaCrown,
  FaBold,
  FaItalic,
  FaUnderline,
} from "react-icons/fa";
import { BiNews, BiMessageDetail } from "react-icons/bi";
import "./sendNotifications.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { getRequest } from "../../../HelperFunctions/requests";
import {
  BsPersonCircle,
  BsFillCalendarDateFill,
  BsFillFileEarmarkImageFill,
} from "react-icons/bs";
import { MdOutlineTitle } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";

function SendNotifications() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() - 1;
  const day = date.getDate();

  const {
    VITE_SERVER_PORT,
    VITE_ADMIN,
    VITE_ADMIN_GETSPECADMIN,
    VITE_ADMIN_GETNEWS,
    VITE_ADMIN_GETNOTIFICATIONS,
  } = import.meta.env;

  const [title, setTitle] = useState("");

  const fullDate = `${month}-${day}-${year}`;

  const [goDown, setGoDown] = useState([
    {
      shouldIt: false,
      index: 2,
    },
  ]);

  const [adminsInfo, setAdminsInfo] = useState([
    {
      Username: "",
      Role: "",
    },
  ]);

  useEffect(() => {
    const getAdminsName = async () => {
      try {
        const res = await getRequest(
          `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_GETSPECADMIN}`,
          true
        );
        setAdminsInfo([
          {
            Username: res.data.Username,
            Role: res.data.Role,
          },
        ]);
      } catch (error) {
        // console.log(error);
      }
    };
    getAdminsName();
  }, []);

  const [contactInputs, setContactInputs] = useState([
    {
      Author: adminsInfo[0]?.Username,
      Icon: <BsPersonCircle />,
    },
    {
      Date: fullDate,
      Icon: <BsFillCalendarDateFill />,
    },
    {
      Title: "",
      Icon: <MdOutlineTitle />,
    },
    {
      Image: "",
      Icon: <BsFillFileEarmarkImageFill />,
    },
    {
      textarea: "",
      Icon: <BiMessageDetail />,
    },
  ]);

  const buttons = [
    {
      desc: "Bold",
      icon: <FaBold />,
    },
    {
      desc: "Underline",
      icon: <FaUnderline />,
    },
    {
      desc: "Italic",
      icon: <FaItalic />,
    },
    {
      desc: "Preview",
      icon: <VscOpenPreview />,
    },
  ];

  const squareInfo = [
    {
      icon: <FaBullhorn />,
      desc: "Notifications",
      display: (
        <Notifications
          buttons={buttons}
          adminsInfo={adminsInfo}
          contactInputs={contactInputs}
          setContactInputs={setContactInputs}
        />
      ),
    },
    {
      icon: <FaCrown />,
      desc: "Middle",
      display: (
        <CurrentMessages Notifications={<FaBullhorn />} News={<BiNews />} />
      ),
    },
    {
      icon: <BiNews />,
      desc: "News",
      display: (
        <News
          goDown={goDown[0].index}
          buttons={buttons}
          adminsInfo={adminsInfo}
          contactInputs={contactInputs}
          setContactInputs={setContactInputs}
        />
      ),
    },
  ];

  const determineIndex = (index) => {
    const getNew = async () => {
      await getRequest(
        `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_GETNEWS}`,
        true
      );
      await getRequest(
        `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_GETNOTIFICATIONS}`,
        true
      );
    };
    getNew();
    setGoDown([
      {
        shouldIt: true,
        index,
      },
    ]);
  };

  const goBack = () => {
    setGoDown([
      {
        ...goDown[0],
        shouldIt: false,
      },
    ]);
    setTitle("Choose a category");
  };

  return (
    <section className="combineW combineH">
      <div className="sendNotifications combineW combineH">
        <div className="flex jcac relative">
          {goDown[0].shouldIt && (
            <button
              onClick={goBack}
              className="goBack absolute flex jcac trans pointer"
            >
              <BiArrowBack /> Return
            </button>
          )}

          <h1 className="flex jcac">
            <FaBullhorn />{" "}
            {title === "Middle"
              ? "Current Notifications & News"
              : title || "Choose a category"}
          </h1>
        </div>
        <div className="topicsCard relative flex jcac combineW combineH">
          <div className="theCard flex relative jcac">
            {squareInfo.map((square, index) => {
              return (
                <div
                  onClick={() => determineIndex(index)}
                  onMouseOver={() => setTitle(square.desc)}
                  key={index}
                  className={`${square.desc} ${
                    goDown[0].shouldIt ? "hClose" : ""
                  } pointer combineH flex jcac trans bRadius`}
                >
                  <p className="icon">{square.icon}</p>
                  <p>{square.desc === "Middle" ? "" : square.desc}</p>
                </div>
              );
            })}
          </div>
          <div
            className={`${squareInfo[goDown[0].index].desc} combineW combineH ${
              goDown[0].shouldIt ? "flex jcac absolute" : "dn"
            }`}
          >
            {squareInfo[goDown[0].index].display}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SendNotifications;

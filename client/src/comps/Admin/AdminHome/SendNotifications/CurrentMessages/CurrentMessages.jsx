import "./CurrentMessages.scss";
import Rotator from "../../../../../assets/rotator.gif";
import React, { useEffect, useRef, useState } from "react";
import ReactHtmlParser from "react-html-parser";

import { FaSearch } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { BsCalendarDateFill, BsFillFileImageFill } from "react-icons/bs";
import { MdTitle } from "react-icons/md";
import { BiSolidBookContent } from "react-icons/bi";
import { ImFileEmpty } from "react-icons/im";
import { getRequest } from "../../../../HelperFunctions/requests";

function CurrentMessages(props) {
  const [direction, setDirection] = useState("left");
  const { Notifications, News } = props;
  const { VITE_SERVER_PORT, VITE_ADMIN } = import.meta.env;

  const [searchInput, setSearchInput] = useState("");

  const tabs = [
    {
      Class: "imageRotator",
    },
    {
      Class: "currentNews",
      Icon: News,
    },
  ];

  const [msgStructure, setMsgStructure] = useState([
    {
      Icons: [
        <RiAdminFill />,
        <BsCalendarDateFill />,
        <MdTitle />,
        <BsFillFileImageFill />,
        <BiSolidBookContent />,
      ],
      Data: [],
    },
  ]);

  const getData = async () => {
    try {
      const res = await getRequest(
        `${VITE_SERVER_PORT}/${VITE_ADMIN}/${
          direction === "left" ? "getNotifications" : "getNews"
        }`,
        true
      );
      const newData = await res.data.messages.map((msg) => {
        const obj = {};
        Object.entries(msg).forEach(([key, value]) => {
          if (key !== "__v" && key !== "_id") obj[key] = ReactHtmlParser(value);
        });
        return obj;
      });
      direction === "right"
        ? setMsgStructure((prev) => [
            {
              Icons: prev[0].Icons,
              Data: newData.map(({ Author, Date, Title, Content, Image }) => ({
                Author: Author,
                Date: Date,
                Title: Title,
                Content: Content,
                Image: Image,
              })),
            },
          ])
        : setMsgStructure((prev) => [
            {
              Icons: prev[0].Icons,
              Data: newData.map(({ Author, Date, Content }) => ({
                Author: Author,
                Date: Date,
                Content: Content,
              })),
            },
          ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let arr = [];
    searchInput === ""
      ? getData()
      : msgStructure[0].Data.map((data) => {
          Object.values(data).forEach((da) => {
            da.toString() !== "[object Object]" && arr.push(da.toString());
            const filteredArray = arr.filter((item) =>
              item.includes(searchInput)
            );
            setMsgStructure((prev) => [
              {
                Icons: prev[0].Icons,
                Data: [filteredArray],
              },
            ]);
          });
        });
  }, [searchInput]);

  const moveCircle = () => {
    setDirection((prev) => (prev === "left" ? "right" : "left"));
    setSearchInput("");
  };

  return (
    <div className="currentMessages combineW combineH flex jcac">
      <div
        className={`dataArea combineH ${
          direction === "left" ? "bgBlue" : "bgPurple"
        }`}
      >
        <div className="messageArea flex combineH">
          {msgStructure.map((msg, index) => (
            <>
              {msg.Data.length === 0 ? (
                <h4>
                  <span className="icon flex jcac">
                    <ImFileEmpty />
                  </span>
                  The list is empty.
                </h4>
              ) : (
                msg.Data.map((data, dataIndex) => (
                  <div
                    className={`generalDesc combineW flex jcac trans ${
                      direction === "left"
                        ? "areaBorderBlue"
                        : "areaBorderPurple"
                    }`}
                    key={dataIndex}
                  >
                    <React.Fragment key={`message-${index}-${dataIndex}`}>
                      {Object.entries(data).map(([key, value], i) => (
                        <div
                          key={`data-${index}-${dataIndex}-${key}`}
                          className="areaData combineW flex trans"
                        >
                          <h2 className="icon flex jcac">
                            {msg.Icons[i == 2 ? 4 : i]}
                          </h2>
                          <div className="value flex">{value}</div>
                        </div>
                      ))}
                    </React.Fragment>
                  </div>
                ))
              )}
            </>
          ))}
        </div>
      </div>
      <div
        className={`settingsArea combineH bgImage trans ${
          direction === "left" ? "blueGate" : "purpleGate"
        }`}
      >
        <section className="flex combineH">
          <h1
            className={`title flex jcac trans ${
              direction === "left" ? "rotate" : "normal"
            }`}
          >
            Settings
          </h1>
          <div className="wall flex">
            <div
              className={`controller flex jcac combineW bRadius trans ${
                direction === "left" ? "blueShadow" : "purpleShadow"
              }`}
            >
              <div className="rest flex jcac combineW combineH">
                <div className="group flex">
                  <p className="flex jcac">{Notifications}</p>
                  <h3>Noti's</h3>
                </div>
                <div className="middle combineW flex jcac relative bRadius">
                  <p
                    onClick={() => (moveCircle(), getData())}
                    className={`combineH bRadius pointer absolute trans ${
                      direction === "left"
                        ? "slideLeft blue"
                        : "slideRight purple"
                    }`}
                  ></p>
                </div>
                <div className="group flex">
                  <p className="flex jcac">{News}</p>
                  <h3>News</h3>
                </div>
              </div>
            </div>
            <div
              className={`searcher flex jcac bRadius trans ${
                direction === "left" ? "blueShadow" : "purpleShadow"
              }`}
            >
              <p className="icon flex jcac">
                <FaSearch />
              </p>
              <input
                value={searchInput}
                onChange={({ target }) => setSearchInput(target.value)}
                type="text"
                placeholder="Search word..."
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CurrentMessages;

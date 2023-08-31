import React, { useEffect, useRef, useState } from "react";
import "./UserSettings.scss";
import axios from "axios";
import getCookieValue from "../../../HelperFunctions/getCookieValue";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlinePlus,
  AiOutlineClose,
  AiFillAccountBook,
  AiFillLock,
  AiFillUnlock,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BsPersonSquare, BsPersonFillAdd, BsMarkdown } from "react-icons/bs";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";
import { ImCheckmark } from "react-icons/im";
import { BiCloset, BiUpArrowAlt, BiSolidTimeFive } from "react-icons/bi";
import {
  getRequest,
  postRequest,
  deleteRequest,
  patchRequest,
} from "../../../HelperFunctions/requests";
import { toggleDialogRemove } from "../../../../redux/giveOppositeSegments/dialogRemove";
import AreYouSure from "../../../Dialogs/AreYouSure/AreYouSure";
import giveOpposite from "../../../../redux/giveOpposite";

function UserSettings() {
  const dispatch = useDispatch();
  const {
    VITE_SERVER_PORT,
    VITE_GETADMIN,
    VITE_ADMIN,
    VITE_USERS,
    VITE_ADMIN_GETPENDINGADMINS,
    VITE_USER_GETUSERS,
    VITE_ADMIN_DELETEADMIN,
    VITE_ADMIN_POSTADMINNOPASS,
    VITE_ADMIN_PATCHUSER,
  } = import.meta.env;

  // const [listIndex, setListIndex] = useState(0);
  const [newInput, setNewInput] = useState("");

  // const [permis, setPermis] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [listInfo, setListInfo] = useState([
    {
      listIndex: null,
      listName: "",
    },
  ]);
  const [lock, setLock] = useState(true);
  // const [iconIndex, setIconIndex] = useState(0);
  const [degs, setDegs] = useState(180);
  const [amountScroll, setAmountScroll] = useState(0);
  const scrollRef = useRef(null);
  const [input, setInput] = useState(false);
  const [adminAdd, setAdminAdd] = useState([
    {
      Username: "",
      Email: "",
      // Job: '',
    },
  ]);

  const addNewAdminIcons = [
    <AiOutlineClose />,
    <BiUpArrowAlt />,
    <ImCheckmark />,
  ];

  const returnOpposite = () => {
    setLock((prev) => !prev);
  };

  //users data, including the titles, users, admins and the icons
  const [usersData, setUsersData] = useState([
    {
      titles: ["Admin Account", "User Account", "Properties"],
      users: ["Loading users..."],
      admins: ["Loading admins..."],
      pendingAdmins: ["Loading Pending Admins..."],
      icons: [""],
    },
  ]);

  const handleNewIcons = async (index, listsName) => {
    try {
      if (index === 2) {
        await patchRequest(
          `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_PATCHUSER}/${newInput}}`,
          {
            Username: listsName,
          },
          true
        );
      }
      if (index === 0) {
        setListInfo((prev) => [
          {
            ...prev,
            listName: "",
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //function to post a new admin
  const postAdmin = async () => {
    const { Username, Email } = adminAdd[0];
    const res = await postRequest(
      `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_POSTADMINNOPASS}`,
      {
        Username,
        Email,
      },
      true
    );
    setAdminAdd([
      {
        Username: "",
        Email: "",
      },
    ]);
    console.log(res.data);
  };

  //function to determine which user is it, admin or regular, and apply the according icons to them
  const generateIcons = (icons, user, indexUser) => {
    return icons.map((icon, index) => (
      <p
        onClick={() => determineAction(user, index, indexUser)}
        className="icon trans pointer bRadius flex jcac"
        key={index}
      >
        {icon}
      </p>
    ));
  };

  //determine what icon was clicked, if first then its the delete button etc.
  const determineAction = async (listsName, i, indexUser) => {
    console.log(listsName);
    if (i === 0) {
      setListInfo([
        {
          listIndex: indexUser,
          listName: listsName,
        },
      ]);
    }
    if (i === 1) {
      await deleteRequest(
        `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_DELETEADMIN}/${listsName}`,

        true
      );
      dispatch(toggleDialogRemove());
    }
  };

  //a useeffect hook to get all admins/users/pending admins and put them accoringly on the db
  useEffect(() => {
    try {
      const getAdmins = async () => {
        const adminRes = await getRequest(
          `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_GETADMIN}`,
          true
        );
        const usersRes = await getRequest(
          `${VITE_SERVER_PORT}/${VITE_USERS}/${VITE_USER_GETUSERS}`,
          true
        );
        const getPendingAdmins = await getRequest(
          `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_GETPENDINGADMINS}`,
          true
        );

        const admins = await adminRes.data.adminList.map((username) => {
          return username.Email;
        });
        const pendingAdmins = await getPendingAdmins.data.adminList.map(
          (username) => {
            return username.Username;
          }
        );
        const users = await usersRes?.data.map((username) => {
          return username.Username;
        });
        setUsersData([
          {
            titles: ["Admin Account", "User Account", "Properties"],
            admins: admins.filter((val) => {
              return val.includes(searchInput);
            }),
            users: users.filter((val) => {
              return val.includes(searchInput);
            }),
            pendingAdmins: pendingAdmins.filter((val) => {
              return val.includes(searchInput);
            }),
            icons: [<AiFillEdit />, <AiFillDelete />],
          },
        ]);
      };
      getAdmins();
    } catch (error) {
      console.log(error);
    }
  }, [determineAction, searchInput, postAdmin]);

  const setAdmin = (par) => {
    par === "add" ? setInput(true) : par === "close" ? setInput(false) : "";
  };

  const handleInputChange = (i, key, e) => {
    const updatedAdminAdd = [...adminAdd];
    updatedAdminAdd[i][key] = e;
    setAdminAdd(updatedAdminAdd);
  };

  useEffect(() => {
    console.log(adminAdd[0].length);
    scrollRef.current.scrollTo({
      behavior: "smooth",
      top: amountScroll,
    });
  }, [degs]);

  const changeDegs = (dValue, target) => {
    // console.log(dValue)
    // console.log(target);
    setDegs((prev) => (prev === dValue ? target : dValue));
    setAmountScroll((prev) => (prev === dValue ? target : dValue));
  };

  const createTable = (par) => {
    return usersData?.map((user, userIndex) => (
      <div key={userIndex} className="part flex combineW combineH relative">
        {/* {lock ? ( */}
        <div
          onClick={() => setLock(false)}
          className={`${
            lock ? "openH" : "closeH"
          } protect absolute combineW combineH flex jcac trans`}
        >
          <p className="icon flex jcac" style={{ fontSize: "4vmin" }}>
            <AiFillLock />
          </p>
          <p>There are NO warnings for any action you will do.</p>
          <p>If you want to stay careful, lock this up again.</p>
          <p style={{ fontSize: "4vmin" }}>You've been warned.</p>
          <button onClick={returnOpposite} className="combineW pointer">
            <AiFillUnlock /> Click anywhere
          </button>
        </div>
        {/* ) : ( */}
        <div
          className={`${
            lock ? "closeH" : "openH"
          } protect unlock combineW unlock absolute trans`}
        >
          <div onClick={() => setLock(true)} className="icon pointer flex jcac">
            <p className="flex jcac">
              Lock again <AiFillLock />
            </p>
          </div>
        </div>
        {/* )} */}
        <div className="top flex">
          {user.titles
            .filter((prev) => prev !== par)
            .map((title, index) => {
              return (
                <p key={index} className="subTitle flex jcac bRadius">
                  {title}
                </p>
              );
            })}
        </div>
        {par === "User Account" && (
          <div className="add list flex combineW jcac trans">
            <p
              className="icon trans pointer bRadius flex jcac"
              style={{ width: "10%" }}
            >
              <BsPersonFillAdd />
            </p>
            <div className="flex f1 jcac" style={{ width: "90%" }}>
              {adminAdd.map((adm, index) => {
                return (
                  <div className="bothInp" ref={scrollRef}>
                    {Object.entries(adm).map(([key, value], i) => {
                      return (
                        <div className="inpContainer flex relative" key={i}>
                          <input
                            key={i}
                            placeholder={`${
                              input ? "Provide " + key + "..." : ""
                            }`}
                            value={value}
                            onChange={(e) =>
                              handleInputChange(index, key, e.target.value)
                            }
                            className={`${input ? "open" : "close"} trans`}
                            type="text"
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              {!input ? (
                <>
                  <p className="f1">Add a new admin</p>
                  <p
                    onClick={() => setAdmin("add")}
                    className="icon trans pointer bRadius flex jcac"
                  >
                    <AiOutlinePlus />
                  </p>
                </>
              ) : (
                <>
                  {input &&
                    addNewAdminIcons.map((add, index) => {
                      return (
                        <p
                          className="icon trans pointer bRadius flex jcac"
                          onClick={() =>
                            index === 0
                              ? (setAdmin("close"),
                                setAdminAdd([{ Username: "", Email: "" }]))
                              : index === 1
                              ? changeDegs(0, 180)
                              : postAdmin()
                          }
                          key={index}
                          style={
                            index === 1
                              ? { transform: `rotate(${degs}deg)` }
                              : null
                          }
                        >
                          {add}
                        </p>
                      );
                    })}
                </>
              )}
            </div>
          </div>
        )}
        <div className="topList flex combineW combineH jcac trans relative">
          <React.Fragment key={userIndex}>
            {usersData.map((ud) =>
              par === "User Account"
                ? ud.admins.map((admin, index) => (
                    <>
                      <div
                        key={index}
                        className="list flex combineW jcac trans"
                      >
                        <p className="icon trans pointer combineH bRadius flex jcac">
                          <RiAdminFill />
                        </p>
                        <div className="inpContainer combineW flex relative">
                          <input
                            value={newInput}
                            onChange={(e) => setNewInput(e.target.value)}
                            placeholder="New admin's Username..."
                            className={`${
                              admin == listInfo[0].listName ? "open" : "close"
                            } trans`}
                            type="text"
                          />
                          {admin == listInfo[0].listName ? (
                            <div className="bothInp flex">
                              {addNewAdminIcons.map(
                                (add, index) =>
                                  index != 1 && (
                                    <p
                                      onClick={() =>
                                        handleNewIcons(
                                          index,
                                          listInfo[0].listName
                                        )
                                      }
                                      // onClick={() =>
                                      //   index === 2
                                      //     ? ''
                                      //     : (listInfo[0].listName = "")
                                      // }
                                      className="icon trans pointer bRadius flex jcac"
                                      key={index}
                                    >
                                      {add}
                                    </p>
                                  )
                              )}
                            </div>
                          ) : (
                            <>
                              <p className="f1">{admin}</p>
                              <div
                                className="combineW flex"
                                style={{ width: "20%" }}
                              >
                                {generateIcons(ud.icons, admin, index)}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      {/* {index > 0 && ( */}

                      {/* )} */}
                    </>
                  ))
                : ud.users.map((user, index) => (
                    <div key={index} className="list flex combineW jcac trans">
                      <p className="icon trans pointer bRadius flex jcac">
                        <BsPersonSquare />
                      </p>
                      <div className="inpContainer combineW flex relative">
                        <input
                          value={newInput}
                          onChange={(e) => setNewInput(e.target.value)}
                          placeholder="New user's name..."
                          className={`${
                            user == listInfo[0].listName ? "open" : "close"
                          } trans`}
                          type="text"
                        />
                        {user == listInfo[0].listName ? (
                          <div className="bothInp flex">
                            {addNewAdminIcons.map(
                              (add, index) =>
                                index != 1 && (
                                  <p
                                    onClick={() =>
                                      handleNewIcons(
                                        index,
                                        listInfo[0].listName
                                      )
                                    }
                                    className="icon trans pointer bRadius flex jcac"
                                    key={index}
                                  >
                                    {add}
                                  </p>
                                )
                            )}
                          </div>
                        ) : (
                          <>
                            <p className="f1">{user}</p>
                            <div
                              className="combineW flex"
                              style={{ width: "30%" }}
                            >
                              {generateIcons(ud.icons, user, index)}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))
            )}
            <div className="pendingAdmins list flex combineW jcac trans">
              {usersData.map((ud) =>
                ud.pendingAdmins.length === 0 ? (
                  <p>No pending admins!</p>
                ) : (
                  ud.pendingAdmins.map((pending, index) => (
                    <React.Fragment key={index}>
                      <div className="combineW flex jcac">
                        <h3>
                          <RiAdminLine />
                        </h3>
                        <div className="combineW flex jcac">
                          <p className="f1">{pending}</p>
                          <h4 className="fleqx jcac">
                            <BiSolidTimeFive /> Pending...
                          </h4>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                )
              )}
            </div>
          </React.Fragment>
        </div>
      </div>
    ));
  };

  return (
    <div className="userSettings relative combineW combineH flex jcac">
      <div className="tContainer inpContainer title combineW flex jcac">
        <input
          value={searchInput}
          onChange={({ target }) => setSearchInput(target.value)}
          className="combineW combineH midInput"
          placeholder="🔎 Search user..."
          type="text"
        />
      </div>
      <div className="sections combineW combineH flex jcac">
        <div className="admin combineH flex jcac">
          {createTable("User Account")}
        </div>
        <div className="user combineH flex jcac">
          {createTable("Admin Account")}
        </div>
      </div>
      {/* <div
        style={dialogRemove ? { maxWidth: "100%" } : { maxWidth: 0 }}
        className={`contAreYouSure absolute trans combineW combineH`}
      >
        <AreYouSure listName={valueToGive !== "" && valueToGive} />
      </div> */}
    </div>
  );
}

export default UserSettings;

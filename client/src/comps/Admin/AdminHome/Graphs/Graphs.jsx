import "./Graphs.scss";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import getCookie from "../../../HelperFunctions/getCookieValue";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidCircle } from "react-icons/bi";

// import { BiArch } from "react-icons/bi";

function Graphs() {
  const online = useSelector((state) => state.online);
  const port = import.meta.env.VITE_SERVER_PORT;
  const [info, setInfo] = useState([]);

  const {
    VITE_SERVER_PORT,
    VITE_GETADMIN,
    VITE_ADMIN,
    VITE_USERS,
    VITE_USER_GETUSERS,
  } = import.meta.env;
  // const [message, setMessage] = useState("");

  const data = [
    { name: "Admins", adminsValue: info[0]?.Admins },
    { name: "Users", usersValue: info[0]?.Users },
    { name: "General", everyoneValue: info[0]?.Users + info[0]?.Admins },
  ];

  useEffect(() => {
    const token = getCookie("t");
    const getUsers = async (route, route2) => {
      try {
        const res = await axios.get(route, {
          headers: {
            Authorization: `Bearer ${token[0][1]}`,
          },
        });
        const res2 = await axios.get(route2, {
          headers: {
            Authorization: `Bearer ${token[0][1]}`,
          },
        });
        setInfo([
          { Users: res.data.length, Admins: res2.data.adminList.length },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getUsers(
      `${VITE_SERVER_PORT}/${VITE_USERS}/${VITE_USER_GETUSERS}`,
      `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_GETADMIN}`,
      true
    );
  }, []);

  const formatYAxisTick = (tick) => {
    return Number.isInteger(tick) ? tick : "";
  };

  // const sendMessage = () => {
  //   socket.emit("message", message);
  // };

  return (
    <div className="Graph flex jcac combineW combineH">
      <div className="onlinePeople flex jcac combineW">
        <div className="status flex jcac">
          <BiSolidCircle />
          <p>{online}</p>
        </div>
        <p className="title">Online people</p>
      </div>
      <div className="all combineW combineH flex jcac">
        <div className="generalPeople flex jcac bRadius">
          <p>Registered Users Info</p>
          <BarChart
            width={window.innerWidth / 3}
            height={500}
            barCategoryGap="30%"
            barGap="-50%"
            data={data}
          >
            <XAxis dataKey="0" />
            <YAxis
              tickCount={7}
              interval="preserveStartEnd"
              tickFormatter={formatYAxisTick}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="adminsValue"
              fill="rgba(139, 69, 19, 1)"
              name="Admins"
              isAnimationActive={false}
            />
            <Bar
              dataKey="usersValue"
              fill="rgba(184, 134, 11, 0.8)"
              name="Users"
              isAnimationActive={false}
            />
            <Bar
              dataKey="everyoneValue"
              fill="#c17007db"
              name="Total"
              isAnimationActive={false}
            />
          </BarChart>
        </div>
        <div className="generalPeople flex jcac">
          <p>Vists Per Time</p>
        </div>
      </div>
    </div>
  );
}

export default Graphs;

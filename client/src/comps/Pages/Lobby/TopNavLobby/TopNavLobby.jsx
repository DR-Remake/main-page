import React from "react";
import iconLogo from "../../../../assets/iconLogoDRR.png";
import "./TopNavLobby.css";
import "../Lobby.css";
import { BiLogOut } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import getCookieValue from "../../../HelperFunctions/getCookieValue";
import { useNavigate } from "react-router-dom";

function TopNavLobby(props) {
  const navigate = useNavigate();

  const selectedIndex = useSelector((state) => state.indexContent);

  const listItems = useSelector((state) => state.list);

  <getCookieValue />;

  const logoutUser = async () => {
    function deleteCookie(name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    deleteCookie("t");
    navigate("/drr/home");
  };

  const { IconMapper, AdminMapper, success } = props;

  const itemsNav = [
    <>
      <img src={iconLogo} alt="Logo" />
      <p></p>
      <p>
        {success === "User"
          ? IconMapper[selectedIndex]?.desc
          : AdminMapper[selectedIndex]?.desc}
      </p>
      <p></p>
      <a onClick={logoutUser} className="logout pointer">
        <BiLogOut />
        Logout
      </a>
    </>,
  ];

  return (
    <div className="topNavDashboard flex jcac bRadius combineW">
      {itemsNav.map((item, index) => (
        <React.Fragment key={index}>{item}</React.Fragment>
      ))}
    </div>
  );
}

export default TopNavLobby;

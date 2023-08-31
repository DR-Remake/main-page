import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNavAdmin from "./TopNavAdmin/TopNavAdmin.jsx";
import "./AdminHome.scss";
import getCookieValue from "../../HelperFunctions/getCookieValue.jsx";
import SideNavLobby from "../../Pages/Lobby/SideNavLobby/SideNavLobby.jsx";
import Lobby from "../../Pages/Lobby/Lobby.jsx";
// import { fetchUser } from "../../../redux/isAdmin.jsx";
import AreYouSure from "../../Dialogs/AreYouSure/AreYouSure.jsx";
import { getRequest } from "../../HelperFunctions/requests.jsx";

function AdminHome() {
  const navigate = useNavigate();

  const { VITE_SERVER_PORT, VITE_ADMIN, VITE_HOME } = import.meta.env;
  getCookieValue();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        await getRequest(
          `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_HOME}`,
          true
        );
      } catch (error) {
        navigate("/drr/home");
        console.log(error);
      }
    };
    checkAdmin();
  }, []);

  return (
    <div className="adminPanel relative combineW combineH">
      <Lobby />
    </div>
  );
}

export default AdminHome;

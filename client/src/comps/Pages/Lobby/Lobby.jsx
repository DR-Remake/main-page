import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import TopNavLobby from "./TopNavLobby/TopNavLobby.jsx";
import SideNavLobby from "./SideNavLobby/SideNavLobby.jsx";
import Notification from "./Notifications/Notifications.jsx";
import Shop from "./Shop/Shop.jsx";
import Leaderboards from "./Leaderboards/Leaderboards.jsx";
import TeamDRR from "./TeamDRR/TeamDRR.jsx";
import Settings from "./Settings/Settings.jsx";
import { useDispatch, useSelector } from "react-redux";
import CardDisplayer from "../../Dialogs/CardDisplayer/CardDisplayer.jsx";
import getCookieValue from "../../HelperFunctions/getCookieValue.jsx";
// import { setOpenClose } from "../../../redux/openCloseDialog";
import closeDialog from "../../HelperFunctions/closeDialog.jsx";
import UserSettings from "../../Admin/AdminHome/UserSettings/UserSettings.jsx";
import SendNotifications from "../../Admin/AdminHome/SendNotifications/SendNotifications.jsx";
import Graphs from "../../Admin/AdminHome/Graphs/Graphs.jsx";
import SendMessages from "../../Admin/AdminHome/SendMessages/SendMessages.jsx";

import { AiFillHome, AiOutlineSend } from "react-icons/ai";
import { BiSolidMessageDots } from "react-icons/bi";
import { RiTeamFill, RiUserSettingsLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { FaTrophy, FaShoppingCart, FaStickyNote } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Toaster } from "../../HelperFunctions/toastify.jsx";

function Lobby() {
  const navigate = useNavigate();
  const selectedIndex = useSelector((state) => state.indexContent);
  const handleCloseDialog = closeDialog();
  const dialogOpenClose = useSelector((state) => state.openCloseDialog);
  const [success, setSuccess] = useState(null);

  const { VITE_SERVER_PORT, VITE_DASHBOARD, VITE_ADMIN, VITE_HOME } =
    import.meta.env;

  const [userComps, setuserComps] = useState([
    null,
    <Notification />,
    <Shop />,
    <Leaderboards />,
    <TeamDRR />,
    <Settings />,
  ]);

  const [adminComps, setAdminComps] = useState([
    null,
    // <Notes/>,
    <Graphs />,
    <UserSettings />,
    <SendNotifications />,
    // <PostCards />,
  ]);

  const IconMapper = [
    {
      icon: <AiFillHome />,
      desc: "Home",
    },
    {
      icon: <BiSolidMessageDots />,
      desc: "News & Notification",
    },
    {
      icon: <FaShoppingCart />,
      desc: "Shop",
    },
    {
      icon: <FaTrophy />,
      desc: "Leaderboards",
    },
    {
      icon: <RiTeamFill />,
      desc: "DRR Team",
    },
    {
      icon: <FiSettings />,
      desc: "Settings",
    },
  ];
  const AdminMapper = [
    {
      icon: <AiFillHome />,
      desc: "Home",
    },
    {
      icon: <FaStickyNote />,
      desc: "Notes",
    },
    {
      icon: <BsGraphUp />,
      desc: "Stats & Graphs",
    },
    {
      icon: <RiUserSettingsLine />,
      desc: "User/Admin Settings",
    },
    {
      icon: <AiOutlineSend />,
      desc: "Send notifications",
    },
  ];

  const closeIt = (e) => {
    handleCloseDialog(e, "cover");
  };
  useEffect(() => {
    const checkUser = async (route, sndRoute) => {
      const token = getCookieValue("t");
      try {
        const res = await axios.get(route, {
          headers: {
            Authorization: `Bearer ${token[0][1]}`,
          },
        });
        setSuccess(res.data.Role);
      } catch (error) {
        // const Admin = await error.response.data.Role;
        try {
          const res2 = await axios.get(sndRoute, {
            headers: {
              Authorization: `Bearer ${token[0][1]}`,
            },
          });
          setSuccess(res2.data.Role);
        } catch (error) {
          navigate("/drr/home");
          Toaster("error", "Session expired. Please login again.");
        }
      }
    };
    checkUser(
      `${VITE_SERVER_PORT}/${VITE_DASHBOARD}/`,
      `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_HOME}`
    );
  }, []);

  return (
    <>
      <div
        onClick={closeIt}
        className={`cover absolute combineW combineH flex jcac trans ${
          dialogOpenClose === "open" ? "showUp" : "gone"
        }`}
      >
        <CardDisplayer />
      </div>
      <div className="Dashboard combineW combineH flex jcac">
        <TopNavLobby
          success={success}
          IconMapper={IconMapper}
          AdminMapper={AdminMapper}
        />
        <div className="sideContent combineW combineH flex">
          <SideNavLobby
            success={success}
            IconMapper={IconMapper}
            AdminMapper={AdminMapper}
          />
          <div className="parent combineW combineH flex jcac bRadius">
            {success === "Admin"
              ? adminComps[selectedIndex]
              : userComps[selectedIndex]}
          </div>
        </div>
      </div>
    </>
  );
}

export default Lobby;

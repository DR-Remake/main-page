import "./SideNavLobby.css";
import "../Lobby.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleIndexContent } from "../../../../redux/getIndexSegments/indexContentSlice.jsx";
import getCookieValue from "../../../HelperFunctions/getCookieValue";

// import { fetchUser } from "../../../../redux/isAdmin";

function SideNavLobby(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listItems = useSelector((state) => state.list);

  const selectedIndex = useSelector((state) => state.indexContent);
  getCookieValue();

  const handleItemClick = (index) => {
    dispatch(toggleIndexContent({ index }));

    if (index === 0) {
      navigate("/drr/home");
    }
  };
  const { IconMapper, AdminMapper, success } = props;

  return (
    <div className="sideNavDashboard combineW combineH wallDRR bRadius flex jcac">
      {listItems.map((icon, index) => {
        return (
          <div key={index} className="pack combineH flex jcac relative">
            <a
              onClick={() => handleItemClick(index)}
              className={`combineW combineH flex jcac trans pointer ${
                selectedIndex !== 0
                  ? selectedIndex === index
                    ? "chosen"
                    : null
                  : null
              }`}
            >
              {success === "User"
                ? IconMapper[index]?.icon
                : AdminMapper[index]?.icon}
            </a>
            <p className="absolute trans combineH flex jcac">
              {success === "User"
                ? IconMapper[index]?.desc
                : AdminMapper[index]?.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default SideNavLobby;

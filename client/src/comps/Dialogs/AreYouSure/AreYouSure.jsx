import "./AreYouSure.scss";
import { ImCheckmark, ImCross } from "react-icons/im";
import { AiFillWarning } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialogRemove } from "../../../redux/giveOppositeSegments/dialogRemove";
import UserSettings from "../../Admin/AdminHome/UserSettings/UserSettings";
import { deleteRequest } from "../../HelperFunctions/requests";

function AreYouSure(props) {
  const { VITE_SERVER_PORT, VITE_ADMIN, VITE_ADMIN_DELETEUSER } = import.meta
    .env;

  const dialogRemove = useSelector((state) => state.dialogRemove);
  const dispatch = useDispatch();
  const buttons = [<ImCheckmark />, <ImCross />];

  const closeDialog = async (i) => {
    console.log(props);
    console.log(props.listsName);
    i === 0 &&
      (await deleteRequest(
        `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_DELETEUSER}`
      ));
    dispatch(toggleDialogRemove(false));
  };

  return (
    <>
      <div
        className={`${
          dialogRemove ? "open" : "lClose"
        } areYouSure combineH trans flex jcac`}
      >
        <p className="icon flex jcac">
          -
          <AiFillWarning />-
        </p>
        <h2>Confirmation</h2>
        <p>Are you sure you want to delete the following</p>
        <p>Admin</p>
        <p>adminYosef</p>
        {buttons.map((button, index) => {
          return (
            <button
              onClick={() => closeDialog(index)}
              className="trans icon pointer"
            >
              {button}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default AreYouSure;

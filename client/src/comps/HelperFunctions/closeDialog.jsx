import { useDispatch } from "react-redux";
import { setOpenClose } from "../../redux/openCloseDialog";

function closeDialog() {
  const dispatch = useDispatch();

  const cDialog = (e, closeClass) => {
    if (e.target.classList.contains(closeClass)) {
      dispatch(setOpenClose({ whatToDo: "close" }));
    }
  };

  return cDialog;
}

export default closeDialog;

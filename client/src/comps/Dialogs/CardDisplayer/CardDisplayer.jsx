import { useEffect, useState } from "react";
import "./CardDisplayer.scss";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setOpenClose } from "../../../redux/openCloseDialog";

function CardDisplayer() {
  const dispatch = useDispatch();
  const dialogOpenClose = useSelector((state) => state.openCloseDialog);

  const [laserArray, setLaserArray] = useState(new Array(2).fill(""));
  const [tableParts, setTableParts] = useState(new Array(3).fill(""));
  const [status, setStatus] = useState("plus");

  // const close = dispatch(setOpenClose({ whatToDo: "close" }));

  const changeStatus = () => {
    setStatus((prev) => (prev === "plus" ? "check" : "plus"));
  };


  const openCloseDialog = () => {
    setTimeout(() => {
      dispatch(setOpenClose({ whatToDo: "close" }));
      setStatus("plus");
    }, 450);
  };

  const handleButtonClick = () => {
    // Call both functions here
    changeStatus();
    openCloseDialog();
  };

  return (
    <div className="CardDisplayer absolute flex jcac bRadius trans">
      <div className="cardArea combineW flex jcac">
        <div className="insideArea relative combineW flex jcac">
          <p className="inside bgImage flex"></p>
          <div className="lasers absolute combineW combineH flex">
            {laserArray.map((laser, index) => {
              return (
                <p className="" key={index}>
                  {laser}
                </p>
              );
            })}
          </div>
        </div>
        <div className="tableArea relative combineW flex jcac">
          {tableParts.map((table, index) => {
            return (
              <p
                className="combineW combineH bRadius relative flex jcac"
                key={index}
              >
                {table}
                {index === 1 && (
                  <span className="combineW combineH bgImage absolute"></span>
                )}
              </p>
            );
          })}
        </div>
      </div>
      <div className="infoPriceArea combineW combineH">
        <div className="title flex jcac combineW">
          <p>Information</p>
          <p onClick={openCloseDialog} className="pointer">
            X
          </p>
        </div>

        <div className="info flex">
          <p>
            Name <span>Berserker</span>
          </p>
          <p>
            Type <span>Warrior</span>
          </p>
          <p>
            Rarity <span>COMMON</span>
          </p>
        </div>
        <div className="price flex">
          <div className="quantity combineW flex">
            <p>Quantity </p>
            <input disabled={true} defaultValue={"1"} type="text" />
          </div>
          <div className="finalPrice combineW flex jcac">
            <p>Price </p>
            <button
              onClick={handleButtonClick}
              className="bRadius pointer flex jcac trans"
            >
              {status === "plus" ? <AiOutlinePlus /> : <AiOutlineCheck />}
              Add to cart
            </button>
            <p>8.20$</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardDisplayer;

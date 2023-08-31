import "./CategoryDisplayer.css";

import { useEffect } from "react";
import portalImage from "../../../assets/portalDRR.gif";
import indexDialogShop, {
  toggleDialogShop,
} from "../../../redux/getIndexSegments/indexDialogShop";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog } from "../../../redux/giveOppositeSegments/shopDialog";
import { setMove } from "../../../redux/move.jsx";

function CategoryDisplayer() {
  const dispatch = useDispatch();
  // const moveSlice = useSelector((state) => state.moveSlice);
  const buttons = useSelector((state) => state.shopTitle)
  // const buttons = ["units", "pets", "spells", "keys", "chests"];
  const shopDialogState = useSelector((state) => state.dialog);
  const dialogSideIndex = useSelector((state) => state.indexDialogShop);

  const handleItemClick = (index, accessClosing) => {
    //true - click
    // false - hover
    dispatch(toggleDialogShop({ index }));
    accessClosing ? dispatch(toggleDialog()) : null;
  };

  const removeLaterThisArrayAsThisGoesToServer = [
    {
      // card: ["Berserker", "common_chest", "common_key"],
      card: ["Berserker", "Ranger", "Sorcerer", "Cheff"],
      desc: "A character that declares a flawless fight, focusing merely on meelee",
      attack: 5,
      defense: 1,
      speed: 4,
    },
    {
      card: ["red_dragon", "bunny", "rhino", "blue_wolf"],
      // card: ["Ranger", "uncommon_chest", "uncommon_key"],
      desc: "A character that declares a flawless fight, focusing merely on shooting",
      attack: 3,
      defense: 2,
      speed: 5,
    },
    {
      card: ["spells"],
      // card: ["Ranger", "uncommon_chest", "uncommon_key"],
      desc: "A character that declares a flawless fight, focusing merely on shooting",
      attack: 3,
      defense: 2,
      speed: 5,
    },
    {
      card: ["common_key", "uncommon_key", "rare_key", "legendary_key"],
      // card: ["Sorcerer", "rare_chest", "rare_key"],
      desc: "A character that declares a flawless fight, focusing merely on magic",
      attack: 2,
      defense: 4,
      speed: 2,
    },
    {
      card: ["common_chest", "uncommon_chest", "rare_chest", "legendary_chest"],
      // card: ["Ranger", "uncommon_chest", "uncommon_key"],
      desc: "A character that declares a flawless fight, focusing merely on shooting",
      attack: 3,
      defense: 2,
      speed: 5,
    },
  ];

  return (
    <div
      className={`category absolute flex trans bRadius ${
        shopDialogState ? "showUp" : "gone"
      }`}
    >
      <div className="theCharacter bRadius relative flex">
        <div className="cards relative combineW flex jcac">
          {removeLaterThisArrayAsThisGoesToServer.map((dum, index) => {
            return (
              <div
              key={index}
                className={`group bRadius combineW flex jcac absolute trans ${
                  dialogSideIndex === index ? "showUp" : "gone"
                }`}
              >
                {dum.card.map((d, cardIndex) => (
                  <p
                  key={cardIndex}
                    className={`bgImage trans combineW combineH bRadius ${d}`}
                  ></p>
                ))}
              </div>
            );
          })}
        </div>
        <div className="titleContainer relative combineW flex jcac">
          {buttons.map((button, index) => {
            return (
              <p
                key={index}
                className={`title gradientText absolute trans ${
                  dialogSideIndex === index ? "showUp" : "gone"
                }`}
              >
                {button}
              </p>
            );
          })}
        </div>
        {/* <div className="portal">
          <img src={portalImage} />
        </div> */}
      </div>
      <div className="flag bRadius bgImage combineH flex jcac">
        <h2>Choose</h2>
        {buttons.map((button, index) => {
          return (
            <p
              onClick={() => handleItemClick(index, true)}
              onMouseOver={() => handleItemClick(index, false)}
              key={index}
              className={`trans bRadius pointer ${
                dialogSideIndex === index && "chosen"
              }`}
            >
              {button}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryDisplayer;

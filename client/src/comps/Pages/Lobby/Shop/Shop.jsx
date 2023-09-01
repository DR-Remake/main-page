import "./Shop.css";
import {
  FaShoppingCart,
  FaHandPaper,
  FaEuroSign,
  FaShekelSign,
} from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CategoryDisplayer from "../../../Dialogs/CatergoryDisplayer/CategoryDisplayer";
import { toggleDialog } from "../../../../redux/giveOppositeSegments/shopDialog";
import { setOpenClose } from "../../../../redux/openCloseDialog";

function Shop() {
  const dispatch = useDispatch();

  const dialogOpenClose = useSelector((state) => state.openCloseDialog);
  const dialogSideIndex = useSelector((state) => state.indexDialogShop);
  const moveSlice = useSelector((state) => state.moveSlice);
  const carousel = useRef(null);
  const middleCard = useRef(null);
  const [degs, setDegs] = useState(0);
  const buttons = useSelector((state) => state.shopTitle);

  const [, setShouldMove] = useState(true);
  
  const currencies = [
    {
      currency: <BsCurrencyDollar />,
      desc: "Dollar",
    },
    {
      currency: <FaEuroSign />,
      desc: "Euro",
    },
    {
      currency: <FaShekelSign />,
      desc: "Shekel",
    },
  ];

  const topNav = [
    {
      icon: <FaHandPaper />,
      desc: "Greetings Rampager",
    },
    {
      icon: <BsCurrencyDollar />,
      desc: "Currency",
    },
    {
      icon: <FaShoppingCart />,
      desc: "Cart",
    },
  ];
  //for images, when it will be ready just post it in google cloud and in the DB have a referense of the image.
  const removeLaterUnitsObject = [
    {
      card: "Berserker",
      desc: "A character that declares a flawless fight, focusing merely on meelee",
      attack: 5,
      defense: 1,
      speed: 4,
    },
    {
      card: "Ranger",
      desc: "A character that declares a flawless fight, focusing merely on shooting",
      attack: 3,
      defense: 2,
      speed: 5,
    },
    {
      card: "Sorcerer",
      desc: "A character that declares a flawless fight, focusing merely on magic",
      attack: 2,
      defense: 4,
      speed: 2,
    },
    {
      card: "Cheff",
      desc: "A character that declares a flawless fight, focusing merely on meelee",
      attack: 4,
      defense: 1,
      speed: 3,
    },
    {
      card: "arkala",
      desc: "A character that declares a flawless fight, focusing merely on magic",
      attack: 4,
      defense: 4,
      speed: 1,
    },
    {
      card: "Shufis",
      desc: "A character that declares a flawless fight, focusing merely on meelee",
      attack: 2,
      defense: 1,
      speed: 3,
    },
  ];

  const removeLaterPetsObject = [
    {
      card: "red_dragon",
      desc: "A character that declares a flawless fight, focusing merely on meelee",
      attack: 5,
      defense: 1,
      speed: 4,
    },
    {
      card: "bunny",
      desc: "A character that declares a flawless fight, focusing merely on shooting",
      attack: 3,
      defense: 2,
      speed: 5,
    },
    {
      card: "rhino",
      desc: "A character that declares a flawless fight, focusing merely on magic",
      attack: 2,
      defense: 4,
      speed: 2,
    },
    {
      card: "blue_wolf",
      desc: "A character that declares a flawless fight, focusing merely on meelee",
      attack: 4,
      defense: 1,
      speed: 3,
    },
  ];

  let cardElements = [];

  const [move, setMove] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMove((prev) => prev + 5);
    }, 3);
    if (
      carousel.current.getBoundingClientRect().right <=
      middleCard?.current.getBoundingClientRect().right
    ) {
      setMove(0);
      carousel.current.scrollTo({
        left: window.innerWidth,
      });
    }
    return () => {
      clearInterval(interval);
    };
  }, [move]);

  const determineMove = (number) => {
    number === 1 ? setShouldMove(false) : setShouldMove(true);
  };

  const openCloseDialog = () => {
    dispatch(setOpenClose({ whatToDo: "open" }));
  };

  const generateCardElements = (data, startIndex) => {
    let cardQuantity = data.length * 2;
    return data.map((d, index) => {
      let isMiddleCard =
        index + startIndex === Math.floor(cardQuantity / 2) - 1;
      return (
        <div
          key={`${startIndex}-${index}`}
          ref={isMiddleCard ? middleCard : null}
          onClick={openCloseDialog}
          onMouseOver={() => determineMove(1)}
          onMouseOut={() => determineMove(2)}
          className={`card flex jcac pointer`}
          style={{
            left: `${move}px`,
          }}
        >
          <p
            className={`${d.card} bRadius bgImage absolute combineW combineH trans`}
          ></p>
          <p>{d.card}</p>
        </div>
      );
    });
  };

  const cardElementsSet1 =
    dialogSideIndex === 0
      ? generateCardElements(removeLaterUnitsObject, 0)
      : generateCardElements(removeLaterPetsObject, 0);
  const cardElementsSet2 =
    dialogSideIndex === 0
      ? generateCardElements(
          removeLaterUnitsObject,
          removeLaterUnitsObject.length
        )
      : generateCardElements(
          removeLaterPetsObject,
          removeLaterPetsObject.length
        );

  cardElements.push(cardElementsSet1);
  cardElements.push(cardElementsSet2);

  useEffect(() => {
    carousel.current.scrollTo({
      left: window.innerWidth,
      behavior: "smooth",
    });
  }, []);

  const handleShopDialog = () => {
    dispatch(toggleDialog());
  };

  const toggleCurrency = () => {
    setDegs((prev) => (prev === 0 ? 180 : 0));
  };

  return (
    <div className="Shop combineW combineH bRadius flex jcac relative">
      <div
        className={`dropDownCurrency absolute bRadius trans ${
          degs === 180 ? "goDown" : "goUp"
        }`}
        onMouseEnter={toggleCurrency}
        onMouseLeave={toggleCurrency}
      >
        {currencies.map((currency, index) => {
          return (
            <div
              key={index}
              className="currency combineW combineH flex jcac pointer trans"
            >
              <p className="flex jcac">{currency.currency}</p>
              <p>{currency.desc}</p>
            </div>
          );
        })}
      </div>
      <CategoryDisplayer />
      <div className="topArea flex jcac bRadius trans combineW">
        {topNav.map((top, index) => {
          return (
            <div
              onMouseEnter={top.desc === "Currency" ? toggleCurrency : null}
              onMouseLeave={top.desc === "Currency" ? toggleCurrency : null}
              onClick={top.desc === "Currency" ? toggleCurrency : null}
              key={index}
              className="eachOne combineW combineH flex trans"
            >
              <>
                <p className="flex jcac">{top.icon}</p>
                {top.desc === "Currency" ? (
                  <>
                    <p className="flex jcac" style={{ gap: "2vmin" }}>
                      {top.desc}{" "}
                      <span
                        className="flex jcac trans"
                        style={{ transform: `rotateZ(${degs}deg)` }}
                      >
                        <IoIosArrowDown />
                      </span>
                    </p>
                  </>
                ) : (
                  <p>{top.desc} </p>
                )}
              </>

              {index === 0 && (
                <div className="options relative flex jcac">
                  <button
                    onClick={handleShopDialog}
                    className="bRadius pointer trans"
                  >
                    Click here to display a category.
                  </button>
                  <div className="listStuff combineW comhineH absolute">
                    <p>alfasa</p>
                    <p>alfasa</p>
                    <p>alfasa</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="content flex combineW combineH bRadius bgImage">
        <p className="shopTitle flex jcac bgImage">
          {buttons[dialogSideIndex]}
        </p>
        <div ref={carousel} className="carousel flex combineW combineH jcac">
          {cardElements}
        </div>
      </div>
    </div>
  );
}

export default Shop;

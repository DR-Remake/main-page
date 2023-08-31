import "./SetNewPassword.scss";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../HelperFunctions/requests";
import { useNavigate } from "react-router-dom";

function SetNewPassword() {
  const {
    VITE_SERVER_PORT,
    VITE_ADMIN,
    VITE_ADMIN_CHECKCODE,
    VITE_ADMIN_POSTADMINCODE,
  } = import.meta.env;

  const navigate = useNavigate();
  const [bg, setBG] = useState([]);
  const [inputs, setInputs] = useState([
    {
      codeInput: "",
      newPassInput: "",
    },
  ]);
  const [shouldSend, setShouldSend] = useState(false);
  const [codes, setCodes] = useState([]);

  const [sendAdmin, setSendAdmin] = useState([
    {
      // Email: "",
      Password: "",
    },
  ]);
  // const [pendingData, setPendingData] = useState([
  //   {
  //     Email: "",
  //     Password: "",
  //   },
  // ]);

  useEffect(() => {
    const bgArray = [];
    for (let i = 0; i <= 1; i++) {
      bgArray.push("redDragon");
    }
    setBG(bgArray);
  }, []);

  useEffect(() => {
    const getTokenOnce = async () => {
      try {
        const res = await getRequest(
          `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_CHECKCODE}`,
          false
        );
        const vCodes = res.data.map((vCode) => vCode.vCode);
        setCodes(vCodes);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(inputs[0].codeInput.length);
    getTokenOnce();
  }, []);

  const postNewAdmin = async () => {
    // const { Code, Email, Password } = pendingData[0];
    // console.log(Email, Password);
    try {
      await postRequest(
        `${VITE_SERVER_PORT}/${VITE_ADMIN}/${VITE_ADMIN_POSTADMINCODE}`,
        {
          Password: sendAdmin[0].Password,
          vCode: inputs[0].codeInput,
        },
        false
      );
      navigate("http://localhost:5173/admin/login");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(inputs);
  // }, [inputs]);

  useEffect(() => {
    const codeChecker = async () => {
      console.log(codes);
      codes.map((code) => {
        if (code.length > 5 && code === inputs[0].codeInput) {
          setShouldSend(true);
          // console.log("match found!");
        } else {
          setShouldSend(false);
          // console.log("nothing...");
        }
      });
    };
    codeChecker();
  }, [inputs[0].codeInput]);

  return (
    <div className="containerNew flex jcac combineW combineH bgImage">
      <div className="boxContainer flex jcac bRadius relative">
        <div className="bgs flex jcac absolute bgImage">
          {bg.map((bg, index) => {
            return (
              <p className={`${bg} bgImage flex relative`} key={index}></p>
            );
          })}
        </div>
        <div className="info combineW combineH flex jcac bRadius">
          <p className="title gradientText flex jcac bRadius">
            Verification Code
          </p>
          <input
            className="trans"
            value={inputs[0].codeInput}
            onChange={(e) => setInputs([{ codeInput: e.target.value }])}
            style={
              inputs[0].codeInput.length > 5 && !shouldSend
                ? { color: "#ca0d0d" }
                : inputs[0].codeInput.length > 5 && shouldSend
                ? { color: "green" }
                : { color: "orange" }
            }
            placeholder="Place code..."
            type="text"
          />
        </div>
        <div
          className={`${
            shouldSend ? "openTop" : "closeBottom"
          } combineW newPasswordContainer trans flex jcac`}
        >
          <input
            value={inputs[0].newPassInput}
            onChange={(e) => (
              setInputs([{ ...inputs[0], newPassInput: e.target.value }]),
              setSendAdmin([{ Password: e.target.value }])
            )}
            type="text"
            placeholder="Create new password..."
          />
          <button onClick={postNewAdmin} className="bRadius trans pointer">
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default SetNewPassword;

import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";

function TopPart() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;
  return (
    <div className="topPart flex">
      <p className="gradientText flex jcac">
        {currentPath === "/user/register"
          ? "Register"
          : currentPath === "/admin/login"
          ? "Admin Login"
          : "Login"}
      </p>
      <button
        className="flex jcac trans gradientText bRadius pointer"
        onClick={() => navigate("/drr/home")}
      >
        <AiOutlineHome />
        Home
      </button>
      <button
        className="flex jcac trans gradientText bRadius pointer"
        onClick={() =>
          navigate(
            `${
              currentPath === "/user/register"
                ? "/user/login"
                : "/user/register"
            }`
          )
        }
      >
        <FiLogIn />
        {currentPath === "/user/register" ? "Login" : "Register"}
      </button>
    </div>
  );
}

export default TopPart;

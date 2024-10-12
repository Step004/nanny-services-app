import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth.js";
import css from "./UserMenu.module.css";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../contexts/authContexts/index.jsx";
import { IoIosLogOut } from "react-icons/io";

export default function UserMenu() {
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    await doSignOut();
    navigate("/");
  };

  return (
    <div className={css.wrapper}>
      <div className={css.userNameContainer}>
        <span className={css.userIcon}>
          <FaUser className={css.userSvg} />
        </span>
        <p className={css.username}>{currentUser?.name || "Guest"}</p>
      </div>

      <button className={css.logout} onClick={handleLogout}>
        Logout
      </button>
      <IoIosLogOut className={css.logoutSVG} onClick={handleLogout} />
    </div>
  );
}

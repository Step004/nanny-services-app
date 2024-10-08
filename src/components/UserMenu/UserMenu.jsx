// import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { doSignOut } from '../firebase/auth.js';
import css from './UserMenu.module.css';
// import { logOut } from '../../redux/auth/operations';
// import { selectUser } from '../../redux/auth/selectors';
import { FaUser } from "react-icons/fa";
import { useAuth } from '../contexts/authContexts/index.jsx';

export default function UserMenu( ) {
  const { currentUser } = useAuth();
  
const navigate = useNavigate();
  const handleLogout = async () => {
    await doSignOut();
    navigate("/");
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>
        <span className={css.userIcon}>
          <FaUser className={css.userSvg} />
        </span>
        {currentUser?.name || "Guest"}
      </p>
      <button className={css.logout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

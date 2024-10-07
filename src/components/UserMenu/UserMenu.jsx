// import { useDispatch, useSelector } from 'react-redux';
import css from './UserMenu.module.css';
// import { logOut } from '../../redux/auth/operations';
// import { selectUser } from '../../redux/auth/selectors';
import { FaUser } from "react-icons/fa";

export default function UserMenu( ) {
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  // const handleLogout = () => {
  //   dispatch(logOut());
  // };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>
        <div className={css.userIcon}><FaUser className={ css.userSvg} /></div>
        User!
      </p>
      <button className={css.logout}>Logout</button>
    </div>
  );
}

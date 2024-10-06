import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import css from "./AppBar.module.css";
import LogInModalWindow from "../LogInModalWindow/LogInModalWindow.jsx";
import { useState } from "react";
import RegisterModalWindow from "../RegisterModalWindow/RegisterModalWindow.jsx";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

export default function AppBar() {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = false;
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const handleOpenModalLogIn = () => {
    setIsOpenLogIn(true);
  };
  const handleCloseModalLogIn = () => {
    setIsOpenLogIn(false);
  };


  const handleOpenModalRegister = () => {
    setIsOpenRegister(true);
  };
  const handleCloseModalRegister = () => {
    setIsOpenRegister(false);
  };
  return (
    <header className={css.header}>
      <p className={css.logotype}>Nanny.Services</p>
      <div className={css.navAndBut}>
        <Navigation />
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <AuthNav
            openLogIn={handleOpenModalLogIn}
            openReg={handleOpenModalRegister}
          />
        )}
      </div>
      {isOpenLogIn && <LogInModalWindow close={handleCloseModalLogIn} />}
      {isOpenRegister && (
        <RegisterModalWindow close={handleCloseModalRegister} />
      )}
    </header>
  );
}

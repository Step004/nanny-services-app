import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import css from "./AppBar.module.css";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../contexts/authContexts/index.jsx";

export default function AppBar({
  handleOpenModalLogIn,
  handleOpenModalRegister,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { userLoggedIn } = useAuth();
  const isLoggedIn = userLoggedIn;

  return (
    <header className={clsx(css.header, !isHomePage && css.headerFixed)}>
      <p className={css.logotype}>Nanny.Services</p>
      <div className={css.navAndBut}>
        <Navigation isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <AuthNav
            openLogIn={handleOpenModalLogIn}
            openReg={handleOpenModalRegister}
          />
        )}
      </div>
    </header>
  );
}

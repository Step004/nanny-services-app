import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import css from "./AppBar.module.css";
// import { useSelector } from "react-redux";
// import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

export default function AppBar() {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = false;
  return (
    <header className={css.header}>
      <p className={css.logotype}>Nanny.Services</p>
      <div className={css.navAndBut}>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </div>
    </header>
  );
}

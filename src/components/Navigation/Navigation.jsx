import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  const isLoggedIn = false;

  return (
    <nav className={css.navigation}>
      <NavLink to="/" className={buildLinkClass}>
        <p className={css.p}>Home</p>
      </NavLink>

      <NavLink to="/nannies" className={buildLinkClass}>
        Nannies
      </NavLink>

      {isLoggedIn && <NavLink to="/favorites" className={buildLinkClass}>
        Favorites
      </NavLink>}
    </nav>
  );
}

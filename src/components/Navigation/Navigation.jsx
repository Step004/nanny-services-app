import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation({ isLoggedIn }) {

  return (
    <>
      <nav className={css.navigation}>
        <NavLink to="/" className={buildLinkClass}>
          <p className={css.p}>Home</p>
        </NavLink>

        <NavLink to="/nannies" className={buildLinkClass}>
          Nannies
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/favorites" className={buildLinkClass}>
            Favorites
          </NavLink>
        )}
      </nav>
      <nav className={css.mobileNav}>
        <select
          className={css.select}
          onChange={(e) => (window.location.href = e.target.value)}
        >
          <option value="/" className={buildLinkClass}>
            Home
          </option>
          <option value="/nannies" className={buildLinkClass}>
            Nannies
          </option>
          {isLoggedIn && (
            <option value="/favorites" className={buildLinkClass}>
              Favorites
            </option>
          )}
        </select>
      </nav>
    </>
  );
}

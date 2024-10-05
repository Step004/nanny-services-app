import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {

  return (
    <nav>
      <NavLink to="/" className={buildLinkClass}>
        <p className={css.p }>Home</p>
      </NavLink>

      <NavLink to="/catalog" className={buildLinkClass}>
        Catalog
      </NavLink>
    </nav>
  );
}

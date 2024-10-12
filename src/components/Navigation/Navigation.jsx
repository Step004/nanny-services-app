import { NavLink, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import { useState } from "react";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation({ isLoggedIn }) {
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState(location.pathname);
  
  const navigate = useNavigate();
  const handleSelectChange = (e) => {
    const newPage = e.target.value;
    setSelectedPage(newPage); 
    navigate(newPage); 
  };
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
          value={selectedPage}
          onChange={handleSelectChange}
        >
          <option value="/">Home</option>
          <option value="/nannies">Nannies</option>
          {isLoggedIn && <option value="/favorites">Favorites</option>}
        </select>
      </nav>
    </>
  );
}

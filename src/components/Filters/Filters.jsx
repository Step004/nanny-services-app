import { useState } from "react";
import clsx from "clsx";
import css from "./Filters.module.css";
import { FaChevronDown } from "react-icons/fa";

const Filters = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Show all");

  const options = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onFilterChange(option);
  };

  return (
    <div className={css.dropdown}>
      <p className={css.textFilters}>Filters</p>
      <button
        className={clsx(css.button, isOpen && css.activeButton)}
        onClick={toggleDropdown}
      >
        {selectedOption}
        <FaChevronDown className={css.arrow} />
      </button>

      {isOpen && (
        <ul className={css.menu}>
          {options.map((option) => (
            <li
              key={option}
              className={clsx(
                css.menuItem,
                option === selectedOption && css.selected
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filters;

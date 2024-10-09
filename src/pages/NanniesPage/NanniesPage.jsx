import { Helmet } from "react-helmet-async";
import css from "./NanniesPage.module.css";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NannieList from "../../components/NannieList/NannieList.jsx";
import { useState } from "react";

export default function NanniesPage({
  nannieArray,
  handleOpenModalLogIn,
  handleOpenModalRegister,
}) {
  const [displayedNannies, setDisplayedNannies] = useState(3);
  const [selectedFilter, setSelectedFilter] = useState("Show all");

  const handleLoadMore = () => {
    setDisplayedNannies((prev) => prev + 3);
  };

   const handleFilterChange = (filter) => {
     setSelectedFilter(filter);
     setDisplayedNannies(3);
  };
  
  const getFilteredAndSortedNannies = () => {
    let filteredNannies = [...nannieArray];

    switch (selectedFilter) {
      case "A to Z":
        filteredNannies.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        filteredNannies.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Less than 10$":
        filteredNannies = filteredNannies.filter(
          (nanny) => nanny.price_per_hour < 10
        );
        break;
      case "Greater than 10$":
        filteredNannies = filteredNannies.filter(
          (nanny) => nanny.price_per_hour > 10
        );
        break;
      case "Popular":
        filteredNannies.sort((a, b) => b.rating - a.rating);
        break;
      case "Not popular":
        filteredNannies.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }

    return filteredNannies;
  };
  const filteredNannies = getFilteredAndSortedNannies()

  return (
    <div className={css.container}>
      <Helmet>
        <title>Nannies Page</title>
      </Helmet>
      <AppBar
        handleOpenModalLogIn={handleOpenModalLogIn}
        handleOpenModalRegister={handleOpenModalRegister}
      />
      <Filters onFilterChange={handleFilterChange} />
      <NannieList nannieArray={filteredNannies.slice(0, displayedNannies)} />
      {displayedNannies < filteredNannies.length &&
        filteredNannies.length > 0 && (
          <div className={css.loadMoreBtnContainer}>
            <button onClick={handleLoadMore} className={css.loadMoreBtn}>
              Load more
            </button>
          </div>
        )}
    </div>
  );
}

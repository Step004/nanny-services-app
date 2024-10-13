import { Helmet } from "react-helmet-async";
import css from "./NanniesPage.module.css";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NannieList from "../../components/NannieList/NannieList.jsx";
import PaletteSelector from "../../components/PaletteSelector/PaletteSelector.jsx";
import { useState } from "react";
import { getFilteredAndSortedNannies } from "../../functions/getFilteredAndSortedNannies.js";
import LogInModalWindow from "../../components/LogInModalWindow/LogInModalWindow.jsx";
import RegisterModalWindow from "../../components/RegisterModalWindow/RegisterModalWindow.jsx";

export default function NanniesPage({
  nannieArray,
}) {
  const [selectedFilter, setSelectedFilter] = useState("Show all");
  const [displayedNannies, setDisplayedNannies] = useState(3);
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

  const handleLoadMore = () => {
    setDisplayedNannies((prev) => prev + 3);
  };
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setDisplayedNannies(3);
  };

  const filteredNannies = getFilteredAndSortedNannies(
    nannieArray,
    selectedFilter
  );
  return (
    <main>
      <Helmet>
        <title>Nannies Page</title>
      </Helmet>
      <div className={css.appBar}>
        <AppBar
          handleOpenModalLogIn={handleOpenModalLogIn}
          handleOpenModalRegister={handleOpenModalRegister}
        />
      </div>
      <div className={css.container}>
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
      <PaletteSelector />
      {isOpenLogIn && (
        <LogInModalWindow
          close={handleCloseModalLogIn}
          open={handleOpenModalRegister}
        />
      )}
      {isOpenRegister && (
        <RegisterModalWindow
          close={handleCloseModalRegister}
          open={handleOpenModalLogIn}
        />
      )}
    </main>
  );
}

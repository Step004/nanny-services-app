import { useEffect, useState } from "react";
import { useAuth } from "../../components/contexts/authContexts/index.jsx";
import { getFavorites } from "../../components/firebase/favoritesService.js";
import NannieList from "../../components/NannieList/NannieList";
import css from "./FavoritesPage.module.css";
import { Helmet } from "react-helmet-async";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import { getFilteredAndSortedNannies } from "../../functions/getFilteredAndSortedNannies.js";

export default function FavoritesPage({
  handleOpenModalLogIn,
  handleOpenModalRegister,
  handleLoadMore,
}) {
  const [selectedFilter, setSelectedFilter] = useState("Show all");
  const [favoriteNannies, setFavoriteNannies] = useState([]);
  const [displayedNannies, setDisplayedNannies] = useState(3);

  const { currentUser } = useAuth();

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setDisplayedNannies(3);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (currentUser) {
        const favorites = await getFavorites(currentUser.uid);
        setFavoriteNannies(favorites);
      }
    };
    fetchFavorites();
  }, [currentUser]);

  if (!currentUser) return <p>Please log in to view your favorites.</p>;
  const filteredNannies = getFilteredAndSortedNannies(
    favoriteNannies,
    selectedFilter
  );
  return (
    <main className={css.container}>
      <Helmet>
        <title>Favorite Page</title>
      </Helmet>
      <AppBar
        handleOpenModalLogIn={handleOpenModalLogIn}
        handleOpenModalRegister={handleOpenModalRegister}
      />
      <Filters onFilterChange={handleFilterChange} />
      <div>
        {favoriteNannies.length > 0 ? (
          <NannieList
            nannieArray={filteredNannies.slice(0, displayedNannies)}
          />
        ) : (
          <p>No favorites added yet.</p>
        )}
      </div>
      {displayedNannies < filteredNannies.length &&
        filteredNannies.length > 0 && (
          <div className={css.loadMoreBtnContainer}>
            <button onClick={handleLoadMore} className={css.loadMoreBtn}>
              Load more
            </button>
          </div>
        )}
    </main>
  );
}

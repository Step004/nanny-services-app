import { Helmet } from "react-helmet-async";
import css from "./NanniesPage.module.css";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NannieList from "../../components/NannieList/NannieList.jsx";

export default function NanniesPage({
  handleOpenModalLogIn,
  handleOpenModalRegister,
  filteredNannies,
  handleFilterChange,
  displayedNannies,
  handleLoadMore,
}) {
  return (
    <main className={css.container}>
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
    </main>
  );
}

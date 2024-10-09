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
  const handleLoadMore = () => {
    setDisplayedNannies((prev) => prev + 3); 
  };

  return (
    <div className={css.container}>
      <Helmet>
        <title>Nannies Page</title>
      </Helmet>
      <AppBar
        handleOpenModalLogIn={handleOpenModalLogIn}
        handleOpenModalRegister={handleOpenModalRegister}
      />
      <Filters />
      <NannieList nannieArray={nannieArray.slice(0, displayedNannies)} />
      {displayedNannies < nannieArray.length && (
        <div className={css.loadMoreBtnContainer}>
        <button onClick={handleLoadMore} className={css.loadMoreBtn}>
          Load more
          </button>
          </div>
      )}
    </div>
  );
}

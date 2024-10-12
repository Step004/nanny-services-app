import "./App.module.css";
import { lazy, Suspense, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import { useDatabase } from "../firebase/readData.js";
import LogInModalWindow from "../LogInModalWindow/LogInModalWindow.jsx";
import RegisterModalWindow from "../RegisterModalWindow/RegisterModalWindow.jsx";
import { getFilteredAndSortedNannies } from "../../functions/getFilteredAndSortedNannies.js";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const NanniesPage = lazy(() =>
  import("../../pages/NanniesPage/NanniesPage.jsx")
);
const FavoritesPage = lazy(() =>
  import("../../pages/FavoritesPage/FavoritesPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

function App() {
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [displayedNannies, setDisplayedNannies] = useState(3);
  const [selectedFilter, setSelectedFilter] = useState("Show all");
  let { nannieArray, loading } = useDatabase();
  nannieArray = nannieArray.slice(0, -1);

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

  if (loading) {
    return <div>Loading...</div>;
  }

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

  return (
    <>
      <Layout>
        <Suspense fallback={<div>Please wait loading page...</div>}>
          <HelmetProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    handleOpenModalLogIn={handleOpenModalLogIn}
                    handleOpenModalRegister={handleOpenModalRegister}
                  />
                }
              />
              <Route
                path="/nannies"
                element={
                  <NanniesPage
                    nannieArray={nannieArray}
                    handleOpenModalLogIn={handleOpenModalLogIn}
                    handleOpenModalRegister={handleOpenModalRegister}
                    filteredNannies={filteredNannies}
                    handleFilterChange={handleFilterChange}
                    displayedNannies={displayedNannies}
                    handleLoadMore={handleLoadMore}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    nannieArray={nannieArray}
                    handleLoadMore={handleLoadMore}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
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
            
          </HelmetProvider>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

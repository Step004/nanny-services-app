import "./App.module.css";
import { lazy, Suspense, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";
import { useDatabase } from "../firebase/readData.js";
import LogInModalWindow from "../LogInModalWindow/LogInModalWindow.jsx";
import RegisterModalWindow from "../RegisterModalWindow/RegisterModalWindow.jsx";

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
  const { nannieArray, loading } = useDatabase();

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
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    nannieArray={nannieArray}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {isOpenLogIn && <LogInModalWindow close={handleCloseModalLogIn} />}
            {isOpenRegister && (
              <RegisterModalWindow close={handleCloseModalRegister} />
            )}
          </HelmetProvider>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

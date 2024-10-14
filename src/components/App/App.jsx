import "./App.module.css";
import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout.jsx";

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

  return (
    <>
      <Layout>
        <Suspense fallback={<div>Please wait loading page...</div>}>
          <HelmetProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/nannies"
                element={<NanniesPage />}
              />
              <Route
                path="/favorites"
                element={<FavoritesPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </HelmetProvider>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

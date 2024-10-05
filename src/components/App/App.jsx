import "./App.module.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import RestrictedRout from "../RestrictedRoute/RestrictedRoute.jsx";
import SharedLayout from "../SharedLayout/SharedLayout.jsx";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);


function App() {
  return (
    <>
      <SharedLayout>
        <Suspense fallback={<div>Please wait loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRout component={<RegisterPage />} redirectTo="/" />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRout
                  component={<LoginPage />}
                  redirectTo="/contacts"
                />
              }
            />
            <Route path="/nannies" element={<NanniesPage />} />
            {/* <Route path="nannies/:id" element={<NanniePage />}>
              <Route path="reviews" element={<NannieReviews />} />
            </Route> */}
            <Route
              path="/favorites"
              element={
                <PrivateRoute
                  component={<FavoritesPage />}
                  redirectTo="/login"
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </SharedLayout>
    </>
  );
}

export default App;

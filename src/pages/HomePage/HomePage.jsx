import { Helmet } from "react-helmet-async";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import css from "./HomePage.module.css";

export default function HomePage({
  handleOpenModalLogIn,
  handleOpenModalRegister,
}) {
  return (
    <div className={css.container}>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <AppBar
        handleOpenModalLogIn={handleOpenModalLogIn}
        handleOpenModalRegister={handleOpenModalRegister}
      />
      <Hero />
    </div>
  );
}

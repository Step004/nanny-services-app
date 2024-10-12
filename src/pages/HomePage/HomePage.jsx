import { Helmet } from "react-helmet-async";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import css from "./HomePage.module.css";
import PaletteSelector from "../../components/PaletteSelector/PaletteSelector.jsx";

export default function HomePage({
  handleOpenModalLogIn,
  handleOpenModalRegister,
}) {
  return (
    <main className={css.container}>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <AppBar
        handleOpenModalLogIn={handleOpenModalLogIn}
        handleOpenModalRegister={handleOpenModalRegister}
      />
      <Hero />
      <PaletteSelector />
    </main>
  );
}

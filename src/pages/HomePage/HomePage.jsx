import { Helmet } from "react-helmet-async";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import css from "./HomePage.module.css";
import PaletteSelector from "../../components/PaletteSelector/PaletteSelector.jsx";
import { useState } from "react";
import LogInModalWindow from "../../components/LogInModalWindow/LogInModalWindow.jsx";
import RegisterModalWindow from "../../components/RegisterModalWindow/RegisterModalWindow.jsx";

export default function HomePage() {
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

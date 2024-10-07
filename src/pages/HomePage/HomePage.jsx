import { Helmet } from "react-helmet-async";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Hero from "../../components/Hero/Hero.jsx";
import css from "./HomePage.module.css";
import LogInModalWindow from "../../components/LogInModalWindow/LogInModalWindow.jsx";
import { useState } from "react";
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
    <div className={css.container}>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <AppBar
        handleOpenModalLogIn={handleOpenModalLogIn}
        handleOpenModalRegister={handleOpenModalRegister}
      />
      <Hero />

      {isOpenLogIn && <LogInModalWindow close={handleCloseModalLogIn} />}
      {isOpenRegister && (
        <RegisterModalWindow close={handleCloseModalRegister} />
      )}
    </div>
  );
}

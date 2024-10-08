import { Helmet } from "react-helmet-async";
import css from "./NanniesPage.module.css";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Filters from "../../components/Filters/Filters.jsx";
import NannieList from "../../components/NannieList/NannieList.jsx";

export default function NanniesPage({
  nannieArray,
  handleOpenModalLogIn,
  handleOpenModalRegister,
}) {
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
      <NannieList nannieArray={nannieArray} />
    </div>
  );
}

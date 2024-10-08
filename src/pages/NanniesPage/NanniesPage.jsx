import { Helmet } from "react-helmet-async";
import css from "./NanniesPage.module.css";
import AppBar from "../../components/AppBar/AppBar.jsx";
import Filters from "../../components/Filters/Filters.jsx";
// import NannieList from "../../components/NannieList/NannieList.jsx";
import Nannie from "../../components/Nannie/Nannie.jsx";

export default function NanniesPage() {
  return (
    <div className={css.container}>
      <Helmet>
        <title>Nannies Page</title>
      </Helmet>
      <AppBar />
      <Filters />
      <Nannie />
    </div>
  );
}

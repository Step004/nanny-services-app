import css from "./Nannie.module.css";
import girl from "../../img/Image.png";
import { useState } from "react";

export default function Nannie() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Функція для перемикання стану картки
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={css.nannieCard}>
      <div className={css.photo}>
        <img src={girl} alt="nanny" />
      </div>
      <div className={css.aboutNanny}>
        <div className={css.location}></div>
        <div className={css.name}></div>
        <div className={css.characteristic}></div>
        <div className={css.description}></div>
        {!isExpanded && (
          <button onClick={toggleExpand} className={css.readMore}>
            Read more
          </button>
        )}
      </div>
      {isExpanded && (
        <div className={css.cardDetails}>
          <div className={css.reviews}>

          </div>
          <button className={css.contactWithNanny}>Make an appointment</button>
        </div>
      )}
    </div>
  );
}

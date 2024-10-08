import { nanoid } from "@reduxjs/toolkit";
import css from "./Nannie.module.css";
import { useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { FaRegStar } from "react-icons/fa6";

function calculateAge(birthday) {
  const birthDate = new Date(birthday); // Перетворюємо рядок дати на об'єкт Date
  const today = new Date(); // Отримуємо поточну дату
  let age = today.getFullYear() - birthDate.getFullYear(); // Обчислюємо різницю в роках

  // Перевіряємо, чи день народження вже пройшов у поточному році
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--; // Якщо ще не святкували день народження, зменшуємо вік на 1
  }

  return age; // Повертаємо обчислений вік
}

export default function Nannie({ nanny }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  console.log(nanny);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className={css.nannieCard}>
      <div className={css.photo}>
        <img src={nanny.avatar_url} alt="nanny" className={css.avatar} />
      </div>
      <div className={css.nannieCardInf}>
        <div className={css.aboutNanny}>
          <div className={css.firstRow}>
            <div className={css.nameContainer}>
              <p className={css.nanny}>Nanny</p>
              <p className={css.nannyName}>{nanny.name}</p>
            </div>

            <div className={css.location}>
              <div className={css.locationRating}>
                <div className={css.local}>
                <GrLocation />
                <p className={css.locationRatingDet}>{nanny.location}</p>
                </div>
                <span>|</span>
                <p>
                  <FaRegStar />
                  {nanny.rating}
                </p>
                <span>|</span>
                <p>
                  Price / 1 hour: <span>{nanny.price_per_hour}$</span>
                </p>
              </div>
              <div
                className={css.favoriteIconContainer}
                onClick={handleToggleFavorite}
              >
                {isFavorite ? (
                  <MdFavorite className={css.filled} />
                ) : (
                  <MdFavoriteBorder className={css.favoriteIcon} />
                )}
              </div>
            </div>
          </div>

          <div className={css.characteristic}>
            <p className={css.characteristicDet}>
              <span>Age: </span>
              {calculateAge(nanny.birthday)}
            </p>
            <p className={css.characteristicDet}>
              <span>Experience: </span>
              {nanny.experience}
            </p>
            <p className={css.characteristicDet}>
              <span>Kids age: </span>
              {nanny.kids_age}
            </p>
            <p className={css.characteristicDet}>
              <span>Characters: </span>
              {nanny.characters
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(", ")}
            </p>
            <p className={css.characteristicDet}>
              <span>Education: </span>
              {nanny.education}
            </p>
          </div>
          <div className={css.description}>{nanny.about}</div>
          {!isExpanded && (
            <button onClick={toggleExpand} className={css.readMore}>
              Read more
            </button>
          )}
        </div>
        {isExpanded && (
          <div className={css.cardDetails}>
            <ul className={css.reviews}>
              {nanny.reviews.map((review) => (
                <li className={css.card} key={nanoid()}>
                  <div>O</div>
                  <p>{review.reviewer}</p>
                  <p>{review.rating}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
            <button className={css.contactWithNanny}>
              Make an appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

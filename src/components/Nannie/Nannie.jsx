import { nanoid } from "@reduxjs/toolkit";
import css from "./Nannie.module.css";
import { useState } from "react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { FaStar } from "react-icons/fa";
import AppointmentModalWindow from "../AppointmentModalWindow/AppointmentModalWindow.jsx";

function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date(); 
  let age = today.getFullYear() - birthDate.getFullYear(); 

  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--; // 
  }

  return age; 
}

export default function Nannie({ nanny }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpenAppointment, setIsOpenAppointment] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleOpenModalAppointment = () => {
    setIsOpenAppointment(true);
  };
  const handleCloseModalAppointment = () => {
    setIsOpenAppointment(false);
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
                <p className={css.locationRatingDet}>
                  <GrLocation className={css.localIcon} />
                  {nanny.location}
                </p>

                <span>|</span>
                <p className={css.locationRatingDet}>
                  <FaStar className={css.starRating} />
                  Rating: {nanny.rating}
                </p>
                <span>|</span>
                <p className={css.locationRatingDet}>
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
              <span className={css.spanCharacteristic}>Age: </span>
              <span className={css.age}>{calculateAge(nanny.birthday)}</span>
            </p>
            <p className={css.characteristicDet}>
              <span className={css.spanCharacteristic}>Experience: </span>
              {nanny.experience}
            </p>
            <p className={css.characteristicDet}>
              <span className={css.spanCharacteristic}>Kids age: </span>
              {nanny.kids_age}
            </p>
            <p className={css.characteristicDet}>
              <span className={css.spanCharacteristic}>Characters: </span>
              {nanny.characters
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(", ")}
            </p>
            <p className={css.characteristicDet}>
              <span className={css.spanCharacteristic}>Education: </span>
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
                  <div className={css.reviewNameRating}>
                    <p className={css.firstLater}>
                      {review.reviewer.charAt(0)}
                    </p>
                    <div className={css.reviewerRating}>
                      <p className={css.reviewer}>{review.reviewer}</p>
                      <p className={css.rating}>
                        <FaStar className={css.starRating} />
                        {review.rating}
                      </p>
                    </div>
                  </div>
                  <p className={css.description}>{review.comment}</p>
                </li>
              ))}
            </ul>
            <button
              className={css.contactWithNanny}
              onClick={handleOpenModalAppointment}
            >
              Make an appointment
            </button>
          </div>
        )}
      </div>
      {isOpenAppointment && (
        <AppointmentModalWindow
          nanny={nanny}
          close={handleCloseModalAppointment}
        />
      )}
    </div>
  );
}

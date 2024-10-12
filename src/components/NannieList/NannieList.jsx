import { nanoid } from "@reduxjs/toolkit";
import Nannie from "../Nannie/Nannie";
import css from "./NannieList.module.css";

export default function NannieList({ nannieArray }) {
  return (
    <>
      <ul className={css.cardList}>
        {nannieArray.map((nanny) => (
          <li className={css.card} key={nanoid()}>
            <Nannie nanny={nanny} />
          </li>
        ))}
      </ul>
    </>
  );
}

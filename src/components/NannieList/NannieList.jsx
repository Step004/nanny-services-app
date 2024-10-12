import { nanoid } from "@reduxjs/toolkit";
import Nannie from "../Nannie/Nannie";
import css from "./NannieList.module.css";

export default function NannieList({ nannieArray }) {
  const filteredNannies = nannieArray.slice(0, -1);
  return (
    <>
      <ul className={css.cardList}>
        {filteredNannies.map((nanny) => (
          <li className={css.card} key={nanoid()}>
            <Nannie nanny={nanny} />
          </li>
        ))}
      </ul>
    </>
  );
}

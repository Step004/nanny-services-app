import { useSelector } from "react-redux";
import Nannie from "../Nannie/Nannie";
import css from "./NannieList.module.css";
import {  selectFilteredContacts } from "../../redux/contacts/selectors";


export default function NannieList() {
  const nannies = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css.cardList}>
        {nannies.map((nannies) => (
          <li className={css.card} key={nannies.id}>
            <Nannie nannie={nannies} />
          </li>
        ))}
      </ul>
    </>
  );
}

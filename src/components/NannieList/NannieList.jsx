import { useSelector } from "react-redux";
import Nannie from "../Nannie/Nannie";
import css from "./ContactList.module.css"
import {  selectFilteredContacts } from "../../redux/contacts/selectors";


export default function ContactList() {
  const nannies = useSelector(selectFilteredContacts);
 
  return (
    <>
      <ul className={css.cardList}>
        {nannies.map((nannies) => (
          <li className={css.card} key={nannies.id}>
            <Nannie Nannie={nannies} />
          </li>
        ))}
      </ul>
    </>
  );
}

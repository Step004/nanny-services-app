import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={css.buttons}>
      <button className={css.logButton}>Login</button>
      <button className={css.regButton}>Registration</button>
    </div>
  );
}

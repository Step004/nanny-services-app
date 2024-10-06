import css from "./AuthNav.module.css";

export default function AuthNav({ openLogIn, openReg }) {
  return (
    <div className={css.buttons}>
      <button className={css.logButton} onClick={openLogIn}>
        Login
      </button>
      <button className={css.regButton} onClick={openReg}>
        Registration
      </button>
    </div>
  );
}

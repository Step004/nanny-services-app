import { Field, Formik, Form } from "formik";
import css from "./LogInModalWindow.module.css";
// import { useDispatch } from "react-redux";
// import { logIn } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function LogInModalWindow({ close }) {
  // const dispatch = useDispatch();

  // const handleSubmit = (values, actions) => {
  //   dispatch(logIn(values))
  //     .unwrap()
  //     .then((response) => {
  //       console.log(response);
  //       toast.success("Success!!!");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error(`${error}!!!`);
  //     });

  //   actions.resetForm();
  // };

  const handleSubmit = (values, actions) => {
    toast.success("Success!!!");

    close();
    actions.resetForm();
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
      <div className={css.overlay} onClick={close}></div>
      <div className={css.window}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          <Form className={css.form} autoComplete="off">
            <IoClose className={css.closeBtn} onClick={close} />
            <p className={css.logInText}>Log In</p>
            <p className={css.welcomeText}>
              Welcome back! Please enter your credentials to access your account
              and continue your babysitter search.
            </p>
            <div className={css.fields}>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={css.field}
              />
              <div className={css.passwordWrapper}>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className={css.field}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={css.eyeIcon}
                >
                  {showPassword ? (
                    <RxEyeOpen className={css.eye} />
                  ) : (
                    <GoEyeClosed className={css.eye} />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className={css.submitButton}>
              Log In
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

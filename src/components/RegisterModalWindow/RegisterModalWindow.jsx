import { Field, Formik, Form } from "formik";
import css from "./RegisterModalWindow.module.css";
// import { useDispatch } from "react-redux";
// import { logIn } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function RegisterModalWindow({ close }) {
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
            <p className={css.logInText}>Registration</p>
            <p className={css.welcomeText}>
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
            <div className={css.fields}>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className={css.field}
              />
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
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

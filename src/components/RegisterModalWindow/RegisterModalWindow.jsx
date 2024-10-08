import { Field, Formik, Form } from "formik";
import css from "./RegisterModalWindow.module.css";

import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth.js";
import { useNavigate } from "react-router-dom";

export default function RegisterModalWindow({ close }) {
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const handleSubmit = async (values, actions) => {
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(
          values.email,
          values.password,
          values.name
        );
        navigate("/nannies");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
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
            name: "",
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

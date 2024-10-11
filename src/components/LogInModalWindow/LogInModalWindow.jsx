import { Field, Formik, Form } from "formik";
import css from "./LogInModalWindow.module.css";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { doSignInWithEmailAndPassword } from "../firebase/auth.js";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function LogInModalWindow({ close, open }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values, actions) => {
    if (!isLoggedIn) {
      setIsLoggedIn(true);
      await doSignInWithEmailAndPassword(values.email, values.password);
      navigate("/nannies");
    }
    close();
    actions.resetForm();
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

      useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === "Escape") {
            close();
          }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [close]);
  
  return (
    <>
      <div className={css.overlay} onClick={close}></div>
      <div className={css.window}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
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
            <p
              className={css.registr}
              onClick={() => {
                open();
                close();
              }}
            >
              Don't have an account? Registration
            </p>
          </Form>
        </Formik>
      </div>
    </>
  );
}

import { Field, Formik, Form, ErrorMessage } from "formik";
import css from "./RegisterModalWindow.module.css";
import * as Yup from "yup";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { doCreateUserWithEmailAndPassword } from "../../firebase/firebase/auth.js";
import { useNavigate } from "react-router-dom";

export default function RegisterModalWindow({ close, open }) {
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
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Name is required"),
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
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
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
              <div className={css.errorMsgCont}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={css.field}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.errorMsgCont}>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={css.field}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.errorMsg}
                />
              </div>
              <div className={css.passwordWrapper}>
                <div className={css.errorMsgCont}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className={css.field}
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className={css.errorMsg}
                  />
                </div>
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
            <p
              className={css.registr}
              onClick={() => {
                open();
                close();
              }}
            >
              Do you have an account? Log in
            </p>
          </Form>
        </Formik>
      </div>
    </>
  );
}

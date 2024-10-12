import { Field, Formik, Form, ErrorMessage } from "formik";
import css from "./AppointmentModalWindow.module.css";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import clsx from "clsx";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AppointmentModalWindow({
  close,
  nanny: { avatar_url, name },
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setIsOpen(false);
  };
  const handleSubmit = (val, actions) => {
    toast.success("Form submitted successfully!");
    close();
    actions.resetForm();
  };
  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    age: Yup.string().required("Child's age is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    parentName: Yup.string().required("Parent's name is required"),
    comment: Yup.string(),
    number: Yup.string()
      .matches(/^\+?3?8?(0\d{9})$/, "Invalid phone number format")
      .required("Number is required"),
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

  const generateTimeOptions = (startHour, endHour, step) => {
    const options = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };
  const timeOptions = generateTimeOptions(0, 24, 30);
  return (
    <>
      <div className={css.overlay} onClick={close}></div>
      <div className={css.window}>
        <Formik
          initialValues={{
            address: "",
            age: "",
            email: "",
            parentName: "",
            comment: "",
            number: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className={css.form} autoComplete="off">
            <IoClose className={css.closeBtn} onClick={close} />
            <p className={css.logInText}>
              Make an appointment with a babysitter
            </p>
            <p className={css.welcomeText}>
              Arranging a meeting with a caregiver for your child is the first
              step to creating a safe and comfortable environment. Fill out the
              form below so we can match you with the perfect care partner.
            </p>
            <div className={css.fields}>
              <div className={css.NameAndPhoto}>
                <img src={avatar_url} alt="nanny" className={css.avatar} />
                <div className={css.nannyName}>
                  <p className={css.preName}>Your nanny</p>
                  <p className={css.name}>{name}</p>
                </div>
              </div>
              <div className={css.fourFields}>
                <div>
                  <Field
                    name="address"
                    type="text"
                    placeholder="Address"
                    className={clsx(css.field, css.fieldFirstFour)}
                  />
                </div>
                <div>
                  <Field
                    name="number"
                    type="text"
                    placeholder="+380"
                    className={clsx(css.field, css.fieldFirstFour)}
                  />
                </div>
                <div>
                  <Field
                    name="age"
                    type="text"
                    placeholder="Child's age"
                    className={clsx(css.field, css.fieldFirstFour)}
                  />
                </div>
                <div className={css.clock}>
                  <div
                    className={clsx(css.field, css.fieldFirstFourClock)}
                    onClick={toggleDropdown}
                  >
                    {selectedTime || "00:00"}{" "}
                    <FaRegClock className={css.clockIcon} />
                  </div>

                  {isOpen && (
                    <div className={css.clockContainer}>
                      {timeOptions.map((time) => (
                        <div
                          key={time}
                          className={css.option}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={clsx(css.field, css.fieldLast)}
                />
              </div>
              <div>
                <Field
                  name="parentName"
                  type="text"
                  placeholder="Father's or mother's name"
                  className={clsx(css.field, css.fieldLast)}
                />
              </div>
              <div>
                <Field
                  name="comment"
                  as="textarea"
                  placeholder="Comment"
                  className={clsx(css.field, css.fieldComment)}
                />
              </div>
              <ErrorMessage
                name="meetingTime"
                component="span"
                className={css.errorMsg}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={css.errorMsg}
              />
              <ErrorMessage
                name="parentName"
                component="span"
                className={css.errorMsg}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.errorMsg}
              />
              <ErrorMessage
                name="age"
                component="span"
                className={css.errorMsg}
              />
              <ErrorMessage
                name="number"
                component="span"
                className={css.errorMsg}
              />
              <ErrorMessage
                name="address"
                component="span"
                className={css.errorMsg}
              />
            </div>

            <button type="submit" className={css.submitButton}>
              Send
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

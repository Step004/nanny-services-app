import { Field, Formik, Form, ErrorMessage } from "formik";
import css from "./AppointmentModalWindow.module.css";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import clsx from "clsx";

export default function AppointmentModalWindow({
  close,
  nanny: { avatar_url, name },
}) {
  const handleSubmit = (val, actions) => {
    close();
    console.log(avatar_url, name);

    actions.resetForm();
  };
  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    age: Yup.string().required("Child's age is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    parentName: Yup.string().required("Parent's name is required"),
    comment: Yup.string(),
    meetingTime: Yup.string().required("Meeting time is required"),
    number: Yup.string()
      .matches(/^\+?3?8?(0\d{9})$/, "Invalid phone number format")
      .required("Number is required"),
  });

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
      <div className={clsx(css.window, css.formContainer)}>
        <Formik
          initialValues={{
            address: "",
            age: "",
            email: "",
            parentName: "",
            comment: "",
            meetingTime: "",
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
                  <Field
                    as="select"
                    name="meetingTime"
                    placeholder="00:00"
                    className={clsx(css.field, css.fieldFirstFour)}
                  >
                    <option value="">Meeting time</option>
                  
                      
                    
                  </Field><div className={css.clockContainer}>{timeOptions.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}</div>
                  <FaRegClock className={css.clockIcon} />
                  
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

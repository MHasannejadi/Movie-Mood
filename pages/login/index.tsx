import styles from "./login.module.scss";
import * as React from "react";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";

interface MyFormValues {
  username: string;
  password: string;
}

export const LoginPage: React.FC<{}> = () => {
  const initialValues: MyFormValues = { username: "", password: "" };
  return (
    <div className={styles.login}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form>
          <h1>Sign in</h1>
          <label htmlFor="username">Username</label>
          <Field
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
          />

          <label htmlFor="password">Password</label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;

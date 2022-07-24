import styles from "pages/login/login.module.scss";
import * as React from "react";
import { Formik, FormikProps, Form, Field, FieldProps } from "formik";
import {
  useCreateSessionMutation,
  useCreateTokenQuery,
  useLoginMutation,
} from "services/userApi";
import { useRouter } from "next/router";
import apiKey from "api/apiKey";
import toast, { Toaster } from "react-hot-toast";
import Loader from "components/loader/loader";
import { useEffect } from "react";

interface MyFormValues {
  username: string;
  password: string;
}

export const LoginPage: React.FC<{}> = () => {
  const initialValues: MyFormValues = { username: "", password: "" };
  const router = useRouter();
  let isLoading = true;
  const {
    refetch,
    data: request_token = null,
    isLoading: isLoadingToken,
  } = useCreateTokenQuery(apiKey);
  const [loginPost, { isLoading: isLoadingLogin }] = useLoginMutation();
  const [getSession, { isLoading: isLoadingSession }] =
    useCreateSessionMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  isLoading = isLoadingToken || isLoadingLogin || isLoadingSession;

  const errorNotify = () =>
    toast.error("The information entered is not correct.");

  const submitHandler = async ({
    values,
    actions,
  }: {
    values: MyFormValues;
    actions: any;
  }) => {
    try {
      const { username, password } = values;
      actions.setSubmitting(false);
      if (!isLoadingToken) {
        const loginResponse = await loginPost({
          key: apiKey,
          request_token: request_token.request_token,
          username,
          password,
        }).unwrap();
        if (loginResponse.success) {
          const sessionResponse = await getSession({
            key: apiKey,
            request_token: loginResponse.request_token,
          }).unwrap();
          if (sessionResponse.success) {
            localStorage.setItem("session_id", sessionResponse.session_id);
            router.push("/");
          }
        }
      }
    } catch (error: any) {
      if (error?.data?.status_code === 33) {
        refetch();
      }
      if (error?.data?.status_code === 30) {
        errorNotify();
      }
    }
  };

  return (
    <div className={styles.login}>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            submitHandler({ values, actions });
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
      )}
    </div>
  );
};

export default LoginPage;

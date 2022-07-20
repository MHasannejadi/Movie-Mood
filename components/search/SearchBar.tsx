import styles from "./search-bar.module.scss";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";

interface MyFormValues {
  query: string;
}

function SearchBar() {
  const initialValues: MyFormValues = { query: "" };
  const router = useRouter();
  const submitHandler = async ({
    values,
    actions,
  }: {
    values: MyFormValues;
    actions: any;
  }) => {
    try {
      const { query } = values;
      actions.setSubmitting(false);
      if (query) {
        router.push(`/movie/search?q=${query}`);
      }
    } catch {}
  };

  return (
    <div className={styles.search}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          submitHandler({ values, actions });
        }}
      >
        <Form>
          <Field
            type="text"
            id="query"
            name="query"
            placeholder="Search for movies"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
}

export default SearchBar;

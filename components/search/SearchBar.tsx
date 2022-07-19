import styles from "./search.module.scss";
import { Formik, Form, Field, FormikProps } from "formik";
import { useSearchQuery } from "../../services/movieApi";
import { useEffect, useRef, useState } from "react";
import apiKey from "../../api/apiKey";

interface MyFormValues {
  query: string;
}

function SearchBar() {
  const initialValues: MyFormValues = { query: "" };
  const [skip, setSkip] = useState(true);
  const formRef = useRef<FormikProps<any>>(null);
  const {
    refetch,
    data = null,
    isLoading: isLoadingSearch,
  } = useSearchQuery(
    { query: formRef.current?.values.query, key: apiKey },
    { skip }
  );

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
        refetch();
        console.log(data);
      }
    } catch {}
  };

  useEffect(() => {
    if (formRef.current) {
      console.log(formRef.current.values);
    }
  }, [formRef.current?.values]);

  return (
    <div className={styles.search}>
      <Formik
        innerRef={formRef}
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

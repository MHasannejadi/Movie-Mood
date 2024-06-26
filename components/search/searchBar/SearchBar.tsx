import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import { useRouter } from "next/router";
import apiToken from "api/token";
import { useSearchQuery } from "services/movieApi";
import SearchBox from "components/search/searchBox/SearchBox";
import styles from "components/search/searchBar/search-bar.module.scss";

interface MyFormValues {
  query: string;
}

function SearchBar() {
  const initialValues: MyFormValues = { query: "" };
  const [skip, setSkip] = useState(true);
  const router = useRouter();
  const [isActiveBox, setIsActiveBox] = useState(false);
  const formRef = useRef<FormikProps<any>>(null);
  const {
    refetch,
    data = null,
    isLoading: isLoadingSearch,
  } = useSearchQuery(
    { query: formRef.current?.values.query, token: apiToken },
    { skip }
  );

  function debounce(callback: any, delay: number | undefined) {
    let timeout: any;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(callback, delay);
    };
  }

  const searchHandler = debounce(() => {
    if (formRef.current?.values.query) {
      setSkip(false);
      refetch();
    } else {
      setIsActiveBox(false);
    }
  }, 1000);

  useEffect(() => {
    if (data) {
      setIsActiveBox(true);
    }
  }, [data]);

  useEffect(() => {
    if (formRef.current?.values.query === "") {
      setIsActiveBox(false);
    }
  }, []);

  const submitHandler = ({
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
        innerRef={formRef}
        onSubmit={(values, actions) => {
          submitHandler({ values, actions });
        }}
      >
        <Form>
          <Field
            type="text"
            id="query"
            name="query"
            onKeyUp={searchHandler}
            placeholder="Search for movies"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {isActiveBox && (
        <SearchBox
          results={data.results.slice(0, 5)}
          query={formRef.current?.values.query}
        />
      )}
    </div>
  );
}

export default SearchBar;

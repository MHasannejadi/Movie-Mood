/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiKey from "../../../api/apiKey";
import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";
import { useGetMovieQuery } from "../../../services/movieApi";
import styles from "./movie.module.scss";

const MoviePage: NextPageWithLayout = () => {
  const router = useRouter();
  const [skip, setSkip] = useState(true);
  const {
    data: movie = {},
    isLoading,
    isFetching,
  } = useGetMovieQuery({ key: apiKey, id: router.query.movieId }, { skip });

  useEffect(() => {
    if (router.query.movieId) {
      setSkip(false);
    }
  }, [router.query.movieId]);
  
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !isFetching && (
        <main className={styles["movie-page"]}>
          <div className={styles["movie-page__header"]}>
            <section className={styles["movie-page__header__image-section"]}>
              <img
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt={movie.title}
              ></img>
            </section>
            <section className={styles["movie-page__header__detail-section"]}>
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <button>Add to Watch List</button>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

MoviePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MoviePage;

/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import apiKey from "../../../api/apiKey";
import Layout from "../../../components/layout";
import { NextPageWithLayout } from "../../_app";
import { useGetMovieQuery } from "../../../services/movieApi";
import styles from "./movie.module.scss";
import { useAddToWatchListMutation } from "../../../services/userApi";
import toast from "react-hot-toast";
import Loader from "../../../components/loader/loader";

const MoviePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: movie = {}, isLoading } = useGetMovieQuery(
    { key: apiKey, id: router.query.movieId },
    { skip: !router.query.movieId }
  );

  const [sessionId, setSessionId] = useState<string | null>();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
    setUserData(JSON.parse(localStorage.getItem("user_data") || ""));
  }, []);

  const [addToWatchlist, { isLoading: isLoadingWatchlist }] =
    useAddToWatchListMutation();

  const addToWatchlistHandler = async (command: string) => {
    if (sessionId && userData) {
      try {
        const watchlistResponse = await addToWatchlist({
          account_id: userData.id,
          key: apiKey,
          session_id: sessionId,
          media_id: movie.id,
          media_type: "movie",
          watchlist: command === "add" ? true : false,
          movie_data: movie,
        }).unwrap();
        if (watchlistResponse.success) {
          if (command === "add") {
            toast.success("Successfully added to watchlist");
          }
        }
      } catch (error: any) {
        toast.error(error.data.status_message);
      }
    } else {
      toast.error("Please login to add to watchlist");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className={styles.movie_page}>
          <div className={styles.movie_page__header}>
            <section className={styles.movie_page__header__image_section}>
              <img
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
                alt={movie.title}
              ></img>
            </section>
            <section className={styles.movie_page__header__detail_section}>
              <h1>{movie.title}</h1>
              <p>{movie.overview}</p>
              <button onClick={() => addToWatchlistHandler("add")}>
                {isLoadingWatchlist ? "Loading..." : "Add to Watchlist"}
              </button>
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

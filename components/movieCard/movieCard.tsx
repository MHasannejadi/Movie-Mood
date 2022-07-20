/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./movie-card.module.scss";
import { useState, useEffect } from "react";
import { useAddToWatchListMutation } from "../../services/userApi";
import apiKey from "../../api/apiKey";
import toast, { Toaster } from "react-hot-toast";

function MovieCard({
  movie,
  addOrRemove,
  refetch,
}: {
  movie: any;
  addOrRemove: string;
  refetch: () => void;
}) {
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
        }).unwrap();
        if (watchlistResponse.success) {
          if (command === "add") {
            toast.success("Successfully added to watchlist");
          } else {
            refetch();
          }
        }
      } catch (error: any) {
        toast.error(error.data.status_message);
      }
    }
  };

  return (
    <>
      <li key={movie.id}>
        <article className={styles.card}>
          <Link href={`/movie/${movie.id}`}>
            <img
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`}
              alt={movie.title}
            ></img>
          </Link>{" "}
          <div className={styles.detail}>
            <Link href={`/movie/${movie.id}`}>
              <span className={styles.title}>{movie.title}</span>
            </Link>{" "}
            <p>{movie.overview}</p>
            <span className={styles.rate}>Rate: {movie.vote_average}</span>
          </div>
          {addOrRemove === "add" ? (
            <button onClick={() => addToWatchlistHandler("add")}>
              {isLoadingWatchlist ? "Loading..." : "Add to Watchlist"}
            </button>
          ) : (
            <button onClick={() => addToWatchlistHandler("remove")}>
              {isLoadingWatchlist ? "Loading..." : "Remove from Watchlist"}
            </button>
          )}
        </article>
      </li>
    </>
  );
}

export default MovieCard;

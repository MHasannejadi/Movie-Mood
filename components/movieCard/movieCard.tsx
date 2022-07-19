/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./movie-card.module.scss";
import { useState, useEffect } from "react";
import { useAddToWatchListMutation } from "../../services/userApi";
import apiKey from "../../api/apiKey";
import toast, { Toaster } from "react-hot-toast";

function MovieCard({ movie }: { movie: any }) {
  const [sessionId, setSessionId] = useState<string | null>();
  const [userData, setUserData] = useState<any>();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
    setUserData(JSON.parse(localStorage.getItem("user_data") || ""));
  }, []);

  const [addToWatchlist, { isLoading: isLoadingWatchlist }] =
    useAddToWatchListMutation();

  const addToWatchlistHandler = async () => {
    if (sessionId && userData) {
      try {
        const watchlistResponse = await addToWatchlist({
          account_id: userData.id,
          key: apiKey,
          session_id: sessionId,
          media_id: movie.id,
          media_type: "movie",
          watchlist: true,
        }).unwrap();
        if (watchlistResponse.success) {
          setIsSelected(true);
        }
      } catch (error: any) {
        toast.error(error.data.status_message);
      }
    }
  };

  return (
    <>
      <li key={movie.id}>
        {/* <Toaster /> */}
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
          <button onClick={addToWatchlistHandler}>Add to Watch List</button>
          {/* {!isSelected && (
          )} */}
          {/* {isSelected && <button>Remove from Watch List</button>} */}
        </article>
      </li>
    </>
  );
}

export default MovieCard;

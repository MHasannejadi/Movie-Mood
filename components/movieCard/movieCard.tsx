/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "components/movieCard/movie-card.module.scss";
import { useAddToWatchListMutation } from "services/userApi";
import apiKey from "api/apiKey";
import toast from "react-hot-toast";
import { imageSourceLowQuality } from "constants/image";

function MovieCard({
  movie,
  addOrRemove,
}: {
  movie: any;
  addOrRemove: string;
}) {
  const [addToWatchlist, { isLoading: isLoadingWatchlist }] =
    useAddToWatchListMutation();

  const addToWatchlistHandler = async (command: string) => {
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    const sessionId = localStorage.getItem("session_id");

    if (sessionId && userData) {
      try {
        await addToWatchlist({
          account_id: userData?.id,
          key: apiKey,
          session_id: sessionId,
          media_id: movie.id,
          media_type: "movie",
          watchlist: command === "add" ? true : false,
          movie_data: movie,
        })
          .unwrap()
          .then((res) => {
            if (res.success) {
              if (command === "add") {
                toast.success("Successfully added to watchlist");
              }
            }
          });
      } catch (error: any) {
        toast.error(error.data.status_message);
      }
    } else {
      toast.error("Please login to add to watchlist");
    }
  };

  return (
    <>
      <li key={movie.id}>
        <article className={styles.card}>
          <Link href={`/movie/${movie.id}`}>
            <img
              src={imageSourceLowQuality + movie.poster_path}
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

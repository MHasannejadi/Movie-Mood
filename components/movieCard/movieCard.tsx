/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./movie-card.module.scss";

function MovieCard({ movie }: { movie: any }) {
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
          <button>Add to Watch List</button>
        </article>
      </li>
    </>
  );
}

export default MovieCard;

import Link from "next/link";
import { useEffect } from "react";
import MovieCard from "../../components/movieCard/movieCard";
import { useGetPopularMoviesQuery } from "../../services/movieApi";
import styles from "./home.module.scss";

function HomePage() {
  let token: string | null = "";
  useEffect(() => {
    token = localStorage.getItem("session_id");
  }, []);
  const {
    data = [],
    isLoading,
    isFetching,
  } = useGetPopularMoviesQuery("bd422e7b500e20ac0bad0f395328407c");

  return (
    <div className={styles.home}>
      {/* {isLoading && <div>Loading...</div>} */}
      {!isLoading && !isFetching && data.results.length > 0 && (
        <div>
          <h1>Popular Movies</h1>
          <ul>
            {data.results.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HomePage;

import apiKey from "api/apiKey";
import Loader from "components/loader/loader";
import MovieCard from "components/movieCard/movieCard";
import { useGetPopularMoviesQuery } from "services/movieApi";
import styles from "pages/home/home.module.scss";

function HomePage() {
  const { data = [], isLoading } = useGetPopularMoviesQuery(apiKey);

  return (
    <div className={styles.home}>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        data.results?.length > 0 && (
          <div>
            <h1>Popular Movies</h1>
            <ul>
              {data.results.map((movie: any) => (
                <MovieCard key={movie.id} movie={movie} addOrRemove="add" />
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

export default HomePage;

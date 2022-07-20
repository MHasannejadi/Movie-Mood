import Link from "next/link";
import styles from "./search-box.module.scss";

function SearchBox({ results, query }: { results: any; query: any }) {
  return (
    <>
      <div id={styles["search-box"]}>
        <ul>
          {results?.length ? (
            results?.map((movie: any) => (
              <li key={movie.id}>
                <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
              </li>
            ))
          ) : (
            <li>
              <span>No results found</span>
            </li>
          )}
          {results?.length > 0 && (
            <li className={styles.more}>
              <Link href={`/movie/search?q=${query}`}>More results</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default SearchBox;

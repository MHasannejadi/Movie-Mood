import Link from "next/link";
import styles from "./search-box.module.scss";

function SearchBox({ results, query }: { results: any; query: any }) {
  return (
    <>
      <div id={styles.search_box}>
        <ul>
          {results?.length ? (
            results?.map((movie: any) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <li>{movie.title}</li>
              </Link>
            ))
          ) : (
            <li>
              <span>No results found</span>
            </li>
          )}
          {results?.length > 0 && (
            <Link href={`/movie/search?q=${query}`}>
              <li className={styles.more}>More results</li>
            </Link>
          )}
        </ul>
      </div>
    </>
  );
}

export default SearchBox;

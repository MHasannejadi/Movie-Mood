import { useState, useEffect, ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import styles from "./watchlist.module.scss";
import Layout from "../../components/layout";
import MovieCard from "../../components/movieCard/movieCard";
import { useGetWatchListQuery } from "../../services/userApi";
import apiKey from "../../api/apiKey";
import Loader from "../../components/loader/loader";

const WatchlistPage: NextPageWithLayout = () => {
  const [sessionId, setSessionId] = useState<string | null>();
  const [userData, setUserData] = useState<any>();

  const { data = null, isLoading: isLoadingSearch } = useGetWatchListQuery(
    {
      account_id: userData?.id,
      key: apiKey,
      session_id: sessionId,
    },
    { skip: !userData }
  );
  useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
    setUserData(JSON.parse(localStorage.getItem("user_data") || ""));
  }, []);

  return (
    <div className={styles["watchlist-page"]}>
      {isLoadingSearch ? (
        <Loader />
      ) : data && data?.results?.length > 0 ? (
        <div>
          <h1>Your Watchlist</h1>
          <ul>
            {data?.results.map((movie: any) => (
              <MovieCard addOrRemove="remove" key={movie.id} movie={movie} />
            ))}
          </ul>
        </div>
      ) : (
        <h1>Your watchlist is empty</h1>
      )}
    </div>
  );
};

WatchlistPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default WatchlistPage;

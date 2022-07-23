import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiKey from "../../api/apiKey";
import { useGetUserDataQuery } from "../../services/userApi";
import SearchBar from "../search/searchBar/SearchBar";
import styles from "./navbar.module.scss";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>();

  const router = useRouter();

  const credentials = {
    key: apiKey,
    session_id: sessionId || null,
  };

  const {
    data: userData = {},
    refetch,
    isLoading,
  } = useGetUserDataQuery(credentials, {
    skip: !sessionId,
  });

  useEffect(() => {
    if (userData.username) {
      setIsLogin(true);
      localStorage.setItem("user_data", JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    let session = localStorage.getItem("session_id") || "";
    setSessionId(session);
  }, []);

  const logoutHandler = async () => {
    localStorage.removeItem("session_id");
    setSessionId(null);
    setIsLogin(false);
    router.push("/");
  };

  const loginClickHandler = () => {
    if (isLogin) {
      logoutHandler();
    } else {
      router.push("/login");
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {isLogin && (
            <li>
              <Link href="/watchlist">Watchlist</Link>
            </li>
          )}
          <li>
            <SearchBar />
          </li>
          <li className={styles.user}>
            {!isLoading && (
              <>
                {isLogin && <span>{userData.username}</span>}
                <button onClick={loginClickHandler}>
                  {isLogin && "Logout"}
                  {!isLogin && "Login"}
                </button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

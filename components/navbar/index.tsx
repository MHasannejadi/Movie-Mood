import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiKey from "../../api/apiKey";
import { useGetUserDataQuery } from "../../services/userApi";
import SearchBar from "../SearchBar";
import styles from "./navbar.module.scss";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>();

  const router = useRouter();

  const credentials = {
    key: apiKey,
    session_id: sessionId,
  };

  const { data: userData = {}, isLoading } = useGetUserDataQuery(credentials);

  useEffect(() => {
    if (userData.username) {
      setIsLogin(true);
    }
  }, [userData]);

  useEffect(() => {
    let session = localStorage.getItem("session_id") || "";
    setSessionId(session);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("session_id");
    setIsLogin(false);
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
          <li>
            <Link href="/watch-list">Watch List</Link>
          </li>
          <li>
            <SearchBar />
          </li>
          <li>
            <button onClick={loginClickHandler}>
              {isLogin && <>Logout</>}
              {!isLogin && <>Login</>}
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

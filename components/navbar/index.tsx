import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SearchBar from "../SearchBar";
import styles from "./navbar.module.scss";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const logoutHandler = () => {};

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

import Link from "next/link";
import SearchBar from "../SearchBar";
import styles from "./navbar.module.scss";

function Navbar() {
  const logoutHandler = () => {};

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
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

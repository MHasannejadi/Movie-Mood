import { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "./navbar";
import styles from "./layout.module.scss";

type layoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: layoutProps) {
  return (
    <>
      <Provider store={store}>
        <Navbar />
      </Provider>
      <main className={styles.layout}>{children}</main>
    </>
  );
}

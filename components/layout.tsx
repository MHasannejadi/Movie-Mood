import { ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Navbar from "./navbar";
import styles from "./layout.module.scss";
import { Toaster } from "react-hot-toast";

type layoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: layoutProps) {
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <Navbar />
      </Provider>
      <main className={styles.layout}>{children}</main>
    </>
  );
}

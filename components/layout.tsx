import { ReactElement } from "react";
import Navbar from "./navbar";

type layoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: layoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

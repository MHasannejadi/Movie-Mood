import { ReactElement } from "react";
import Navbar from "./Navbar";

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

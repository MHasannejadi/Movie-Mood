import type { ReactElement } from "react";
import Layout from "../components/layout";
import HomePage from "./home/homePage";
import type { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
  return <HomePage />;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;

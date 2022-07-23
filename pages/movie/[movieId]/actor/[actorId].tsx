/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import apiKey from "../../../../api/apiKey";
import Layout from "../../../../components/layout";
import Loader from "../../../../components/loader/loader";
import { useGetActorQuery } from "../../../../services/actorApi";
import { NextPageWithLayout } from "../../../_app";
import styles from "./actor.module.scss";

const ActorPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {
    data: actor = {},
    isLoading,
  } = useGetActorQuery({ key: apiKey, id: router.query.actorId });

  return (
    <main className={styles["actor-page"]}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles["actor-page__header"]}>
          <section className={styles["actor-page__header__image-section"]}>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${actor.profile_path}`}
              alt={actor.name}
            ></img>
          </section>
          <section className={styles["actor-page__header__detail-section"]}>
            <h1>{actor.name}</h1>
            <p>{actor.biography}</p>
          </section>
        </div>
      )}
    </main>
  );
};

ActorPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ActorPage;

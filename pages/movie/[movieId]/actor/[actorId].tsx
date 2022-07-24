/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import apiKey from "api/apiKey";
import Layout from "components/layout";
import Loader from "components/loader/loader";
import { useGetActorQuery } from "services/actorApi";
import { NextPageWithLayout } from "pages/_app";
import styles from "pages/movie/[movieId]/actor/actor.module.scss";

const ActorPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: actor, isLoading } = useGetActorQuery({
    key: apiKey,
    id: router.query.actorId,
  });

  return (
    <main className={styles.actor_page}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.actor_page__header}>
          <section className={styles.actor_page__header__image_section}>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${actor.person.profile_path}`}
              alt={actor.person.name}
            ></img>
          </section>
          <section className={styles.actor_page__header__detail_section}>
            <h1>{actor.person.name}</h1>
            <span>Popularity: {actor.person.popularity.toFixed(1)}</span>
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

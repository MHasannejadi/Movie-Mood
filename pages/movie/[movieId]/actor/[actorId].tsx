/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import Layout from "components/layout";
import Loader from "components/loader/loader";
import { useGetActorQuery } from "services/actorApi";
import { NextPageWithLayout } from "pages/_app";
import styles from "pages/movie/[movieId]/actor/actor.module.scss";
import { imageSourceHighQuality } from "constants/image";
import apiToken from "api/token";

const ActorPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: actor, isLoading } = useGetActorQuery({
    token: apiToken,
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
              src={imageSourceHighQuality + actor.person.profile_path}
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

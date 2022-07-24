/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "components/actorCard/actor-card.module.scss";
import { imageSourceLowQuality } from "constants/image";

function ActorCard({ actor: actor, movieId }: { actor: any; movieId: any }) {
  return (
    <>
      <li key={actor.id}>
        <article className={styles.card}>
          <Link href={`/movie/${movieId}/actor/${actor.credit_id}`}>
            <img
              src={imageSourceLowQuality + actor.profile_path}
              alt={actor.name}
            ></img>
          </Link>{" "}
          <div className={styles.detail}>
            <Link href={`/movie/${movieId}/actor/${actor.id}`}>
              <span className={styles.title}>{actor.name}</span>
            </Link>{" "}
            <span className={styles.rate}>
              Popularity: {Math.round(actor.popularity)}
            </span>
          </div>
        </article>
      </li>
    </>
  );
}

export default ActorCard;

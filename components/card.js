import Image from "next/image";
import Link from "next/link";

import cls from "classnames";

import styles from "./card.module.css";

const Card = ({ imgUrl, name, id }) => {
  return (
    <Link className={styles.cardLink} href={`/coffee-store/${id}`}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={imgUrl}
            alt={name}
            width={300}
            height={300}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;

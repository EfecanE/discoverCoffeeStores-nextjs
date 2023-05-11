import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import cls from "classnames";
import styles from "@/styles/coffee-detail.module.css";

import coffeeStoresData from "@/data/coffee-stores.json";

export async function getStaticPaths() {
  return {
    paths: coffeeStoresData.map((coffeeStore) => {
      return { params: { id: coffeeStore.id.toString() } };
    }),
    fallback: true,
  };
}

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStore = coffeeStoresData.find((store) => {
    return store.id.toString() === params.id;
  });

  return {
    props: {
      coffeeStore,
    },
  };
}

const CoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleUpVote = () => {
    console.log("upvoted");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeStore.name} | Coffee Connoisseur</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">Back to Homepage</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{coffeeStore.name}</h1>
          </div>
          <Link
            className={styles.imageWrapper}
            href={coffeeStore.websiteUrl}
            target="_blank"
          >
            <Image
              className={styles.storeImg}
              src={coffeeStore.imgUrl}
              alt={coffeeStore.name}
              width={600}
              height={360}
            />
          </Link>
        </div>

        <div className={cls(styles.col2, "glass")}>
          <div className={styles.iconWrapper}>
            <Image
              width={24}
              height={24}
              src={"/static/places.svg"}
              alt="Places Icon"
            />
            <p className={styles.text}>{coffeeStore.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              width={24}
              height={24}
              src={"/static/nearMe.svg"}
              alt="Near Me Icon"
            />
            <p className={styles.text}>{coffeeStore.neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              width={24}
              height={24}
              src={"/static/star.svg"}
              alt="Star Icon"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpVote}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;

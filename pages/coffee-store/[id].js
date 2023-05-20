import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import cls from "classnames";
import styles from "@/styles/coffee-detail.module.css";

import { fetchCoffeeStores, fetchCoffeeStoresImage } from "@/lib/coffee-stores";

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const coffeeStoresWithImage = await fetchCoffeeStoresImage(
    coffeeStores,
    "600x600"
  );
  return {
    paths: coffeeStoresWithImage.map((coffeeStore) => {
      return { params: { id: coffeeStore.fsq_id } };
    }),
    fallback: true,
  };
}

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  const coffeeStoresWithImage = await fetchCoffeeStoresImage(
    coffeeStores,
    "600x600"
  );
  const coffeeStore = coffeeStoresWithImage.find((store) => {
    return store.fsq_id === params.id;
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
            <Link href="/">← Back to Homepage</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{coffeeStore.name}</h1>
          </div>
          <Link
            className={styles.imageWrapper}
            href={coffeeStore.link}
            target="_blank"
          >
            <Image
              className={styles.storeImg}
              src={coffeeStore.image}
              alt={coffeeStore.name}
              width={600}
              height={450}
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
            <p className={styles.text}>{coffeeStore.name}</p>
          </div>
          {coffeeStore.formatted_address && (
            <div className={styles.iconWrapper}>
              <Image
                width={24}
                height={24}
                src={"/static/nearMe.svg"}
                alt="Near Me Icon"
              />
              <p className={styles.text}>{coffeeStore.formatted_address}</p>
            </div>
          )}
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

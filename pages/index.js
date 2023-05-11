import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";

import coffeeStoresData from "@/data/coffee-stores.json";
import styles from "@/styles/home.module.css";

export async function getStaticProps(context) {
  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  };
}

export default function Home(props) {
  const handleOnBannerBtnClick = () => {
    console.log("clicked");
  };

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Banner
          buttonText={"View shops nearby"}
          buttonOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.imageWrapper}>
          <Image
            src="/../public/static/hero-image.png"
            alt="hero image"
            width={256}
            height={256}
          ></Image>
        </div>
      </header>
      <main className={styles.main}>
        {props.coffeeStores.length > 0 && (
          <h1 className={styles.cardWrapperTitle}>Toronto Stores</h1>
        )}
        <div className={styles.cardWrapper}>
          {props.coffeeStores.map(({ id, name, imgUrl }) => {
            return <Card key={id} name={name} imgUrl={imgUrl} id={id} />;
          })}
        </div>
      </main>
    </>
  );
}

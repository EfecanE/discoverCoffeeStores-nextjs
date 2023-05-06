import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";

import coffeeData from "@/public/static/coffee-stores.json";
import styles from "@/styles/Home.module.css";

export default function Home() {
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
      <header className={styles.main}>
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
      <main className={styles.cardWrapper}>
        {coffeeData.map((coffeeShop) => {
          return (
            <Card
              key={coffeeShop.id}
              name={coffeeShop.name}
              imgUrl={coffeeShop.imgUrl}
              id={coffeeShop.id}
            />
          );
        })}
      </main>
    </>
  );
}

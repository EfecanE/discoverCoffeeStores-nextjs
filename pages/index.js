import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";

import { fetchCoffeeStores, fetchCoffeeStoresImage } from "@/lib/coffee-stores";
import styles from "@/styles/home.module.css";
import { useEffect, useState } from "react";

export async function getStaticProps(context) {
  try {
    const coffeeStores = await fetchCoffeeStores();
    const coffeeStoresWithImage = await fetchCoffeeStoresImage(coffeeStores);

    return {
      props: {
        coffeeStoresWithImage,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        coffeeStoresWithImage: [],
      },
    };
  }
}

export default function Home(props) {
  const handleOnBannerBtnClick = () => {};

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
            priority={true}
          ></Image>
        </div>
      </header>
      <main className={styles.main}>
        {props.coffeeStoresWithImage.length > 0 && (
          <h1 className={styles.cardWrapperTitle}>Antalya Stores</h1>
        )}
        <div className={styles.cardWrapper}>
          {props.coffeeStoresWithImage.map(({ fsq_id, name, link, image }) => {
            return (
              <Card
                key={fsq_id}
                name={name}
                id={fsq_id}
                link={link}
                imgUrl={image}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

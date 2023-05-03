import Head from "next/head";
import Image from "next/image";

import { useState } from "react";
import Banner from "@/components/banner";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleOnBannerBtnClick = () => {
    console.log("clicked");
    setLoading(true);
  };

  return (
    <>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={loading ? "Loading" : "View shops nearby"}
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
      </main>
    </>
  );
}

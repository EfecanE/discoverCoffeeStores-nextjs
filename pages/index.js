import Head from "next/head";
import Image from "next/image";

import Banner from "@/components/banner";
import Card from "@/components/card";

import coffeeData from "@/data/coffee-stores.json";
import styles from "@/styles/Home.module.css";

export async function getStaticProps(context) {
  return {
    props: {
      coffeeData,
    },
  };
}

export default function Home(props) {
  console.log("🚀 ~ file: index.js:55 ~ Home ~ props:", props);

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
        {props.coffeeData.map(({ id, name, imgUrl }) => {
          return <Card key={id} name={name} imgUrl={imgUrl} id={id} />;
        })}
      </main>
    </>
  );
}

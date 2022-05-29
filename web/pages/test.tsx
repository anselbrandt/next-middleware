import type { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Test: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header title={"Test Page"} />

      <main className={styles.main}>
        <h1 className={styles.title}>Test Page</h1>

        <div className={styles.description}>Test contents</div>
      </main>

      <Footer />
    </div>
  );
};

export default Test;

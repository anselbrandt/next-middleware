import type { NextPage } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header title={"Create Next App"} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <Link href="/api/analytics/keys">
            <div className={styles.card}>
              <h2>Keys &rarr;</h2>
              <p>Basic log entries</p>
            </div>
          </Link>

          <Link href="/api/analytics/logs">
            <div className={styles.card}>
              <h2>Logs &rarr;</h2>
              <p>Structured logs</p>
            </div>
          </Link>

          <Link href="/analytics">
            <div className={styles.card}>
              <h2>Analytics &rarr;</h2>
              <p>Analytics dashboard</p>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

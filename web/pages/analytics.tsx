import { FeatureCollection } from "geojson";
import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import ReactMap from "../components/ReactMap";
import styles from "../styles/Home.module.css";
import { makeFeatures } from "../utils";
import { LogEntry } from "../utils/types";
import useGetLogs from "../utils/useGetLogs";

// add upstash response time

const Analytics: NextPage = () => {
  const [logs, error] = useGetLogs();
  const logEntries = logs as LogEntry[];
  const data = makeFeatures(logEntries) as FeatureCollection;
  return (
    <div className={styles.container}>
      <Head>
        <title>Analytics</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Analytics</h1>

        <p className={styles.description}>blah, blah, blah</p>

        {error && (
          <div>
            <pre>{JSON.stringify(error)}</pre>
          </div>
        )}
        <div style={{ width: "600px", height: "400px" }}>
          <ReactMap data={data} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;

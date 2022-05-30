import { FeatureCollection } from "geojson";
import type { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Metrics from "../components/Metrics";
import ReactMap from "../components/ReactMap";
import styles from "../styles/Home.module.css";
import { makeFeatures } from "../utils";
import { LogEntry } from "../utils/types";
import useGetKeys from "../utils/useGetKeys";
import useGetLogs from "../utils/useGetLogs";

// add upstash response time

const Analytics: NextPage = () => {
  const { data: logs, error: logsErr } = useGetLogs();
  const logEntries = logs as LogEntry[];
  const data = makeFeatures(logEntries) as FeatureCollection;
  const { data: keys, error: keysErr } = useGetKeys();
  return (
    <div className={styles.container}>
      <Header title={"analytics"} />

      <main className={styles.main}>
        <h1 className={styles.title}>Analytics</h1>

        <p className={styles.description}>blah, blah, blah</p>

        {logsErr && (
          <div>
            <pre>{JSON.stringify(logsErr)}</pre>
          </div>
        )}
        <div style={{ width: "600px", height: "400px" }}>
          <ReactMap data={data} />
        </div>
        <div>
          <Metrics keys={keys} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;

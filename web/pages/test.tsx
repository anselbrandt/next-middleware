import type { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import logs from "../data/sampleKeys.json";
import styles from "../styles/Home.module.css";
import { getPaths, getReferrs, getWebvitals } from "../utils";

const Test: NextPage = () => {
  const data = logs
    .map((log) => log.replace("a.m.", "AM"))
    .map((log) => log.replace("p.m.", "PM"));
  const paths = getPaths(data);
  const referrers = getReferrs(data);
  const webvitals = getWebvitals(data);
  const webvitalsLogs = data
    .filter((log) => log.includes("web_vitals"))
    .map((log) => log.split(" "))
    .sort((a, b) => ("" + a[3]).localeCompare(b[3]))
    .map((log) => log.join(" "));
  const width = "425px";
  return (
    <div className={styles.container}>
      <Header title={"Test Page"} />

      <main className={styles.main}>
        <h1 className={styles.title}>Test Page</h1>

        <div className={styles.description}>
          <div>
            <div>Paths</div>
            <div style={{ width: width }}>
              {paths.map((path, index) => (
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{path.route}</div>
                  <div>{path.count}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>Referrers</div>
            <div style={{ width: width }}>
              {referrers.map((referrer, index) => (
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{referrer.referrer}</div>
                  <div>{referrer.count}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>Webvitals</div>
            <div style={{ width: width }}>
              {webvitals.map((vital, index) => (
                <div
                  key={index}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>{vital.key}</div>
                  <div>{vital.max}ms</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <pre>{JSON.stringify(webvitalsLogs, null, 2)}</pre>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Test;

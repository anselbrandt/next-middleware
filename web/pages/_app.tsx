import type { AppProps, NextWebVitalsMetric } from "next/app";
import "../styles/globals.css";

export async function reportWebVitals(metric: NextWebVitalsMetric) {
  const time = new Date();
  const timestamp = time.getTime();
  const date = time.toLocaleString();
  const metricData = { timestamp, date, ...metric };
  await fetch("/api/metrics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metricData),
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

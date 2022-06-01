import type { AppProps, NextWebVitalsMetric } from "next/app";
import "../styles/globals.css";
import log from "../utils/log";

// add path from window

export async function reportWebVitals(metric: NextWebVitalsMetric) {
  try {
    log(metric);
    const time = new Date();
    const timestamp = time.getTime();
    const date = time.toLocaleString();
    const path = window.location.pathname;
    const metricData = { timestamp, date, path, ...metric };
    const logKey = `${timestamp}@${time.toLocaleTimeString()} web_vitals path=${path} ${
      metric.name
    }=${metric.value}`;
    const response = await fetch(`/api/metrics/${encodeURIComponent(logKey)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metricData),
    });
    await response.text();
    return response.ok;
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

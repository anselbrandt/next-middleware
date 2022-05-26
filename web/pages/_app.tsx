import type { AppProps, NextWebVitalsMetric } from "next/app";
import { HOST_URL } from "../constants";
import "../styles/globals.css";

export async function reportWebVitals(metric: NextWebVitalsMetric) {
  try {
    const time = new Date();
    const timestamp = time.getTime();
    const date = time.toLocaleString();
    const metricData = { timestamp, date, ...metric };
    const response = await fetch(`${HOST_URL}/api/metrics/`, {
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

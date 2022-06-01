import type { NextWebVitalsMetric } from "next/app";

const LOG_URL = "http://localhost:5000/";

function sendAnalytics(metric: NextWebVitalsMetric) {
  const body = JSON.stringify(metric);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(LOG_URL, body);
  } else {
    fetch(LOG_URL, { body, method: "POST", keepalive: true });
  }
}

export default function log(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case "FCP":
      sendAnalytics(metric);
      break;
    case "LCP":
      sendAnalytics(metric);
      break;
    case "CLS":
      sendAnalytics(metric);
      break;
    case "FID":
      sendAnalytics(metric);
      break;
    case "TTFB":
      sendAnalytics(metric);
      break;
    case "Next.js-hydration":
      sendAnalytics(metric);
      break;
    case "Next.js-route-change-to-render":
      sendAnalytics(metric);
      break;
    case "Next.js-render":
      sendAnalytics(metric);
      break;
    default:
      break;
  }
}

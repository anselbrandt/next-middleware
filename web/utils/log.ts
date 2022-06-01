import type { NextWebVitalsMetric } from "next/app";

function sendAnalytics(metric: NextWebVitalsMetric) {}

export default function log(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case "FCP":
      // handle FCP results
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

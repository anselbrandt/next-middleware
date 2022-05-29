import { LogEntry } from "./types";

export const makeFeatures = (arr: LogEntry[]) => {
  if (arr) {
    const features = arr
      .filter((log) => log.geo && log.geo.latitude && log.geo.longitude)
      .map((log) => ({
        type: "Feature",
        properties: {
          id: log.timestamp,
        },
        geometry: {
          type: "Point",
          coordinates: [log.geo.longitude, log.geo.latitude, 0],
        },
      }));
    return {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
      features: features,
    };
  }
};

export const getPaths = (arr: string[]) => {
  const paths = arr
    .filter((log) => log.includes("http_request"))
    .map((log) => log.split(" ").filter((log) => log.includes("path="))[0])
    .map((path) => path.replace("path=", ""));
  const pathMap = new Map();
  paths.forEach((path) => {
    const prev = pathMap.get(path);
    if (prev) {
      pathMap.set(path, prev + 1);
    } else {
      pathMap.set(path, 1);
    }
  });
  const pathArr = Array.from(pathMap)
    .map((path) => ({
      route: path[0],
      count: path[1],
    }))
    .sort((a, b) => b.count - a.count);
  return pathArr;
};

export const getReferrs = (arr: string[]) => {
  const paths = arr
    .filter((log) => log.includes("http_request"))
    .map((log) => log.split(" ").filter((log) => log.includes("referrer="))[0])
    .map((referrer) => referrer.replace("referrer=", ""));
  const referrerMap = new Map();
  paths.forEach((referrer) => {
    const prev = referrerMap.get(referrer);
    if (prev) {
      referrerMap.set(referrer, prev + 1);
    } else {
      referrerMap.set(referrer, 1);
    }
  });
  const pathArr = Array.from(referrerMap)
    .map((referrer) => ({
      referrer: referrer[0],
      count: referrer[1],
    }))
    .sort((a, b) => b.count - a.count);
  return pathArr;
};

export const getWebvitals = (arr: string[]) => {
  const vitals = arr
    .filter((log) => log.includes("web_vitals"))
    .map((log) => log.split(" "))
    .map((log) => log[4]);
  const labelsMap = new Map();
  vitals.forEach((vital) => {
    const [key, value] = vital.split("=");
    const prev = labelsMap.get(key);
    if (prev) {
      labelsMap.set(key, [...prev, value]);
    } else {
      labelsMap.set(key, [value]);
    }
  });
  const webvitals = Array.from(labelsMap)
    .map((entry) => {
      const [key, values] = entry;
      const count = values.length;
      const min = Math.min(...values);
      const max = Math.max(...values);
      const avg =
        values.reduce(
          (prev: number, cur: string) => prev + parseFloat(cur),
          0
        ) / values.length;
      return {
        key: key,
        count: count,
        min: +min.toFixed(),
        max: +max.toFixed(),
        avg: +avg.toFixed(),
      };
    })
    .sort((a, b) => b.max - a.max);

  return webvitals;
};

export const getWebvitalsSorted = (arr: string[]) => {
  const details = arr
    .filter((log) => log.includes("web_vitals"))
    .map((log) => log.split(" "))
    .sort((a, b) => ("" + a[3]).localeCompare(b[3]))
    .map((log) => log.join(" "));
  return details;
};

export const getWebvitalsDetailed = (arr: string[]) => {
  const vitals = arr
    .filter((log) => log.includes("web_vitals"))
    .map((log) => log.split(" ").slice(3, 5))
    .map((entry) => {
      const [path, value] = entry;
      return {
        path: path.replace("path=", ""),
        value: value,
      };
    });

  const vitalsMap = new Map();
  vitals.forEach((vital) => {
    const { path, value } = vital;
    const prev = vitalsMap.get(path);
    if (prev) {
      vitalsMap.set(path, [...prev, value]);
    } else {
      vitalsMap.set(path, [value]);
    }
  });
  const vitalsArr = Array.from(vitalsMap).map((entry) => {
    const [path, metrics] = entry;
    const metricsMap = new Map();
    metrics.forEach((metric: string) => {
      const [key, value] = metric.split("=");
      const prev = metricsMap.get(key);
      if (prev) {
        metricsMap.set(key, [...prev, value]);
      } else {
        metricsMap.set(key, [value]);
      }
    });
    const metricsArr = Array.from(metricsMap).map((metric) => {
      const [label, values] = metric;
      const numValues = values.map((value: string) => +(+value).toFixed());
      const max = Math.max(...numValues);
      const avg =
        numValues.reduce((prev: number, cur: number) => prev + cur, 0) /
        numValues.length;
      return {
        vital: label,
        max: max,
        avg: +avg.toFixed(),
      };
    });
    return {
      path: path,
      metrics: metricsArr.sort((a, b) => b.max - a.max),
    };
  });
  return vitalsArr;
};

const webVitalLabels = [
  "FCP",
  "TTFB",
  "CLS",
  "LCP",
  "Next.js-hydration",
  "Next.js-render",
  "Next.js-route-change-to-render",
];

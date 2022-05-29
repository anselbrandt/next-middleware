/*

  {
    timestamp: 1653638164323,
    date: "5/27/2022, 7:56:04 AM",
    path: "/",
    geo: {
      city: "Montreal",
      country: "CA",
      latitude: "45.5332",
      longitude: "-73.6091",
      region: "QC",
    },
    method: "GET",
    browser: { name: "Chrome", version: "102.0.5005.61", major: "102" },
    device: {},
  },


  {
    type: "FeatureCollection",
  crs: {
    type: "name",
    properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
  },
  features: [
          {
      "type": "Feature",
      "properties": {
        "id": "ak16994521",
        "mag": 2.3,
        "time": 1507425650893,
        "felt": null,
        "tsunami": 0
      },
      "geometry": { "type": "Point", "coordinates": [-151.5129, 63.1016, 0.0] }
    },
  ],
  }

*/

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
    .map((log) => log[3]);
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

const webVitalLabels = [
  "FCP",
  "TTFB",
  "CLS",
  "LCP",
  "Next.js-hydration",
  "Next.js-render",
  "Next.js-route-change-to-render",
];

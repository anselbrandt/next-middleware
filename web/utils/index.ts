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
};
